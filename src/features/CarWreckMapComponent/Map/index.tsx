import React, { useRef, useEffect } from "react";
//must import d3 like this to advoid type errors and error when running test
import * as d3Selection from "d3-selection";
import * as d3Geo from "d3-geo";
import { VerticalBarChart } from "../../../components/BarChart";
import { AccidentDisplay } from "../../../components/AccidentDisplay";
import { useGetRandomColor } from "../../../customHooks";
import { FeatureCollection, Feature } from "../../../store/types";
import { SelectOption } from "../../../store/types";
import "./Map.css";

const { select } = d3Selection;
const { geoMercator, geoPath } = d3Geo;

interface MapProps {
  neighborhoods: FeatureCollection; // geojson feature collection of dc neighborhoods
  searchValue: SelectOption | null; // selected option from search, if any
  handleMapClick: (selectedMapData: {
    properties: Feature["properties"]; // function to handle map click events
  }) => void;
  clickStarter: string | null; // indicates if the click originated from map or select
}

// dc neighborhoods map component
export const Map = ({
  neighborhoods,
  searchValue,
  handleMapClick,
  clickStarter,
}: MapProps) => {
  // state to store the properties of the clicked neighborhood
  const [neighborhoodProperties, setNeighborHoodProperties] = React.useState<{
    properties: Feature["properties"];
  } | null>(null);
  // state to store the id of the selected neighborhood
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = React.useState<
    string | number | null
  >(null);

  // custom hook to generate random colors
  const randomColor = useGetRandomColor();
  // ref to the svg element for d3 manipulations
  const svgRef = useRef<SVGSVGElement>(null);

  // use effect to render the map on component mount and data updates
  useEffect(() => {
    if (!neighborhoods || neighborhoods.features.length === 0) return;
    // reset selected neighborhood if click originated from select
    if (clickStarter === "select") {
      // click starter will either be from the map or dropdown select
      setSelectedNeighborhoodId(null);
      setNeighborHoodProperties(null);
    }
    const svg = select(svgRef.current);
    const width = 1200;
    const height = 900;
    svg.attr("width", width).attr("height", height);

    // create a mercator projection for the map
    // this turns geographical coodrinates into 2d screen coordinates that an svg can use
    const projection = geoMercator()
      .scale(150000) // set the scale of the projection
      .fitExtent(
        [
          [10, 10],
          [width - 10, height - 10],
        ],
        neighborhoods
      ); // fit the projection to the neighborhoods data

    // create a path generator for the map
    // this takes the screen coordinates and draws onto the svg path
    const pathGenerator = geoPath().projection(projection);
    // clear previous map elements
    svg.selectAll("path").remove();
    svg.selectAll("text").remove();

    // create paths for each neighborhood
    svg
      .selectAll("path")
      .data(neighborhoods.features) // bind data to paths
      .enter()
      .append("path")
      .attr("d", pathGenerator) // set the path data
      .attr(
        "fill",
        (
          d: Feature // measns something specific to d3 for data binding so dont change.
        ) =>
          // this logic controls the map colors based on map or drowndown clicking
          d.id === selectedNeighborhoodId // set fill color based on selection
            ? randomColor
            : searchValue?.allData?.id === d.id //
            ? randomColor
            : "yellow"
      )
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .on("click", (event: MouseEvent, d: Feature) => {
        // this is the handleClick for the map
        // d is the location object that was clicked
        const selectedMapData = { properties: d.properties };
        handleMapClick(selectedMapData);
        setSelectedNeighborhoodId(d.id);
        setNeighborHoodProperties(selectedMapData);
      });

    // logic for text labels for each neighborhood
    svg
      .selectAll("text")
      .data(neighborhoods.features) // bind data to text elements
      .enter()
      .append("text")
      .attr("x", (d: Feature) => pathGenerator.centroid(d)[0])
      .attr("y", (d: Feature) => pathGenerator.centroid(d)[1])
      .text((d: Feature) => d.properties.name)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", "8px")
      .style("pointer-events", "none");
  }, [
    neighborhoods,
    selectedNeighborhoodId,
    searchValue,
    handleMapClick,
    clickStarter,
    randomColor,
  ]);

  // determine the selected data based on click origin
  // click comes from map or dropdown
  const selectedData =
    clickStarter === "map" ? neighborhoodProperties : searchValue?.allData;

  const shouldRenderChart =
    clickStarter &&
    (neighborhoodProperties?.properties || searchValue?.allData);

  return (
    <section className="dc-neighborhoods-map">
      <AccidentDisplay
        total={selectedData?.properties?.total}
        name={selectedData?.properties.name}
      />
      <svg className="dc-neighborhoods-map__svg" ref={svgRef}></svg>
      {shouldRenderChart && (
        <VerticalBarChart
          years={["2010", "2011", "2012", "2013", "2014"]}
          data={selectedData?.properties as unknown as Record<string, number>}
        />
      )}
    </section>
  );
};
