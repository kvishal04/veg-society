import Header from "@/components/Common/Header";
import ProductSummary from "@/components/Dashboard/ProductSummary";
import ProductTable from "@/components/Dashboard/ProductTable.tsx/ProductTable";

export default function Dashboard() {
  return (
    <div className="calci"> 
        <ProductSummary />
        <ProductTable/>
    </div>
  );
}
