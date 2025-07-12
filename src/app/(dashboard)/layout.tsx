import type { ReactNode } from "react";
import "@/app/(dashboard)/globals.css";

export default function DashboardLayout({
  children,
  weather,
  livefx,
}: {
  children: ReactNode;
  weather: ReactNode;
  livefx: ReactNode;
}) {
  return (
    <main
      className="
        grid auto-rows-[160px]
        lg:grid-cols-3 md:grid-cols-2
        grid-flow-row-dense gap-8
        p-8 sm:p-20 pb-20
        justify-items-stretch
      "
    >
      <div className="row-span-2">{weather}</div>

      <div className="flex flex-col gap-4">{livefx}</div>

      {children}
    </main>
  );
}
