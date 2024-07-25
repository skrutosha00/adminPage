import { Navigate, useLocation } from "react-router-dom";
import { ReactElement } from "react";

import { useAppSelector } from "@/hooks/useAppSelector";
import { TLocation } from "@/services/types";
import { ROUTES } from "@/services/globalVars";
import { userSelector } from "@/services/selectors";

type TProps = {
  children: ReactElement;
  anonymousOnly?: boolean;
};

export default function ProtectedRoute({ children, anonymousOnly = false }: TProps) {
  const user = useAppSelector(userSelector());
  const location: TLocation = useLocation();

  const isLoggedIn = !!user;
  const fromLocation = location.state?.from || `/${ROUTES.DEFAULT}`;

  if (anonymousOnly && isLoggedIn) {
    return <Navigate to={fromLocation} />;
  }

  if (!anonymousOnly && !isLoggedIn) {
    return <Navigate to={`/${ROUTES.LOGIN}`} state={{ from: location }} />;
  }

  return children;
}
