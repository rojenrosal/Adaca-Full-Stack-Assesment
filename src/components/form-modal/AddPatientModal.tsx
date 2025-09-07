import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  ADD_PATIENT,
  type NewPatientInput,
  type AddPatientData,
  GET_PATIENTS,
} from "../../graphql/patients";

interface Props {
  onClose: () => void;
}

export const AddPatientModal: React.FC<Props> = ({ onClose }) => {
// Store the values typed into the form
  const [newPatient, setNewPatient] = useState<NewPatientInput>({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    condition: "",
  });

  const [errors, setErrors] = useState<string[]>([]);


  /// Hook for sending the "add patient" request
  //  after saving, we refresh the patient list so it shows up right away
  const [addPatient, { loading }] = useMutation<
    AddPatientData,
    { input: NewPatientInput }
  >(ADD_PATIENT, {
    refetchQueries: [{ query: GET_PATIENTS }],
  });


  //check form
  const validate = (): boolean => {
    const errs: string[] = [];
    if (!newPatient.firstName.trim()) errs.push("First name is required");
    if (!newPatient.lastName.trim()) errs.push("Last name is required");
    if (!["Male", "Female", "Other"].includes(newPatient.gender))
      errs.push("Gender must be Male, Female, or Other");
    if (!newPatient.condition.trim()) errs.push("Condition is required");
    setErrors(errs);
    return errs.length === 0;
  };

  //submit form
  const handleSubmit = async () => {
    if (!validate()) return;
    await addPatient({ variables: { input: newPatient } });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Patient</h2>

        {errors.length > 0 && (
          <ul className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
            {errors.map((err, i) => (
              <li key={i}>• {err}</li>
            ))}
          </ul>
        )}

        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={newPatient.firstName}
              onChange={(e) =>
                setNewPatient({ ...newPatient, firstName: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={newPatient.lastName}
              onChange={(e) =>
                setNewPatient({ ...newPatient, lastName: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              value={newPatient.age}
              onChange={(e) =>
                setNewPatient({ ...newPatient, age: Number(e.target.value) })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={newPatient.gender}
              onChange={(e) =>
                setNewPatient({ ...newPatient, gender: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <input
              type="text"
              value={newPatient.condition}
              onChange={(e) =>
                setNewPatient({ ...newPatient, condition: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
