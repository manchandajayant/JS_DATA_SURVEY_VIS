import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import Dropdown from "./Dropdown";

const StackedBarChart = () => {
	const ref = useRef(null);
	const [rawData, setrawData] = useState({});
	const [requestFullfilled, setrequestFullfilled] = useState(false);
	const [loading, setloading] = useState(false);
	const [sortedData, setsortedData] = useState([]);
	const [updated, setupdated] = useState(false);
	const [selected, setSelected] = useState("");

	const fetchData = useCallback(async () => {
		try {
			setloading(true);
			const res = await fetch("http://localhost:4000/dataByTools");
			const adata = await res.json();
			if (res.status === 200) {
				setloading(false);
				setrawData(adata);
				setrequestFullfilled(true);
				setSelected(Object.keys(adata)[0]);
			}
		} catch (e) {
			setloading(false);
			console.log(e);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const clickTool = (tool) => {
		setSelected(tool);
		setupdated(true);
	};

	useEffect(() => {
		if (requestFullfilled) {
			var arrayOfData = Object.entries(rawData).map((e) => ({
				[e[0]]: e[1],
			}));
			setsortedData(
				arrayOfData.map((el) => {
					return {
						tool: Object.keys(el)[0],
						...Object.values(el)[0],
					};
				})
			);
		}
	}, [requestFullfilled]);

	useEffect(() => {
		if (sortedData.length) {
			console.log("ever");
			makeBarChart();
		}
	}, [sortedData]);

	useEffect(() => {
		if (updated) makeBarChart();
	}, [updated]);

	const makeBarChart = () => {
		if (updated) {
			d3.select(".svg").remove();
		}
		var selectedToolData = sortedData.filter((el) => el.tool === selected);

		function dataProcessingForD3(selectedToolData) {
			var arr = [];
			for (const x in selectedToolData[0]) {
				if (x !== "tool") {
					arr.push({
						[x]: selectedToolData[0][x],
					});
				}
			}
			return arr;
		}

		let d3Data = dataProcessingForD3(selectedToolData);

		if (d3Data.length) {
			var margin = { top: 20, right: 160, bottom: 35, left: 30 };

			var width = 760 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

			var svg = d3
				.select(ref.current)
				.append("svg")
				.attr("class", "svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr(
					"transform",
					"translate(" + margin.left + "," + margin.top + ")"
				);

			svg.selectAll("rect").remove();
			var x = d3.scaleBand().range([0, width]).padding(0.1);
			var y = d3.scaleLinear().range([height, 0]);

			x.domain(
				d3Data.map(function (d) {
					return Object.keys(d)[0];
				})
			);
			y.domain([
				0,
				d3.max(d3Data, function (d) {
					return Object.values(d)[0];
				}),
			]);

			svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x))
				.append("text");

			svg.append("g").call(
				d3.axisLeft(y).tickFormat((d) => {
					return d === 0 ? 0 : d / 1000 + "k";
				})
			);

			const toolDiv = d3
				.select(ref.current)
				.append("div")
				.attr("class", "tooldiv");

			const defs = svg.append("defs");
			const bgGradient = defs
				.append("linearGradient")
				.attr("id", "bg-gradient")
				.attr("gradientTransform", "rotate(105)");
			bgGradient
				.append("stop")
				.attr("stop-color", "#1a759f")
				.attr("offset", "0%");
			bgGradient
				.append("stop")
				.attr("stop-color", "#76c893")
				.attr("offset", "100%");

			svg.selectAll(".bar")
				.data(d3Data)
				.enter()
				.append("rect")
				.attr("class", "bar")
				.attr("x", function (d) {
					return x(Object.keys(d)[0]);
				})
				.attr("width", x.bandwidth())
				.attr("y", function (d) {
					return y(0);
				})
				.attr("height", function (d) {
					return height - y(0);
				});

			svg.selectAll("rect")
				.transition()
				.duration(800)
				.attr("y", function (d) {
					return y(Object.values(d)[0]);
				})
				.attr("height", function (d) {
					return height - y(Object.values(d)[0]);
				})
				.style("fill", "url(#bg-gradient)")
				.delay(function (d, i) {
					return i * 100;
				});

			svg.selectAll("rect")
				.on("mouseover", (e, d) => {
					toolDiv.style("visibility", "visible").html(
						`<p style="margin:0;padding:10px 0 0px 10px;font-weight: 900;font-size:12px">
							${Object.keys(d)}
						</p>
						<p style="margin:0;padding:10px 0 0px 10px;font-weight: 900;font-size:12px">
						${Object.values(d)}
					</p>`
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
		setupdated(false);
	};

	return (
		<div
			className="container-fluid shadow-lg bg-white rounded w-50 ms-3 mt-5 m-0 rounded"
			id="bar-chart"
		>
			<p className="pie-heading p-3 pb-0 h-6">Preference By JS Tool</p>

			{!loading && (
				<div>
					<Dropdown
						selected={selected}
						clickTool={clickTool}
						data={sortedData}
					/>
					<div ref={ref}></div>
				</div>
			)}
		</div>
	);
};

export default StackedBarChart;
