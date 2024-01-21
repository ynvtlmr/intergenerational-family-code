import FamilyTree from "./family-tree";
import { FamilyTreeDataButton } from "./family-tree-data-button";

export default function FamilyTreePage() {
  return (
    <div className="relative">
      <FamilyTree />
      <FamilyTreeDataButton />
    </div>
  );
}
