import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
export default function PieChart() {
	const ref = useRef(null);
	useEffect(() => {
		async function fetchTest() {
			const res = await fetch("http://localhost:4000/jsMainLangauge");
			var result = await res.json();

			// Create data for circles:
			// var data = [];
			// data.push(result);
			// console.log(data);
			// var geoData = fetchGeoData.analytics;
			// console.log(geoData.analytics,@json($geoWisePodcastListens));

			// set the dimensions and margins of the graph
			// set the dimensions and margins of the graph
			var width = 450;
			var height = 450;
			var margin = 40;

			// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
			var radius = Math.min(width, height) / 2 - margin;

			// append the svg object to the div called 'my_dataviz'
			var svg = d3
				.select(ref.current)
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr(
					"transform",
					"translate(" + width / 2 + "," + height / 2 + ")"
				);

			// Create dummy data
			// var data = [{ a: 9 }, { b: 20 }, { c: 30 }, { d: 8 }, { e: 12 }];
			var data = result;

			// set the color scale
			var color = d3
				.scaleOrdinal()
				.domain(data)
				.range(["#FF6361", "#BC5090", "#58508D", "#003F5C"]);

			// Compute the position of each group on the pie:
			var pie = d3.pie().value(function (d) {
				console.log(d);
				return Object.values(d);
			});

			var data_ready = pie(data);

			// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
			svg.selectAll("path")
				.data(data_ready)
				.enter()
				.append("path")
				.attr(
					"d",
					d3
						.arc()
						.innerRadius(radius - 80)
						.outerRadius(radius)
				)
				.attr("fill", function (d) {
					return color(Object.keys(d.data)[0]);
				})
				.attr("stroke", "none")
				.style("stroke-width", "2px")
				.style("opacity", 0.7);
		}

		fetchTest();
	}, []);
	return <div ref={ref}>Pie Chart</div>;
}
