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
}: {
  defaultValue: SelectOptions;
  options: Array<SelectOptions>;
  callback: (val: string | number) => void;
  placeholder: string;
}) {
  return (
    <div>
      <Select
        defaultValue={{ label: defaultValue.label, value: defaultValue.value }}
        placeholder={placeholder}
        options={options}
        className="select-option_sm"
        onChange={(opt) => {
          callback(opt.value);
        }}
      />
    </div>
  );
}
