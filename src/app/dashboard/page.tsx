import Header from "@/components/Common/Header";
import ProductSummary from "@/components/Dashboard/ProductSummary";
import Table from "@/components/Dashboard/Table/Table";

export default function Dashboard() {
  return (
    <div className=""> 
        <Header />
        <ProductSummary />
        <Table/>
    </div>
  );
}
