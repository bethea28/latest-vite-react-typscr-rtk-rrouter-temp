import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { Map } from "./index";
import { FeatureCollection } from "../../../store/types";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe("DCNeighborhoodsMap", () => {
  const mockHandleMapClick = vi.fn();

  const neighborhoods: FeatureCollection = {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
      },
    },
    features: [
      {
        type: "Feature",
        id: 0,
        properties: {
          2010: null,
          2011: 2,
          2012: 1,
          2013: null,
          2014: null,
          name: "Naylor Gardens",
          cartodb_id: 10,
          objectid: 10,
          web_url: "http://op.dc.gov",
          label_name: "Naylor \r\nGardens",
          datelastmo: "2003/04/10 00:00:00+00",
          shape_leng: 2986.253185,
          shape_area: 559270.42939,
          total: 3,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-76.958104, 38.854865],
              [-76.962013, 38.851817],
              [-76.962884, 38.851922],
              [-76.964408, 38.853257],
              [-76.965626, 38.854592],
              [-76.96737, 38.856846],
              [-76.967644, 38.857513],
              [-76.968181, 38.858851],
              [-76.968198, 38.859638],
              [-76.968208, 38.860248],
              [-76.966929, 38.859914],
              [-76.96475, 38.860735],
              [-76.958924, 38.859288],
              [-76.958927, 38.858786],
              [-76.958964, 38.857259],
              [-76.958974, 38.856515],
              [-76.958612, 38.855313],
              [-76.958104, 38.854865],
            ],
          ],
        },
      },
    ],
  };

  it("renders the map and handles click events", () => {
    render(
      <Map
        neighborhoods={neighborhoods}
        searchValue={null}
        handleMapClick={mockHandleMapClick}
        clickStarter="map"
      />
    );

    // see if the neighborhood name is rendered
    expect(screen.getByText("Naylor Gardens")).toBeInTheDocument();
  });
});
