import { createClient } from "@/lib/supabase/server";
import AssetAllocationForm from "./asset-allocation-form";
import { DataTable } from "@/components/data-table";
import { assetAllocationColumnsWithDelete } from "./columns";
import AssetPieChart from "./asset-pie-chart";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default async function AssetAllocation() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: assetAllocations, error } = await supabase
    .from("asset_allocation")
    .select("*")
    .eq("user_id", data.user?.id);

  if (error) {
    // TODO: handle error
  }

  if (!assetAllocations) {
    return <div>No asset allocations found</div>;
  }

  return (
    <AuthenticatedRoute>
      <main className="p-8">
        <h1 className="mb-4 text-4xl font-bold">Asset Allocation</h1>
        <AssetAllocationForm />
        <div className="mt-10">
          <DataTable
            columns={assetAllocationColumnsWithDelete}
            data={assetAllocations}
          />
        </div>
        <div className="mx-auto mt-20 h-96 w-96">
          <AssetPieChart assetAllocations={assetAllocations} />
        </div>
      </main>
    </AuthenticatedRoute>
  );
}
