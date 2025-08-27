"use client";

interface TextInputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
}

export default function TextInput({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  autoComplete,
}: TextInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 dark:placeholder:text-gray-500 ${
            error
              ? "outline-red-300 focus:outline-red-500 bg-red-50 text-red-900 dark:bg-red-950/20 dark:text-red-200"
              : "outline-gray-300 focus:outline-indigo-600 bg-white text-gray-900 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:focus:outline-indigo-500"
          }`}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {maxLength && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {value.length}/{maxLength} characters
          </p>
        )}
      </div>
    </div>
  );
}
