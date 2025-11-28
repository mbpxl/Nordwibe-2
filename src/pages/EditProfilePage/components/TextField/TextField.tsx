type TextFieldTypes = {
  title: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const TextField: React.FC<TextFieldTypes> = ({
  title,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="text-[0.875rem] font-semibold leading-[0.75rem]">
      <h1>{title}</h1>
      <div className="w-full mt-3 border-2 rounded-[12px] border-purple-main p-2 focus-within:ring-2 focus-within:ring-purple-300 bg-white">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className="min-w-[120px] flex-1 outline-none font-medium placeholder:font-normal"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextField;
