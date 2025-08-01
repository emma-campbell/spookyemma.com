"use client";

import { RouterProvider } from "react-aria-components";
import { useRouter } from "next/navigation";

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Router({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <RouterProvider navigate={router.push}>
      {children}
    </RouterProvider>
  );
}