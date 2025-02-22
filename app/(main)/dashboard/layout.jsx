import { Suspense } from "react";
import loading from "./loading"

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <Suspense
        fallback={loading}
      >
        {children}
      </Suspense>
    </div>
  );
}