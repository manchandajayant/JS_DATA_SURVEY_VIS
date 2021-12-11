import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { max } from "d3";
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
			var arrayOfData = Object.entries(rawData).map((e) => ({
				[e[0]]: e[1],
			}));

			arrayOfData = arrayOfData.filter((el, i) => {
				if (i < 18) {
					return el;
				}
			});

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
			
			var margin = { top: 20, right: 160, bottom: 35, left: 30 };

			var width = 1260 - margin.left - margin.right,
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
				.range([0, width])
				.padding([0.2]);

			var maxValue = 0;

			sortedData.forEach((el) => {
				Object.values(el).forEach((m) => {
					if (typeof m !== "string"){
						if (m >= maxValue) {
							maxValue = m
						}
					}
				
				});
			});
			
			maxValue = parseInt((40 /100) * maxValue) + maxValue

			
			var y = d3.scaleLinear().domain([0, maxValue]).range([height, 0]);

			svg.append("g")
				.attr("class", "y axis")
				.call(
					d3.axisLeft(y).tickFormat((d) => {
						return d === 0 ? 0 : d / 1000 + "k";
					})
				);

			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));

			var color = d3
				.scaleOrdinal()
				.domain([
					"interested",
					"never_heard",
					"not_interested",
					"would_not_use",
					"would_use",
				])
				.range(["#52b69a","#76c893", "#99d98c", "#b5e48c", "#d9ed92"]);

			svg.append("g")
				.selectAll("g")
				// Enter in the stack data = loop key per key = group per group
				.data(series)
				.enter()
				.append("g")
				.attr("fill", function (d) {
					return color(d.key);
				})
				.selectAll("rect")
				// enter a second time = loop subgroup per subgroup to add all rectangles
				.data(function (d) {
					return d;
				})
				.enter()
				.append("rect")
				.attr("x", function (d) {
					return x(d.data.tool);
				})
				.attr("y", function (d) {
					return y(d[1]);
				})
				.attr("height", function (d) {
					return y(d[0]) - y(d[1]);
				})
				.attr("width", x.bandwidth());
		}
	}, [requestFullfilled]);

	return (
		<div className="container-fluid shadow-lg bg-white rounded w-60 ms-3 mt-5 m-0 rounded">
			<p className="pie-heading p-3 pb-0 h-6">
				People Who would like JS to be their main language
			</p>
			<div>
				<div ref={ref} style={{overflow: 'scroll'}}></div>
			</div>
		</div>
	);
};

export default StackedBarChart;
