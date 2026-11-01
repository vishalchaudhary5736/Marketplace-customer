import { DashboardLayout } from "../../layouts/DashboardLayout";
import { AccountLayout } from "../../layouts/AccountLayout";

export function AccountPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col w-[70%] mx-auto mt-15 gap-5">
        <AccountLayout />
      </div>
    </DashboardLayout>
  );
}
