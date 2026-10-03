import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { NAVIGATION_SCREENS } from "../utils/navigationScreens";

export function PrivateRoute() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const location = useLocation();

  if (!accessToken) {
    return (
      <Navigate
        to={NAVIGATION_SCREENS.LOGIN_SCREEN}
        replace
        state={{ from: location }}
      />
    );
  }
  return <Outlet />;
}
