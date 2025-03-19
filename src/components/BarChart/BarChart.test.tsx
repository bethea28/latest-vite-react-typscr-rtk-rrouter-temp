import React from "react";
import { render, screen } from "@testing-library/react";
import { VerticalBarChart } from "./index";
import "@testing-library/jest-dom/extend-expect";
import { describe, it, expect } from "vitest";

describe("VerticalBarChart Component", () => {
  it("renders an SVG element", () => {
    render(<VerticalBarChart data={{}} />);
    expect(screen.getByTestId("bar-chart-svg")).toBeInTheDocument();
  });

  it("renders with default years if none are provided", () => {
    render(<VerticalBarChart data={{}} />);
    expect(screen.getByTestId("bar-chart-svg")).toBeInTheDocument();
  });
  it("renders with provided data and years", () => {
    const data = {
      "2010": 10,
      "2011": 20,
      "2012": 30,
    };
    const years = ["2010", "2011", "2012"];
    render(<VerticalBarChart data={data} years={years} />);
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});
