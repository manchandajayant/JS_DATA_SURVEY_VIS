import * as d3 from "d3";

export const makeBarChart = (processData, updated, setUpdated, ref, selected) => {
    if (updated) d3.select(".svg").remove();

    let selectedToolData = getSelectedToolData(processData, selected);

    let d3Data = dataProcessingForD3(selectedToolData).sort((a, b) => (Object.keys(a) > Object.keys(b) ? 1 : -1));

    if (d3Data.length) {
        // Define Svg responsive
        let svg = d3
            .select(ref.current)
            .append("svg")
            .attr("class", "svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 760 500")
            .attr("preserveAspectRatio", "xMinYMin")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Clear previous elements to update data
        svg.selectAll("rect").remove();

        // Define x and y axis
        let x = d3.scaleBand().range([0, width]).padding(0.1);
        let y = d3.scaleLinear().range([height, 0]);

        // Define data on x and y axis
        x.domain(d3Data.map((d) => Object.keys(d)[0]));
        y.domain([0, d3.max(d3Data, (d) => Object.values(d)[0])]);

        // Add X and Y axis to the svg
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text");

        svg.append("g").call(d3.axisLeft(y).tickFormat((d) => (d === 0 ? 0 : d / 1000 + "k")));

        // Tooltip
        const toolDiv = d3.select(ref.current).append("div").attr("class", "tooldiv");

        // Color gradient for bars
        const defs = svg.append("defs");
        const bgGradient = defs
            .append("linearGradient")
            .attr("id", "bg-gradient")
            .attr("gradientTransform", "rotate(105)");

        bgGradient.append("stop").attr("stop-color", "#1a759f").attr("offset", "0%");
        bgGradient.append("stop").attr("stop-color", "#76c893").attr("offset", "100%");

        // Create bars
        svg.selectAll(".bar")
            .data(d3Data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(Object.keys(d)[0]))
            .attr("width", x.bandwidth())
            .attr("y", (d) => y(0))
            .attr("height", (d) => height - y(0));

        // Add animation to the bars on page load
        svg.selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", (d) => y(Object.values(d)[0]))
            .attr("height", (d) => height - y(Object.values(d)[0]))
            .style("fill", "url(#bg-gradient)")
            .delay((d, i) => i * 100);

        // Hover functions for tooltip
        svg.selectAll("rect")
            .on("mouseover", (e, d) => mouseOver(e, d, toolDiv))
            .on("mousemove", (e) => mouseMove(e, toolDiv))
            .on("mouseout", () => mosueOut(toolDiv));
    }
    setUpdated(false);
};

let margin = { top: 20, right: 160, bottom: 35, left: 30 };
let width = 760 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const getSelectedToolData = (processData, selected) =>
    processData.filter((toolData) => toolData.tool === (selected ? selected : processData[0].tool));

const mouseOver = (e, d, toolDiv) => {
    toolDiv.style("visibility", "visible").html(
        `<p style="margin:0;padding:10px 0 0px 10px;font-weight: 900;font-size:12px">
        ${Object.values(d)} 
        </p>
        <p style="margin:0;padding:0px 0px 0px 10px;font-weight: 900;font-size:12px">
        Participants
    </p>`
    );
};

const mouseMove = (e, toolDiv) => toolDiv.style("top", e.pageY - 50 + "px").style("left", e.pageX - 50 + "px");

const mosueOut = (toolDiv) => toolDiv.style("visibility", "hidden");

const dataProcessingForD3 = (selectedToolData) => {
    let processedData = [];
    for (const tool in selectedToolData[0]) {
        if (tool !== "tool") {
            processedData.push({
                [tool]: selectedToolData[0][tool],
            });
        }
    }
    return processedData;
};
