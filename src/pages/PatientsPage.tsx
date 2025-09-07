import { PatientManagement } from "../components/PatientMangement";
import { DashboardLayout } from "../layouts/DashboadLayout";



export default function PatientsPage() {
  return (
    <DashboardLayout>
      <PatientManagement />
    </DashboardLayout>
  );
}
