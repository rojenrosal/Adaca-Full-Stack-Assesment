import React from "react";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasNext: boolean;
}

export const PaginationControls: React.FC<Props> = ({ page, setPage, hasNext }) => (
  <div className="flex justify-between mt-6">
    <button
      disabled={page === 0}
      onClick={() => setPage((p) => Math.max(p - 1, 0))}
      className="px-4 py-2 rounded-lg bg-white text-gray-700 border border-gray-300 shadow-sm 
                 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:hover:bg-white"
    >
       Previous
    </button>

    <button
      disabled={!hasNext}
      onClick={() => setPage((p) => p + 1)}
      className="px-4 py-2 rounded-lg bg-white text-gray-700 border border-gray-300 shadow-sm 
                 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:hover:bg-white"
    >
      Next 
    </button>
  </div>
);
