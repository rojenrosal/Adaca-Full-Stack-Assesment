# I.Coding Challenge


# Task: Patient Management Dashboard Prototype


A responsive patient management dashboard built with **React**, **TypeScript**, **Apollo Client (GraphQL)**, and **TailwindCSS**. This app allows doctors and staff to view, search, add, and manage patient records easily in a clean UI.

-----

## ✨ Features

  * **📋 Patient Management** – View patients with name, age, gender, and condition.
  * **🔍 Search & Filter** – Quickly find patients by name.
  * **➕ Add New Patients** – Add patient records via a modal form.
  * **⏭ Pagination** – Navigate through patient lists with ease.
  * **🎨 Modern UI** – Styled with TailwindCSS and icons from Lucide.

-----

## 🛠️ Tech Stack

  * **React** (functional components + hooks)
  * **Apollo Client** (GraphQL queries & mutations)
  * **TailwindCSS** (styling & responsive design)
  * **Lucide Icons** (modern SVG icons)
  * **Mock GraphQL API** (using Apollo mockLink for demo data)

-----

## 📂 Project Structure

```
src/
│── components/       # UI components (tables, inputs, modals, etc.)
│   ├── table/        # PatientTable + PaginationControls
│   ├── form-modal/   # AddPatientModal
│   ├── Feedback.tsx  # Loading & Error states
│   ├── SearchInput.tsx
│   └── PatientManagement.tsx
│
│── graphql/          # GraphQL queries, mutations, and types
│   ├── patients.ts   # GET_PATIENTS, ADD_PATIENT
│   └── mockLink.ts   # Mock Apollo Link for local data
│
│── layouts/          # Layout components (DashboardLayout)
│── pages/            # Page-level components (PatientsPage)
│── App.tsx           # Root app entry with ApolloProvider
│── index.css         # TailwindCSS setup
```

-----

## 🚀 Getting Started

1.  **Clone the repo**

    ```bash
    git clone https://github.com/rojenrosal/Adaca-Full-Stack-Assesment.git
    cd Adaca-Full-Stack-Assesment
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the dev server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

App runs at 👉 http://localhost:3000



## Screen Shots
**Default View**
<img width="1440" height="779" alt="page" src="https://github.com/user-attachments/assets/c431cd3a-22a4-4b64-b570-1154be9f94ef" />
**Form View**
<img width="1440" height="771" alt="form" src="https://github.com/user-attachments/assets/686df85e-a447-4bb9-899e-57e94a0cf2a3" />
**Added View**
<img width="1440" height="778" alt="added" src="https://github.com/user-attachments/assets/05987f32-464e-41b9-876b-fbfea946bd25" />



