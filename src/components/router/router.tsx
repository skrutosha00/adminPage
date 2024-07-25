import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

import { ROUTES } from "@/services/globalVars";
import ProtectedRoute from "@/components/protectedRoute/protectedRoute";
import PageSuspense from "@/components/pageSuspense/pageSuspense";
import Main from "@/pages/main/main";

const Stat = lazy(() => import("@/pages/stat/stat"));
const Error = lazy(() => import("@/pages/error/error"));
const Login = lazy(() => import("@/pages/login/login"));

export default function Router() {
  return (
    <PageSuspense>
      <Routes>
        <Route path="/" errorElement={<Error />}>
          <Route path={ROUTES.MAIN}>
            <Route
              path={ROUTES.USER}
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path={ROUTES.STAT}
            element={
              <ProtectedRoute>
                <Stat />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.LOGIN}
            element={
              <ProtectedRoute anonymousOnly={true}>
                <Login />
              </ProtectedRoute>
            }
            errorElement={<Error />}></Route>

          <Route index element={<Navigate to={ROUTES.DEFAULT} />} />
        </Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </PageSuspense>
  );
}
