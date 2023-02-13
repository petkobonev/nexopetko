import { useField } from "formik";
import {useEffect} from "react";

type Props = {
  name: string;
  type?: "text" | "number";
  label?: string;
  subLabel?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const TextInput = ({
  name,
  type = "text",
  label,
    placeholder,
    subLabel,
  onChange,
}: Props) => {
  const [field, meta] = useField<string>(name);
  const isError = meta.error !== undefined && meta.touched;

  useEffect(() => {
    if (onChange) {
      onChange(field.value);
    }
  }, [field.value, onChange]);

  return (
    <div>
      {label && (
        <label className="form-label cms-label">
          {label}
        </label>
      )}
      <input
        {...field}
        value={field.value || ""}
        type={type}
        placeholder={placeholder}
        className={`form-control ${isError && "border-danger" && "is-invalid"}`}
        id={name}
        name={name}
      />
      {subLabel && <small>{subLabel}</small>}
    </div>
  );
};

export default TextInput;
