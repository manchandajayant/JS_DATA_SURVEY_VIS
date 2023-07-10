import * as d3 from "d3";
import { Dispatch, SetStateAction } from "react";
import { D3ToolTip, DataByToolTypeMap, ObjectGeneric, ToolType } from "../Types/types";

const margin = { top: 20, right: 160, bottom: 35, left: 30 };
const width = 760 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
const valueStyle = "margin:0;padding:10px 0 0px 10px;font-weight: 900;font-size:12px";
const participantStyle = "margin:0;padding:0px 0px 0px 10px;font-weight: 900;font-size:12px";

export const makeBarChart = (
  processData: DataByToolTypeMap[],
  updated: boolean,
  setUpdated: Dispatch<SetStateAction<boolean>>,
  ref: React.RefObject<HTMLInputElement>,
  selected?: string
) => {
  if (updated) d3.select(".svg").remove();
  const selectedToolData = getSelectedToolData(processData, selected);

  const d3Data = dataProcessingForD3(selectedToolData).sort((a: Record<string, any>, b: Record<string, any>) =>
    Object.keys(a) > Object.keys(b) ? 1 : -1
  );

  if (d3Data.length) {
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("class", "svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMinYMin")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.selectAll("rect").remove();

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(d3Data.map((d) => Object.keys(d)[0]));
    y.domain([0, d3.max(d3Data, (d) => (Object as ObjectGeneric).values(d)[0])]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append("text");

    svg.append("g").call(d3.axisLeft(y).tickFormat((d) => (d === 0 ? "0" : (d as number) / 1000 + "k")));

    const toolDiv = d3.select(ref.current).append("div").attr("class", "tooldiv");

    const defs = svg.append("defs");
    const bgGradient = defs.append("linearGradient").attr("id", "bg-gradient").attr("gradientTransform", "rotate(105)");

    bgGradient.append("stop").attr("stop-color", "#1a759f").attr("offset", "0%");
    bgGradient.append("stop").attr("stop-color", "#76c893").attr("offset", "100%");

    svg.selectAll(".bar")
      .data(d3Data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(Object.keys(d)[0])!)
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(0))
      .attr("height", (d) => height - y(0));

    svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d) => y((Object as ObjectGeneric).values(d)[0]))
      .attr("height", (d) => height - y((Object as ObjectGeneric).values(d)[0]))
      .style("fill", "url(#bg-gradient)")
      .delay((_d, i) => i * 100);

    svg.selectAll("rect")
      .on("mouseover", (e, d) => mouseOver(d as ObjectGeneric, toolDiv))
      .on("mousemove", (e) => mouseMove(e, toolDiv))
      .on("mouseout", () => mouseOut(toolDiv));
  }
  setUpdated(false);
};

const getSelectedToolData = (processData: ObjectGeneric[], selected?: string) =>
  processData.filter((toolData) => toolData.tool === (selected ? selected : processData[0].tool));

const mouseOver = (d: ObjectGeneric, toolDiv: D3ToolTip) => {
  toolDiv.style("visibility", "visible").html(
    `<p style=${valueStyle}>
      ${(Object as ObjectGeneric).values(d)}
    </p>
    <p style=${participantStyle}>
      Participants
    </p>`
  );
};

const mouseMove = (e: ObjectGeneric, toolDiv: D3ToolTip) =>
  toolDiv.style("top", `${e.pageY - 50}px`).style("left", `${e.pageX - 50}px`);

const mouseOut = (toolDiv: D3ToolTip) => toolDiv.style("visibility", "hidden");

const dataProcessingForD3 = (selectedToolData: ObjectGeneric[]) => {
  const processedData: Record<string, any>[] = [];
  for (const tool in selectedToolData[0]) {
    if (tool !== "tool") {
      processedData.push({
        [tool]: selectedToolData ? (selectedToolData[0][tool] as ToolType) : "",
      });
    }
  }
  return processedData;
};
