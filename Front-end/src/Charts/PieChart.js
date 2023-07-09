import * as d3 from "d3";

export const makePieChart = (data, ref, setlabels) => {
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + Math.min(width, height) + " " + Math.min(width, height))
        .attr("preserveAspectRatio", "xMinYMin")
        .append("g")
        .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

    // array of colours on the pie chart
    const color = d3.scaleOrdinal().domain(data).range(ColorRange);

    // Compute the position of each group on the pie:
    const pie = d3
        .pie()
        .startAngle(1.1 * Math.PI)
        .endAngle(3.1 * Math.PI)
        .value((d) => Object.values(d));

    const data_ready = pie(data);

    // calculate % of each piece of data
    const totalValue = data.reduce((acc, curr) => acc + Object.values(curr)[0], 0);

    //Tooltip
    const toolDiv = d3.select(ref.current).append("div").attr("class", "tooldiv");

    const arc = d3
        .arc()
        .innerRadius(radius - 30)
        .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    const diagram = svg.selectAll("path").data(data_ready).enter().append("path");

    // Transition and delay to create animation
    diagram
        .transition()
        .delay((d, i) => i * 50)
        .duration(350)
        .attrTween("d", (d) => {
            var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            return (t) => {
                d.endAngle = i(t);
                return arc(d);
            };
        })
        .attr("fill", (d) => {
            setlabels((key) => [
                ...key,
                {
                    key: Object.keys(d.data)[0],
                    color: color(Object.keys(d.data)[0]),
                },
            ]);
            return color(Object.keys(d.data)[0]);
        })
        .attr("stroke", "none")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    diagram
        .on("mouseover", (e, d) => mouseOver(e, d, toolDiv))
        .on("mousemove", (e) => mouseMove(e, toolDiv))
        .on("mouseout", () => mouseOut(toolDiv));
};

// set the dimensions and margins of the graph
const width = 450;
const height = 450;
const margin = 40;

const mouseOver = (e, d, toolDiv) =>
    toolDiv
        .style("visibility", "visible")
        .html(
            `<p style="margin:0;padding:10px 0 0px 10px;font-weight: 900;font-size:12px">${
                Object.keys(d.data)[0]
            }</p>` +
                "<br/>" +
                `<p style="margin:0;padding:0px 0 2px 10px">${Math.round(
                    (Object.values(d.data)[0] / totalValue) * 100
                )}%</p>`
        );

const mouseMove = (e, toolDiv) => toolDiv.style("top", e.pageY - 50 + "px").style("left", e.pageX - 50 + "px");

const mouseOut = (toolDiv) => toolDiv.style("visibility", "hidden");


const ColorRange = ["#184e77", "#1a759f", "#34a0a4", "#76c893"]
