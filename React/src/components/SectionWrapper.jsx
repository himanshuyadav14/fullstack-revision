import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Skeleton } from "./Skeleton";

export function SectionWrapper({ Component }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Skeleton height={250} />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}
