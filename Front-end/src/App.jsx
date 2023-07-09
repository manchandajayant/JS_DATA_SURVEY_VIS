import React from "react";
import PieComponent from "./Components/PieComponent";
import "./App.css";
import StackedBarChart from "./Components/StackedBarChart";
export default function App() {
	return (
		<div>
			<h2 className="text-center">State of JS data visualisation</h2>
			<div className="d-flex justify-content-evenly" >
				<PieComponent />
				<StackedBarChart />
			</div>
		</div>
	);
}
