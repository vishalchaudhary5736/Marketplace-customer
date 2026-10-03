import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";
import { NAVIGATION_SCREENS } from "../utils/navigationScreens";

export function PublicRoute() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  if (accessToken) {
    return <Navigate to={NAVIGATION_SCREENS.HOME} />;
  }
  return <Outlet />;
}
