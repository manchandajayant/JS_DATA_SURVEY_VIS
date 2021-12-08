import React, { useEffect } from "react";

function StackedBarChart() {
	useEffect(() => {
		async function getToolData() {
			const res = await fetch("http://localhost:4000/dataByTools");
			const data = await res.json();
			const arrayOfData = Object.entries(data).map((e) => ({
				[e[0]]: e[1],
			}));
		}
		getToolData();
	}, []);
	return <div></div>;
}

export default StackedBarChart;
