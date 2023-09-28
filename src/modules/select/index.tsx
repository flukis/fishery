import Select from "react-select";

export type SelectOptions = {
  value: number | string;
  label: string;
};

export default function InputSelect({
  defaultValue,
  options,
  callback,
  placeholder,
  label = "Select",
  size = "default",
}: {
  defaultValue: SelectOptions;
  options: Array<SelectOptions>;
  callback: (val: string | number) => void;
  placeholder: string;
  label: string;
  size?: "sm" | "default";
}) {
  return (
    <div>
      <label htmlFor={label.trim()}>{label}</label>
      <Select
        id={label.trim()}
        defaultValue={defaultValue}
        placeholder={placeholder}
        options={options}
        className={`select-option select-option_${size}`}
        onChange={(opt) => {
          callback(opt.value);
        }}
      />
    </div>
  );
}
