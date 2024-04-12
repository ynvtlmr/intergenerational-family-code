import AuthenticatedRoute from "../(auth)/authenticated-route";
import OrgChartWrapper from "./org-chart-wrapper";

export default function OrgChartPage() {
  return (
    <AuthenticatedRoute>
      <OrgChartWrapper />
    </AuthenticatedRoute>
  );
}
