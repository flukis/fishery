import { useState } from "react";
import Select, { components } from "react-select";

const ValueComponent = ({ children, ...props }) => {
  const { getValue, hasValue } = props;
  const length = getValue().length;
  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }
  return (
    <components.ValueContainer {...props}>
      {`${length} provinsi terpilih`}
    </components.ValueContainer>
  );
};

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
      className="select-option__checkbox_option"
    >
      <input type="checkbox" checked={isSelected} onChange={() => {}} />
      {children}
    </components.Option>
  );
};

type SelectOptions = {
  value: number | string;
  label: string;
};

export default function SelectWithTag({
  defaultValue,
  options,
  callback,
}: {
  defaultValue: SelectOptions;
  options: Array<SelectOptions>;
  callback: (val: Array<string | number>) => void;
}) {
  return (
    <Select
      placeholder="Pilih Provinsi"
      defaultValue={defaultValue}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      onChange={(options) => {
        if (Array.isArray(options)) {
          callback(options.map((opt) => opt.value));
        }
      }}
      autosize={false}
      className="select-option"
      options={options}
      components={{
        Option: InputOption,
        ValueContainer: ValueComponent,
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#6b7280",
        },
      })}
    />
  );
}
