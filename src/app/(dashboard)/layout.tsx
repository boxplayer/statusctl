import type { ReactNode } from "react";
import "@/app/(dashboard)/globals.css";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function DashboardLayout({
  children,
  weather,
  livefx,
  vimtip,
  triviatip,
  news,
  airQuality,
  weathertip,
}: {
  children: ReactNode;
  weather: ReactNode;
  livefx: ReactNode;
  vimtip: ReactNode;
  triviatip: ReactNode;
  news: ReactNode;
  airQuality: ReactNode;
  weathertip: ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        className="
        grid 
        lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 
        gap-8
        pt-4 sm:pt-10 
        px-8 sm:px-20 
        pb-4 sm:pb-10
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
        <div className="lg:col-span-2 md:col-span-1 row-span-3 min-w-0">
          {news}
        </div>
        {children}

        {triviatip && (
          <div className="lg:col-span-1 md:col-span-1">{triviatip}</div>
        )}

        {weathertip && (
          <div className="lg:col-span-1 md:col-span-1">{weathertip}</div>
        )}
      </main>
      <div className="flex flex-row justify-center">
        <a
          href="https://github.com/boxplayer/statusctl"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:hidden sm:flex"
        >
          <Button variant="outline" size="icon">
            <Github className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </a>
      </div>
    </>
  );
}
