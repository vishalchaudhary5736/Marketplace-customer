import { Box } from "../../components/Box";
import { ArrowRight, Container, Heart, LocationEdit } from "lucide-react";
import { OrderTable } from "../../components/TableComponents/OrderTable";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { orders } from "../../constants/constant";
import { Link } from "react-router-dom";

const accountOverview = [
  {
    title: "Total orders",
    total: "8",
    icon: Container,
    tag: "View your order history",
    color: "bg-[#FFF0E8]",
    iconColor: "bg-[#e6b89e]",
  },
  {
    title: "Wishlist",
    total: "12 items",
    icon: Heart,
    tag: "Saved products",
    color: "bg-[#EAF3FF]",
    iconColor: "bg-[#c3d4ea]",
  },
  {
    title: "Total orders",
    total: "2",
    icon: LocationEdit,
    tag: "Manage your addresses",
    color: "bg-[#E8F8EF]",
    iconColor: "bg-[#c5f7db]",
  },
];

export function AccountOverviewPage() {
  const userDetail = useSelector((state: RootState) => state.auth.user);
  console.log("userDetail", userDetail);
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-4 bg-white px-6 py-5 rounded-2xl">
        <div>
          <h1 className="text-black font-extrabold text-[25px]">
            Account overview
          </h1>
          <p className="text-[13px] font-light text-[#706D6D]">
            A quick summary of your account activity
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {accountOverview.map((item) => (
            <Box item={item} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white px-6 py-5 rounded-2xl">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-[rgb(28,25,23)] font-semibold  text-[32px]">
                Personal information
              </h1>
              <p className="text-[15px] font-light text-[rgb(87,83,78)]">
                Manage your profile and contact details.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 ">
          <div className="px-2 border-r-2 border-[#ebe3e3]">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-gray-500 font-semibold">Full name</p>
              <p className="text-black font-semibold text-[17px]">
                {userDetail?.lastName
                  ? `${userDetail.firstName} ${userDetail.lastName}`
                  : userDetail?.firstName}
              </p>
            </div>
          </div>
          <div className="px-5 border-r-2 border-[#ebe3e3]">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-gray-500 font-semibold">
                Email address
              </p>
              <p>{userDetail?.email}</p>
            </div>
          </div>
          <div className="px-5">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-gray-500 font-semibold">
                Phone number
              </p>
              {userDetail?.countryCode ? (
                <p>
                  {userDetail.countryCode} {userDetail?.mobileNumber}
                </p>
              ) : (
                <p>-</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white px-6 py-5 rounded-2xl">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-[rgb(28,25,23)] font-semibold text-[20px]">
                Recent orders
              </h1>
              <p className="text-[13px] font-light text-[#706D6D]">
                Your last 4 orders
              </p>
            </div>
            <div>
              <Link
                to="/account/orders"
                className="underline flex gap-2 items-center px-3 py-2 text-[14px] rounded-md text-brand font-semibold"
              >
                <span>View all orders</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md">
          <OrderTable orders={orders.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
}
