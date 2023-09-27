import Select from "react-select";

type SelectOptions = {
  value: number | string;
  label: string;
};

export default function InputSelect({
  defaultValue,
  options,
  callback,
}: {
  defaultValue: Array<string | number>;
  options: Array<SelectOptions>;
  callback: (val: Array<string | number>) => void;
}) {
  return (
    <div>
      <Select
        defaultValue={defaultValue}
        options={options}
        className="select-option_sm"
        onChange={(options) => {
          if (Array.isArray(options)) {
            callback(options.map((opt) => opt.value));
          }
        }}
      />
    </div>
  );
}
