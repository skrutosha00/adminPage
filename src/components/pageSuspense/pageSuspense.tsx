import { Suspense } from "react";

import styles from "./pageSuspense.module.css";
import Loader from "../loader/loader";

export default function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className={`${styles.loader} block`}>
          <Loader />
        </div>
      }>
      {children}
    </Suspense>
  );
}
