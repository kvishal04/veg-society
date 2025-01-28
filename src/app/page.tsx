import Header from "@/components/Common/_Header";
import ProductSummary from "@/components/Dashboard/_ProductSummary";
import Table from "@/components/Dashboard/Table/Table";

export default function Home() {
  return (
    <div className=""> 
        <Header />
        <ProductSummary />
        <Table/>
    </div>
  );
}
