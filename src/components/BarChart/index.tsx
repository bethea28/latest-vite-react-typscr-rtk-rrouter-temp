import { useRef, useEffect, useMemo } from "react";
import "./BarChart.css";
// must import d3 libraries like this in order to advoid typescript errors
import * as d3Selection from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

const { select } = d3Selection;
const { scaleBand, scaleLinear } = d3Scale;
const { max } = d3Array;
const { axisBottom, axisLeft } = d3Axis;

interface VerticalBarChartProps {
  data: Record<string, number> | undefined;
  years?: string[];
}

interface WreckDataPoint {
  year: string;
  wrecks: number;
}
interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export const VerticalBarChart = ({
  data,
  years = ["2010", "2011", "2012", "2013", "2014"], // default years
}: VerticalBarChartProps) => {
  // svg ref that d3 uses
  const svgRef = useRef<SVGSVGElement>(null);

  // maps the wreck data into correct form
  const wreckData = useMemo<WreckDataPoint[]>(() => {
    if (!data) {
      return [];
    }
    return years.map((year: string) => ({
      year,
      wrecks: data[year] || 0,
    }));
  }, [data, years]);

  const margin = useMemo<Margin>(() => {
    return { top: 20, right: 20, bottom: 30, left: 40 };
  }, []); // re-calculate only if dependency change (none here)

  // chart dimensions
  const innerWidth = 300;
  const innerHeight = 250;

  // main logic for drawing chart
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current); //d3 selectss the svg

    svg.selectAll("*").remove(); // remove any previous chart

    // create a group element for chart
    const g = svg
      .append("g") // g means something specific to d3 so dont change
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // creating x-axis scale
    const x = scaleBand()
      .domain(wreckData.map((d) => d.year))
      .range([0, innerWidth]) // width of the chart
      .padding(0.1);

    // extract wreck counts from data and filter out non-numbers
    const wrecksArray = wreckData
      .map((d) => d.wrecks)
      .filter((w) => typeof w === "number") as number[];

    // create y-axis
    const y = scaleLinear()
      .domain([0, max(wrecksArray) ?? 0]) // numbers go  from 0 to max
      .nice() //
      .range([innerHeight, 0]); // range is the height

    // append x-axis to the chart
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(axisBottom(x));

    // append y-axis to the chart
    g.append("g").call(axisLeft(y));

    // create bars for the chart
    g.selectAll(".bar")
      .data(wreckData) // bind data to bars
      .enter()
      .append("rect") // append rect elements for bars
      .attr("class", "bar") // add class for styling
      .attr("x", (d) => x(d.year) ?? 0) // set x position of bars
      .attr("y", (d) => y(d.wrecks || 0)) // set y position of bars
      .attr("width", x.bandwidth())
      .attr("height", (d) => (d.wrecks ? innerHeight - y(d.wrecks) : 0))
      .attr("fill", "steelblue");
  }, [data, wreckData, margin]);

  return (
    <svg
      data-testid="bar-chart-svg"
      className="vertical-bar-chart__svg"
      ref={svgRef}
      width={400}
      height={300}
    />
  );
};
