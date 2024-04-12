import AuthenticatedRoute from "../(auth)/authenticated-route";
import FamilyTreeWrapper from "./family-tree-wrapper";

export default function FamilyTreePage() {
  return (
    <AuthenticatedRoute>
      <FamilyTreeWrapper />
    </AuthenticatedRoute>
  );
}
