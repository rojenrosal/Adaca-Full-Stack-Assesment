import { gql } from '@apollo/client';



// Get a list of patients
// Can search by name
// Can fetch results in "pages" using offset (start) and limit (how many)
// Returns patient details we want to show
export const GET_PATIENTS = gql`
  query GetPatients($search: String, $offset: Int, $limit: Int) {
    patients(search: $search, offset: $offset, limit: $limit) {
      id
      firstName
      lastName
      age
      gender
      condition
      __typename
    }
  }
`;

// Add a new patient
// Needs basic patient info as input
// Sends back the patient that was added so the UI can update
export const ADD_PATIENT = gql`
  mutation AddPatient($input: NewPatientInput!) {
    addPatient(input: $input) {
      id
      firstName
      lastName
      age
      gender
      condition
      __typename
    }
  }
`;



// A single patient record
export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  condition: string;
  __typename?: string; 
};


export type NewPatientInput = Omit<Patient, 'id'>;


export type AddPatientData = {
  addPatient: Patient;
};

export type GetPatientsData = {
  patients: Patient[];
};
