import React, { useState, useCallback } from "react";
import { FilterSearchComponent } from "./FilterSearch";
import { useInputSearchFilter } from "../../customHooks";
import { Map } from "./Map";
import { NavSelectComponent } from "../../components/NavSelectComponent";
import { HeaderComponent } from "../../components/HeaderComponent";
import { useSelector } from "react-redux";
import { FeatureCollection } from "../../store/types";

interface NeighborhoodData {
  data: FeatureCollection;
  loading: boolean;
  error: string | null;
}

interface RootStateWithNeighborhoodData {
  neighborhoodData: NeighborhoodData;
}

interface SelectOption {
  value: string;
  label: string;
}

export const CarWreckMapComponent = () => {
  // geojson data from redux
  const { data } = useSelector(
    (state: RootStateWithNeighborhoodData) => state.neighborhoodData
  );
  const [location, setLocation] = useState<string>("");
  const [filterResults, selectOptions] = useInputSearchFilter(
    data.features,
    location as string
  );
  const [selectedValue, setSelectedValue] = useState<SelectOption | null>(null); // stores data from dropdown
  const [clickStarter, setClickStarter] = useState<string | null>(null); //stores whether the user click comes from map or dropdown

  const handleLocationSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocation(event.target.value);
    },
    []
  );

  const resetSearch = useCallback(() => {
    setLocation("");
    setSelectedValue(null);
  }, []);

  const handleSelectChange = useCallback(
    (selectedOption: SelectOption | null) => {
      setClickStarter("select");
      setSelectedValue(selectedOption);
    },
    []
  );

  const handleMapClick = useCallback(() => {
    setClickStarter("map");
    resetSearch();
  }, [resetSearch]);

  return (
    <main>
      <FilterSearchComponent
        handleLocationSearch={handleLocationSearch}
        resetSearch={resetSearch}
        searchTotal={filterResults.length}
        location={location}
      />
      <HeaderComponent />
      <NavSelectComponent
        handleSelectChange={handleSelectChange}
        selectedValue={selectedValue}
        selectOptions={selectOptions}
      />
      <Map
        handleMapClick={handleMapClick}
        searchValue={selectedValue}
        neighborhoods={data}
        clickStarter={clickStarter}
      />
    </main>
  );
};
