import type { ReactNode } from "react";
import "@/app/(dashboard)/globals.css";

export default function DashboardLayout({
  children,
  weather,
  livefx,
  vimtip,
}: {
  children: ReactNode;
  weather: ReactNode;
  livefx: ReactNode;
  vimtip: ReactNode;
}) {
  return (
    <main
      className="
        grid auto-rows-[160px]
        lg:grid-cols-3 md:grid-cols-2
        gap-8
        p-8 sm:p-20 pb-20
        justify-items-stretch
      "
    >
      <div className="row-span-2">{weather}</div>

      <div>{livefx}</div>

      <div>{vimtip}</div>
      {children}
    </main>
  );
}
