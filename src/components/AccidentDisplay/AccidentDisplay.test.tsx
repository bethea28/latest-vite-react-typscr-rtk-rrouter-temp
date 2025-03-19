import React from "react";
import { render, screen } from "@testing-library/react";
import { AccidentDisplay } from "./index";
import { describe, it, expect } from "vitest";

import "@testing-library/jest-dom/extend-expect";

describe("AccidentDisplay Component", () => {
  it("renders with default props", () => {
    render(<AccidentDisplay />);
    expect(screen.getByText("Accident Display")).toBeInTheDocument();
    expect(screen.getByText("Total Accident: 0")).toBeInTheDocument();
  });

  it("renders with custom name and total (number)", () => {
    render(<AccidentDisplay name="Test Name" total={10} />);
    expect(screen.getByText("Test Name")).toBeInTheDocument();
    expect(screen.getByText("Total Accident: 10")).toBeInTheDocument();
  });

  it("renders with custom name and total (string)", () => {
    render(<AccidentDisplay name="Another Test" total="5" />);
    expect(screen.getByText("Another Test")).toBeInTheDocument();
    expect(screen.getByText("Total Accident: 5")).toBeInTheDocument();
  });

  it("renders with custom name and total (null)", () => {
    render(<AccidentDisplay name="Null Test" total={null} />);
    expect(screen.getByText("Null Test")).toBeInTheDocument();
    expect(screen.getByText("Total Accident: 0")).toBeInTheDocument();
  });
});
