import type { ReactNode } from "react";
import "@/app/(dashboard)/globals.css";

export default function NewsLayout({
  newsArch,
  newsNeovim,
}: {
  children: ReactNode;
  newsArch: ReactNode;
  newsNeovim: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex-1 ">{newsArch}</div>

      <div className="flex-1 ">{newsNeovim}</div>
    </div>
  );
}
