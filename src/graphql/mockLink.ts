import { ApolloLink, Observable } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { ADD_PATIENT, GET_PATIENTS, type Patient, type NewPatientInput } from './patients';

// Extend Patient type with Apollo's __typename to simulate GraphQL responses
type PatientMock = Patient & { __typename: 'Patient' };

// In-memory mock dataset (pretend this is our "database")
const patients: PatientMock[] = [
  { id: '1', firstName: 'John',   lastName: 'Doe',    age: 30, gender: 'Male',   condition: 'Flu',          __typename: 'Patient' },
  { id: '2', firstName: 'Jane',   lastName: 'Smith',  age: 25, gender: 'Female', condition: 'Cold',         __typename: 'Patient' },
  { id: '3', firstName: 'Alice',  lastName: 'Johnson',age: 40, gender: 'Female', condition: 'Diabetes',     __typename: 'Patient' },
  { id: '4', firstName: 'Bob',    lastName: 'Brown',  age: 50, gender: 'Male',   condition: 'Hypertension', __typename: 'Patient' },
  { id: '5', firstName: 'Charlie',lastName: 'Davis',  age: 35, gender: 'Male',   condition: 'Asthma',       __typename: 'Patient' },
  { id: '6', firstName: 'Diana',  lastName: 'Miller', age: 28, gender: 'Female', condition: 'Allergy',      __typename: 'Patient' },
];

// Utility function to simulate server-side filtering + pagination
const getPatients = (search: string, offset: number, limit: number): PatientMock[] => {
  const s = (search ?? '').toLowerCase();

  // Filter patients by firstName or lastName containing the search string and also return only the requested "page" of results
  const filtered = patients.filter(
    p => p.firstName.toLowerCase().includes(s) || p.lastName.toLowerCase().includes(s)
  );

  return filtered.slice(offset, offset + limit);
};

// ApolloLink to mock GraphQL server responses
export const mockLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    setTimeout(() => {
      try {
    
        if (operation.query === GET_PATIENTS) {
          const { search = '', offset = 0, limit = 5 } = (operation.variables ?? {}) as {
            search?: string; offset?: number; limit?: number;
          };
          observer.next({
            data: { patients: getPatients(search, offset, limit) },
          });
          observer.complete();

       
        } else if (operation.query === ADD_PATIENT) {
          const { input } = operation.variables as { input: NewPatientInput };

   
          const newPatient: PatientMock = { id: uuidv4(), ...input, __typename: 'Patient' };


          patients.push(newPatient);

          observer.next({ data: { addPatient: newPatient } });
          observer.complete();


        } else {
          throw new Error('Unknown operation');
        }
      } catch (err) {
     
        observer.error(err);
      }
    }, 300);
  });
});
