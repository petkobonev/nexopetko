import { useField } from "formik";
import React from "react";
import ReactSelect from "react-select";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  isClearable?: boolean;
  onInputChange?: (value: string) => void;
  isLoading?: boolean;
};

const SelectInput = ({
  options,
  name,
  placeholder,
  label,
  isClearable = false,
  onInputChange,
  isLoading,
}: Props) => {
  const [field, , { setValue, setTouched }] = useField<string>(name);

  return (
    <div>
      {label && (
          <label className="form-label cms-label">
            {label}
          </label>
      )}
      <ReactSelect
        onChange={(option) => (option ? setValue(option.value) : setValue(""))}
        name={field.name}
        options={options}
        instanceId="select-input"
        placeholder={placeholder}
        isLoading={isLoading}
        onInputChange={onInputChange}
        inputId={field.name}
        value={
          options?.find((option) => option.value === field.value)
            ? options.find((option) => option.value === field.value)
            : null
        }
        onBlur={() => setTouched(true)}
        isClearable={isClearable}
      />

    </div>
  );
};

export default SelectInput;
