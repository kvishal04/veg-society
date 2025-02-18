import ProductSummary from "@/components/Dashboard/DashboardSummary";
import ProductTable from "@/components/Dashboard/ProductTable.tsx/ProductTable";


export default function Dashboard() {
  return (
    <div className="calci"> 
        <ProductSummary />
        <ProductTable/>
    </div>
  );
}
