import { useState, useEffect } from "react";
import { Feature, SelectOption } from "./store/types";

// filters data and returns it back sorted in alphabetical order
export const useInputSearchFilter = (
  neighborhoods: Feature[],
  location: string
): [Feature[], SelectOption[]] => {
  const [finalFilteredResults, setFinalFilteredResults] = useState<Feature[]>(
    []
  );
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (!neighborhoods || neighborhoods.length === 0) {
      setFinalFilteredResults([]);
      setSelectOptions([]);
      return;
    }

    const filteredNeighborhoodData = neighborhoods.filter((place) =>
      place?.properties?.name.toLowerCase().includes(location.toLowerCase())
    );

    let results =
      location.length === 0 ? neighborhoods : filteredNeighborhoodData;

    results = [...results].sort((a, b) => {
      const aName = a.properties?.name ?? ""; // Default to an empty string if a.properties is undefined
      const bName = b.properties?.name ?? ""; // Default to an empty string if b.properties is undefined

      return aName.toLowerCase().localeCompare(bName.toLowerCase());
    });

    const options = results.map((option) => ({
      value: option.properties?.name ?? "", // Default to an empty string if properties or name is undefined
      label: option.properties?.name ?? "", // Default to an empty string if properties or name is undefined
      allData: option,
    }));

    setSelectOptions(options);
    setFinalFilteredResults(results);
  }, [location, neighborhoods]);

  return [finalFilteredResults, selectOptions];
};

// returns random colors
export const useGetRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
