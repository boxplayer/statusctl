import type { ReactNode } from "react";
import "@/app/(dashboard)/globals.css";

export default function DashboardLayout({
  children,
  weather,
  livefx,
  vimtip,
  news,
}: {
  children: ReactNode;
  weather: ReactNode;
  livefx: ReactNode;
  vimtip: ReactNode;
  news: ReactNode;
}) {
  return (
    <main
      className="
        grid auto-rows-[350px]
        lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 
        gap-8
        p-8 sm:p-20 pb-20
        justify-items-stretch
      "
    >
      <div className="row-span-2">{weather}</div>
      <div>{livefx}</div>
      <div>{livefx}</div>

      <div>{vimtip}</div>
      <div className="lg:col-span-2 md:col-span-1 row-span-2">{news}</div>
      {children}

      <div>{livefx}</div>
    </main>
  );
}
