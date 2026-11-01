import {
  User,
  Home,
  MapPin,
  Package,
  Heart,
  Shield,
  LogOut,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../services/authApi";
import { baseApi } from "../services/baseApi";
import { removeCredentials } from "../app/authSlice";
import toast from "react-hot-toast";
import type { RootState } from "../app/store";

const sidebarLinks = [
  { label: "Account overview", path: "/account/overview", icon: Home },
  { label: "Personal information", path: "/account/personal-info", icon: User },
  { label: "Addresses", path: "/account/addresses", icon: MapPin },
  { label: "Orders", path: "/account/orders", icon: Package },
  { label: "Wishlist", path: "/account/wishlist", icon: Heart },
  { label: "Security", path: "/account/security", icon: Shield },
];

export function AccountLayout() {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const userDetail = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async () => {
    try {
      const apiResponse = await logout({ allDevices: true }).unwrap();
      toast.success(apiResponse.message);
    } catch {
      // Server logout failed; still log out locally below
      toast.success("Logged out");
    } finally {
      dispatch(removeCredentials());
      dispatch(baseApi.util.resetApiState());
    }
  };
  return (
    <div className="flex items-start gap-8">
      {/* Left sidebar */}
      <aside className="w-64 shrink-0 rounded-xl border border-[#E7E5E4] bg-white p-4">
        <div className="flex items-center gap-3 border-b border-[#E7E5E4] pb-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F7E1D5]">
            <User className="h-8 w-8 text-[rgb(180,68,27)]" />
          </div>

          <div className="min-w-0">
            <h2 className="font-bold">
              {userDetail?.lastName
                ? `${userDetail.firstName} ${userDetail.lastName}`
                : userDetail?.firstName}
            </h2>
            <p className="truncate text-sm text-[#706D6D]">
              {userDetail?.email}
            </p>
          </div>
        </div>

        <nav className="mt-4 flex flex-col gap-1">
          {sidebarLinks.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
                  isActive
                    ? "bg-[#FFF0E8] font-semibold text-[rgb(180,68,27)]"
                    : "text-[#292524] hover:bg-[#F5F5F4]"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}

          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-3 rounded-lg px-3 cursor-pointer py-3 text-left text-sm hover:bg-[#F5F5F4]"
          >
            <LogOut className="h-5 w-5" />
            {isLoading ? "Logout..." : "Logout"}
          </button>
        </nav>
      </aside>

      {/* Right-side content changes with the route */}
      <section className="min-w-0 flex-1">
        <Outlet />
      </section>
    </div>
  );
}
