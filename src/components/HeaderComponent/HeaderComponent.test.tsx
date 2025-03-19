import React from "react";
import { render, screen } from "@testing-library/react";
import { HeaderComponent } from "./index";
import "@testing-library/jest-dom/extend-expect";
import { describe, it, expect } from "vitest";

describe("HeaderComponent", () => {
  it("renders with default props (empty strings)", () => {
    render(<HeaderComponent />);
    expect(screen.getAllByText("")[1]).toBeInTheDocument();
    expect(screen.getAllByText("")[1]).toBeInTheDocument(); // because there are two empty p tags.
  });

  it("renders with description prop", () => {
    const descriptionText = "This is a description.";
    render(<HeaderComponent description={descriptionText} />);
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });

  it("renders with details prop", () => {
    const detailsText = "These are details.";
    render(<HeaderComponent details={detailsText} />);
    expect(screen.getByText(detailsText)).toBeInTheDocument();
  });

  it("renders with both description and details props", () => {
    const descriptionText = "Description here.";
    const detailsText = "Details here.";
    render(
      <HeaderComponent description={descriptionText} details={detailsText} />
    );
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
    expect(screen.getByText(detailsText)).toBeInTheDocument();
  });

  it("renders with undefined description and details props", () => {
    render(<HeaderComponent description={undefined} details={undefined} />);
    expect(screen.getAllByText("")[1]).toBeInTheDocument();
    expect(screen.getAllByText("")[1]).toBeInTheDocument();
  });
});
