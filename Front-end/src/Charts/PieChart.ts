import * as d3 from "d3";
import { Dispatch, SetStateAction } from "react";
import { D3ToolTip, Data, DataByToolsType, ObjectGeneric } from "./Types/types";

export const makePieChart = (
    data: DataByToolsType[],
    ref: React.RefObject<HTMLInputElement>,
    setlabels: Dispatch<SetStateAction<ObjectGeneric[]>>
) => {
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
    const color = d3.scaleOrdinal().domain(data as Iterable<string>).range(ColorRange);

    // Compute the position of each group on the pie:
    const pie = d3
        .pie<Data>()
        .startAngle(1.1 * Math.PI)
        .endAngle(3.1 * Math.PI)
        .value((d) => (Object as ObjectGeneric).values(d));

    const data_ready = pie(data);

    // calculate % of each piece of data
    const totalValue = data.reduce((acc: number, curr: DataByToolsType) => acc + (Object as ObjectGeneric).values(curr)[0], 0);

    //Tooltip
    const toolDiv = d3.select(ref.current).append("div").attr("class", "tooldiv");

    const arc = d3
        .arc<d3.PieArcDatum<Data>>()
        .innerRadius(radius - 30)
        .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    const diagram = svg.selectAll("path").data(data_ready).enter().append("path");

    // Transition and delay to create animation
    diagram
        .transition()
        .delay((d, i) => i * 50)
        .duration(350)
        .attrTween("d", (d: d3.PieArcDatum<Data>): ((t: number) => string) => {
            var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            return (t: number) => {
                d.endAngle = i(t) as number;
                return arc(d) as string;
            };
        })
        .attr("fill", (d: d3.PieArcDatum<Data>): string => {
            setlabels((key: ObjectGeneric[]) => [
                ...key,
                {
                    key: (Object as ObjectGeneric).keys(d.data)[0],
                    color: color((Object as ObjectGeneric).keys(d.data)[0]),
                },
            ]);
            return color((Object as ObjectGeneric).keys(d.data)[0]) as string;
        })
        .attr("stroke", "none")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    diagram
        .on("mouseover", (e: ObjectGeneric, d: d3.PieArcDatum<Data>) => mouseOver(d, toolDiv, totalValue))
        .on("mousemove", (e: ObjectGeneric) => mouseMove(e, toolDiv))
        .on("mouseout", () => mouseOut(toolDiv));
};

// set the dimensions and margins of the graph
const width = 450;
const height = 450;
const margin = 40;

const toolDivStyles = {
    key: "margin:0;padding:10px 0 0px 10px;font-weight: 900;font-size:12px",
    values: "margin:0;padding:0px 0 2px 10px",
};

const mouseOver = (d: d3.PieArcDatum<Data>, toolDiv: D3ToolTip, totalValue: number) =>
    toolDiv
        .style("visibility", "visible")
        .html(
            `<p style=${toolDivStyles.key}>${Object.keys(d.data)[0]}</p>` +
                "<br/>" +
                `<p style=${toolDivStyles.values}>${Math.round(
                    ((Object as ObjectGeneric).values(d.data)[0] / totalValue) * 100
                )}%</p>`
        );

const mouseMove = (e: ObjectGeneric, toolDiv: D3ToolTip) =>
    toolDiv.style("top", e.pageY - 50 + "px").style("left", e.pageX - 50 + "px");

const mouseOut = (toolDiv: D3ToolTip) => toolDiv.style("visibility", "hidden");

const ColorRange: string[] = ["#184e77", "#1a759f", "#34a0a4", "#76c893"];
