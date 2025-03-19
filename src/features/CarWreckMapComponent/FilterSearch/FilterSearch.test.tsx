import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterSearchComponent } from "./index";
import "@testing-library/jest-dom/extend-expect";
import { vi } from "vitest";
import { describe, it, expect } from "vitest";

describe("FilterSearchComponent", () => {
  const mockHandleLocationSearch = vi.fn();
  const mockResetSearch = vi.fn();

  const mockLocation = "test location";

  const mockFilterResults = {
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
        id: "1",
        properties: {
          "2010": 10,
          "2011": 15,
          "2012": 20,
          "2013": null,
          "2014": 25,
          name: "Neighborhood A",
          cartodb_id: 1001,
          objectid: 501,
          web_url: "https://example.com/location-a",
          label_name: "A-Label",
          datelastmo: "2023-10-15",
          shape_leng: 120.45,
          shape_area: 340.67,
          total: 70,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-73.981, 40.768],
              [-73.982, 40.769],
              [-73.98, 40.77],
              [-73.979, 40.769],
              [-73.981, 40.768], // Closing the polygon
            ],
          ],
        },
      },
      {
        type: "Feature",
        id: "2",
        properties: {
          "2010": 5,
          "2011": 8,
          "2012": 12,
          "2013": 18,
          "2014": 22,
          name: "Neighborhood B",
          cartodb_id: 1002,
          objectid: 502,
          web_url: "https://example.com/location-b",
          label_name: "B-Label",
          datelastmo: "2023-11-20",
          shape_leng: 98.76,
          shape_area: 280.55,
          total: 65,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-74.005, 40.712],
              [-74.006, 40.713],
              [-74.004, 40.714],
              [-74.003, 40.713],
              [-74.005, 40.712],
            ],
          ],
        },
      },
    ],
  };

  it("renders correctly with provided props", () => {
    render(
      <FilterSearchComponent
        handleLocationSearch={mockHandleLocationSearch}
        resetSearch={mockResetSearch}
        location={mockLocation}
        searchTotal={mockFilterResults.features.length}
      />
    );

    expect(
      screen.getByPlaceholderText(
        "Use Filter to narrow Neighborhood dropdown search!"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reset Search Filter" })
    ).toBeInTheDocument();
    expect(screen.getByText("Dropdown Results: 2")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("test location");
  });

  it("calls handleLocationSearch when input changes", () => {
    render(
      <FilterSearchComponent
        handleLocationSearch={mockHandleLocationSearch}
        resetSearch={mockResetSearch}
        location={mockLocation}
        searchTotal={mockFilterResults.features.length}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "new value" },
    });

    expect(mockHandleLocationSearch).toHaveBeenCalledTimes(1);
    expect(mockHandleLocationSearch).toHaveBeenCalledWith(expect.anything());
  });

  it("calls resetSearch when reset button is clicked", () => {
    render(
      <FilterSearchComponent
        handleLocationSearch={mockHandleLocationSearch}
        resetSearch={mockResetSearch}
        location={mockLocation}
        searchTotal={mockFilterResults.features.length}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Reset Search Filter" })
    );

    expect(mockResetSearch).toHaveBeenCalledTimes(1);
  });

  it("renders the correct number of dropdown results", () => {
    render(
      <FilterSearchComponent
        handleLocationSearch={mockHandleLocationSearch}
        resetSearch={mockResetSearch}
        location={mockLocation}
        searchTotal={mockFilterResults.features.length} // or mockFilterResults.features.length
      />
    );

    const resultText = `Dropdown Results: ${mockFilterResults.features.length}`;

    // Use getAllByText to get all matching elements
    const elements = screen.getAllByText(resultText);
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });
});
