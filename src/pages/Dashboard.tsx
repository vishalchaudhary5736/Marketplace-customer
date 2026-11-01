import { Link } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";

export function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="min-w-screen">
        <nav className="flex items-center h-12 px-12 text-[14px] text-[1C1917] gap-7 shrink-0 border-b border-b-[#E7E5E4]">
          <Link to="">All categories</Link>
          <Link to="">Electronics</Link>
          <Link to="">Fashion</Link>
          <Link to="">Home & Kitchen</Link>
          <Link to="">Beauty</Link>
          <Link to="">Sports</Link>
          <Link to="">Books</Link>
          <Link to="">Toys</Link>
          <Link to="" className="ml-auto text-brand underline">
            Sell on Marketplace
          </Link>
        </nav>
      </div>
    </DashboardLayout>
  );
}
