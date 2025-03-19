import React from "react";
import { render, screen } from "@testing-library/react";
import { NavSelectComponent } from "./index";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { describe, it, expect } from "vitest";

describe("NavSelectComponent", () => {
  const selectOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleSelectChange = vi.fn();

  it("select appears on screen", () => {
    render(
      <NavSelectComponent
        handleSelectChange={handleSelectChange}
        selectedValue={null}
        selectOptions={selectOptions}
      />
    );
    expect(screen.getByText("Select a neighborhood...")).toBeInTheDocument();
  });
  it("renders the select component with options", () => {
    render(
      <NavSelectComponent
        handleSelectChange={handleSelectChange}
        selectedValue={null}
        selectOptions={selectOptions}
      />
    );

    expect(screen.getByText("Select a neighborhood...")).toBeInTheDocument();
    selectOptions.forEach((option) => {
      expect(screen.queryByText(option.label)).toBeNull(); // Options are not visible until opened
    });
  });
});
