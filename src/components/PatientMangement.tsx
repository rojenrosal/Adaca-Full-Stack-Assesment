import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_PATIENTS, type Patient } from "../graphql/patients";
import { SearchInput } from "./SearchInput";
import { ErrorMessage, Loading } from "./Feedback";
import { PatientTable } from "./table/PatientTable";
import { PaginationControls } from "./table/PaginationControls";
import { AddPatientModal } from "./form-modal/AddPatientModal";

const PAGE_SIZE = 5;


type GetPatientsData = {
  patients: Patient[];
};

export const PatientManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load patients from the server
  // uses the search term and current page
  // each page shows PAGE_SIZE patients
  const { data, loading, error } = useQuery<GetPatientsData>(GET_PATIENTS, {
    variables: { search, offset: page * PAGE_SIZE, limit: PAGE_SIZE },
  });

  // make sure we always have an array (even if data is missing)
  const patients: Patient[] = useMemo(() => data?.patients ?? [], [data]);

 return (
    <div className="p-4 sm:p-6 sm:max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
        Patient Management
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        Manage patient records, search, and add new patients.
      </p>

      {/* Search + Add */}
      <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SearchInput value={search} onChange={setSearch} />

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 shadow-sm transition-colors w-full md:w-auto"
        >
          + Add Patient
        </button>
      </div>

      {/* Patient List */}
      <div className="bg-white shadow-md border border-gray-200 rounded-2xl overflow-hidden">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          <div className="overflow-x-auto">
            <PatientTable patients={patients} />
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <span className="text-sm text-gray-500">
          Page {page + 1}
        </span>
        <PaginationControls
          page={page}
          setPage={setPage}
          hasNext={patients.length >= PAGE_SIZE}
        />
      </div>

      {/* Modal */}
      {showAddModal && <AddPatientModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};