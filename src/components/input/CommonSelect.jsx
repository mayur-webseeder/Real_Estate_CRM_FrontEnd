const CommonSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  icon: Icon,
}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-fit border-inherit">
      {label && (
        <label htmlFor={name} className="font-semibold text-sm text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative w-full border-inherit">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full py-3 px-4 ${
            Icon ? "pl-10" : "px-4"
          } border border-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white capitalize`}
        >
          <option value="">Select {name} </option>
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CommonSelect;
