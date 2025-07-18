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
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 p-4">{newsArch}</div>

      <div className="flex-1 p-4">{newsNeovim}</div>
    </div>
  );
}
