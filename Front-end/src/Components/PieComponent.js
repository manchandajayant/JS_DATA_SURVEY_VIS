import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function PieChart() {
	const ref = useRef(null);
	useEffect(() => {
		async function fetchTest() {
			const res = await fetch("http://localhost:4000/jsMainLangauge");
			const data = await res.json();
			// set the dimensions and margins of the graph
			const width = 450;
			const height = 450;
			const margin = 40;
			// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
			const radius = Math.min(width, height) / 2 - margin;

			// append the svg object to the div called 'my_dataviz'
			const svg = d3
				.select(ref.current)
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr(
					"transform",
					"translate(" + width / 2 + "," + height / 2 + ")"
				);

			// array of colours on the pie chart
			const color = d3
				.scaleOrdinal()
				.domain(data)
				.range(["#184e77", "#1a759f", "#34a0a4", "#76c893"]);

			// Compute the position of each group on the pie:
			const pie = d3
				.pie()
				.startAngle(1.1 * Math.PI)
				.endAngle(3.1 * Math.PI)
				.value(function (d) {
					return Object.values(d);
				});

			const data_ready = pie(data);

			// calculate % of each piece of data
			const totalValue = data.reduce((acc, curr) => {
				return acc + Object.values(curr)[0];
			}, 0);

			//Tooltip
			const toolDiv = d3
				.select(ref.current)
				.append("div")
				.style("visibility", "hidden")
				.style("overflow", "visible")
				.style("position", "absolute")
				.style("height", "60px")
				.style("width", "100px")
				.style("background-color", "#fff")
				.style("border", "solid black 1px")
				.style("border-radius", "7px")
				.style("font-family", "Chivo, sans-serif")
				.style("font-size", "10px")
				.style("pointer-events", "none");

			const arc = d3
				.arc()
				.innerRadius(radius - 30)
				.outerRadius(radius);

			// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
			var diagram = svg
				.selectAll("path")
				.data(data_ready)
				.enter()
				.append("path");

			// Transition and delay to create animation
			diagram
				.transition()
				.delay(function (d, i) {
					return i * 50;
				})
				.duration(350)
				.attrTween("d", function (d) {
					var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
					return function (t) {
						d.endAngle = i(t);
						return arc(d);
					};
				})
				.attr("fill", function (d) {
					return color(Object.keys(d.data)[0]);
				})
				.attr("stroke", "none")
				.style("stroke-width", "2px")
				.style("opacity", 0.7);

			diagram
				.on("mouseover", (e, d) => {
					toolDiv
						.style("visibility", "visible")
						.html(
							`<p style="margin:0;padding:10px 0 0px 10px;font-weight: 900;font-size:12px">${
								Object.keys(d.data)[0]
							}</p>` +
								"<br/>" +
								`<p style="margin:0;padding:0px 0 2px 10px">${Math.round(
									(Object.values(d.data)[0] / totalValue) *
										100
								)}%</p>`
						);
				})
				.on("mousemove", (e) => {
					toolDiv
						.style("top", e.pageY - 50 + "px")
						.style("left", e.pageX - 50 + "px");
				})
				.on("mouseout", () => {
					toolDiv.style("visibility", "hidden");
				});
		}

		fetchTest();
	}, []);
	return <div ref={ref}></div>;
}
