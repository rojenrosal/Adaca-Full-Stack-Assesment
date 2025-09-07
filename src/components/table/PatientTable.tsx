import React from "react";
import type { Patient } from "../../graphql/patients";

export const PatientTable: React.FC<{ patients: Patient[] }> = ({ patients }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Age</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Gender</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Condition</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-200">
          {patients.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-6 text-center text-gray-500 italic"
              >
                No patients found
              </td>
            </tr>
          ) : (
            patients.map((p, i) => (
              <tr
                key={p.id}
                className={
                  i % 2 === 0
                    ? "bg-white text-gray-800"
                    : "bg-blue-50 text-gray-800"
                }
              >
                <td className="px-6 py-3">{`${p.firstName} ${p.lastName}`}</td>
                <td className="px-6 py-3">{p.age}</td>
                <td className="px-6 py-3">{p.gender}</td>
                <td className="px-6 py-3">{p.condition}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
