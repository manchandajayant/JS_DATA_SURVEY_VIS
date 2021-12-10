import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
const StackedBarChart = () => {
	const ref = useRef(null);
	const [rawData, setrawData] = useState({});
	const [requestFullfilled, setrequestFullfilled] = useState(false);
	const [loading, setloading] = useState(false);

	const fetchData = useCallback(async () => {
		try {
			setloading(true);
			const res = await fetch("http://localhost:4000/dataByTools");
			const adata = await res.json();
			if (res.status === 200) {
				setloading(false);
				setrawData(adata);
				setrequestFullfilled(true);
			}
		} catch (e) {
			setloading(false);
			console.log(e);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		if (requestFullfilled) {
			const arrayOfData = Object.entries(rawData).map((e) => ({
				[e[0]]: e[1],
			}));

			var keys = [];
			for (var x in Object.values(arrayOfData[0])[0]) {
				keys.push(x);
			}
			var sortedData = arrayOfData.map((el) => {
				return {
					tool: Object.keys(el)[0],
					...Object.values(el)[0],
				};
			});

			var color = ["#bae4bc", "#7bccc4", "#43a2ca", "#bae4bc"];

			var margin = { top: 20, right: 160, bottom: 35, left: 30 };

			var width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

			var svg = d3
				.select(ref.current)
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr(
					"transform",
					"translate(" + margin.left + "," + margin.top + ")"
				);

			// Start the stacked bar chart
			var stack = d3
				.stack()
				.keys(keys)
				.order(d3.stackOrderNone)
				.offset(d3.stackOffsetNone);

			var series = stack(sortedData);

			var x = d3
				.scaleBand()
				.domain(
					series[0].map(function (d) {
						return d.data.tool;
					})
				)
				.range([10, width - 10], 0.02);

			var y = d3
				.scaleLinear()
				.domain([
					0,
					d3.max(series, function (d) {
						return d3.max(d, function (d) {
							return d[0] + d[1];
						});
					}),
				])
				.range([height, 0]);

			// Define and draw axes
			var yAxis = d3.axisLeft().scale(y).tickSize(-width, 0, 0);

			var xAxis = d3
				.axisBottom()
				.scale(x)
				.tickFormat(function (d) {
					return d;
				});

			svg.append("g").attr("class", "y axis").call(yAxis);

			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			// Create groups for each series, rects for each segment
			var groups = svg
				.selectAll("g")
				.data(series)
				.enter()
				.append("g")
				.attr("class", "cost")
				.style("fill", function (d, i) {
					return color[i];
				});

			groups
				.selectAll("rect")
				.data(function (d) {
					return d;
				})
				.enter()
				.append("rect")
				.attr("x", function (d) {
					console.log(d);
					// return x(d.tool);
				});
			// .attr("y", function (d) {
			// 	return y(d.y0 + d.y);
			// })
			// .attr("height", function (d) {
			// 	return y(d.y0) - y(d.y0 + d.y);
			// })
			// .attr("width", x.rangeBand());
		}
	}, [requestFullfilled]);

	return (
		<div>
			<div ref={ref}></div>
		</div>
	);
};

export default StackedBarChart;
