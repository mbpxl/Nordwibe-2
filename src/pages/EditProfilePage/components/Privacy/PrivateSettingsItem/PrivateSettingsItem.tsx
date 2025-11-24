import React from "react";
import type { PrivateSettingsTypes } from "../types/PrivateSettingsTypes";

interface Props {
  label: string;
  field: keyof PrivateSettingsTypes;
  value: boolean;
  onToggle: (field: keyof PrivateSettingsTypes) => void;
}

const PrivateSettingsItem: React.FC<Props> = ({
  label,
  field,
  value,
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200">
      <span className="text-gray-800 text-base">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={() => onToggle(field)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-600 transition-colors"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
};

export default PrivateSettingsItem;
