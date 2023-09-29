export default function InputText({
  label,
  placeholder,
  get,
  disabled,
  isRequired,
}: {
  label: string;
  placeholder: string;
  get: (v: string) => void;
  disabled: boolean;
  isRequired: boolean;
}) {
  return (
    <div className="input-form">
      <label htmlFor={label.trim()}>
        {label}
        <span className="required">*</span>
      </label>
      <input
        type="text"
        onChange={(e) => get(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={isRequired}
      />
    </div>
  );
}
