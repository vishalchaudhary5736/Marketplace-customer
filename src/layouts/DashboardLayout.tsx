import type { ReactNode } from "react";
import LogoIcon from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { Search, UserRound } from "lucide-react";
import CartIcon from "../assets/Cart.png";

type Props = {
  children: ReactNode;
};

export function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-w-screen">
      <div className="w-full flex flex-col">
        <header className="flex gap-8 items-center bg-[#FFFFFF] border-b-2 border-b-[#E7E5E4] h-20 px-12">
          <Link to="/" className="flex items-center gap-2">
            <img src={LogoIcon} alt="Marketplace logo" className="h-6 w-6" />
            <span className="text-[18px] font-semibold text-[rgb(28,25,23)] ">
              Marketplace
            </span>
          </Link>
          <div className="w-160 h-11 max-w-160 px-3.5 flex items-center gap-2.5 border border-[rgb(214,211,206)] rounded-[10px] bg-[rgb(250,247,242)] text-[rgb(87,83,78)] grow">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search products, brands and stores"
              className="grow text-[15px] text-[rgb(28,25,23)] border-none outline-none"
            />
          </div>
          <nav className="flex items-center gap-6 ml-auto h-11">
            <Link to="/account" className="flex items-center gap-2 h-full">
              <UserRound className="h-4 w-4" />
              <span>Account</span>
            </Link>
            <Link to="" className="h-full flex items-center">
              Orders
            </Link>
            <Link
              to=""
              className="flex items-center gap-2 px-4 text-[15px] text-[#FFFFFF] bg-[rgb(28,25,23)] rounded-[10px] h-full"
            >
              <img src={CartIcon} className="w-4 h-4" />
              <p>Cart</p>
              <p className="w-5 h-5 px-2 min-w-5 font-semibold text-[12px] text-[#ffffff] rounded-[10px] flex items-center justify-center bg-brand">
                34
              </p>
            </Link>
          </nav>
        </header>
        <main className="flex flex-1 max-w-screen">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
