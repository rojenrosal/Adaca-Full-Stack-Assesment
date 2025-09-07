import React from "react";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput: React.FC<Props> = ({ value, onChange }) => (
  <div className="relative w-full sm:w-80 md:w-96">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search patients..."
      className="pl-10 pr-3 py-2 w-full rounded-xl border text-black border-gray-300 bg-white shadow-sm placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors
                 text-sm sm:text-base"
    />
  </div>
);
