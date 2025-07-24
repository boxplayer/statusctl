import type { ReactNode } from "react";
import "@/app/(dashboard)/globals.css";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
  weather,
  livefx,
  vimtip,
  triviatip,
  news,
  airQuality,
}: {
  children: ReactNode;
  weather: ReactNode;
  livefx: ReactNode;
  vimtip: ReactNode;
  triviatip: ReactNode;
  news: ReactNode;
  airQuality: ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        className="
        grid 
        lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 
        gap-8
        p-8 sm:p-20 pb-20
        justify-items-stretch
        xl:max-w-[80%]
        w-full mx-auto
      "
      >
        <div className="row-span-2">{weather}</div>
        <div className="row-span-2">{airQuality}</div>
        <div className="row-span-2">
          <div className="flex flex-col gap-8">
            {livefx}

            {vimtip}
          </div>
        </div>
        {triviatip}
        <div className="lg:col-span-2 md:col-span-1 row-span-2 min-w-0">
          {news}
        </div>
        {children}
      </main>
    </>
  );
}
