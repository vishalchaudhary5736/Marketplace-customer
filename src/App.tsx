import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { OtpPage } from "./pages/OtpPage";
import { ForgotPasswordPage } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { DashboardPage } from "./pages/Dashboard";
import { AccountPage } from "./pages/Account/AccountPage";
import { AccountOverviewPage } from "./pages/Account/AccountOverviewPage";
import { PersonalInfo } from "./pages/Account/PersonalInfoPage";
import { OrdersPage } from "./pages/Account/OrdersPage";
import { SecurityPage } from "./pages/Account/SecurityPage";
import { WishListPage } from "./pages/Account/WishlistPage";
import { AddressPage } from "./pages/Account/Addresses";
import { EditProfile } from "./pages/Account/EditAccountPage";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<OtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/account" element={<AccountPage />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<AccountOverviewPage />} />
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="wishlist" element={<WishListPage />} />
            <Route path="addresses" element={<AddressPage />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
