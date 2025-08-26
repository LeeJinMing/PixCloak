import { Suspense } from "react";
import CompressClient from "./Client";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CompressClient />
    </Suspense>
  );
}


