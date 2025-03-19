import { useMemo } from "react";
import Select, { StylesConfig, OptionProps } from "react-select";
import { SelectOption } from "../../store/types";

interface NavSelectComponentProps {
  handleSelectChange: (selectedOption: SelectOption | null) => void;
  selectedValue: SelectOption | null;
  selectOptions: SelectOption[];
}

export const NavSelectComponent = ({
  handleSelectChange,
  selectedValue,
  selectOptions,
}: NavSelectComponentProps) => {
  const customStyles: StylesConfig<SelectOption, false> = useMemo(() => {
    // styling for the dropdown component
    return {
      option: (provided, state: OptionProps<SelectOption, false>) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "#007bff"
          : state.isFocused
          ? "#e0e0e0"
          : undefined,
        color: state.isSelected ? "white" : "black",
      }),
    };
  }, []);

  return (
    <nav>
      <Select
        options={selectOptions}
        value={selectedValue}
        onChange={handleSelectChange}
        isSearchable={false}
        placeholder="Select a neighborhood..."
        styles={customStyles}
      />
    </nav>
  );
};
