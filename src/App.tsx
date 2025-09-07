import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { mockLink } from './graphql/mockLink';
import './index.css';
import { ApolloProvider } from '@apollo/client/react';

import PatientsPage from './pages/PatientsPage';


const client = new ApolloClient({
  link: mockLink,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50">
        <PatientsPage />
      </div>
    </ApolloProvider>
  );
};

export default App;
