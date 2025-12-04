"use client";

import { useEffect, useRef } from "react";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null);

  // These change whenever navigation happens
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When the URL changes → start the loading bar
    ref.current?.continuousStart();

    // After DOM updates → complete it
    const timeout = setTimeout(() => {
      ref.current?.complete();
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]); // triggers on any route change

  return (
    <LoadingBar
      color="var(--muted-foreground)"
      ref={ref}
      shadow={true}
      height={2}
    />
  );
}
