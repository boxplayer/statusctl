import { ModeToggle } from "@/components/theme/ModeToggle.client";
import { Github } from "lucide-react";
import { Button } from "../ui/button";

export const asciiLogo = `
▄▄███▄▄· ███████╗████████╗ █████╗ ████████╗██╗   ██╗███████╗ ██████╗████████╗██╗     
██╔════╝ ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║   ██║██╔════╝██╔════╝╚══██╔══╝██║     
███████╗ ███████╗   ██║   ███████║   ██║   ██║   ██║███████╗██║        ██║   ██║     
╚════██║ ╚════██║   ██║   ██╔══██║   ██║   ██║   ██║╚════██║██║        ██║   ██║     
███████║ ███████║   ██║   ██║  ██║   ██║   ╚██████╔╝███████║╚██████╗   ██║   ███████╗
╚═▀▀▀══╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝
`;

export default function Header() {
  return (
    <header className="flex items-center justify-between p-2 ">
      <div className="flex flex-col gap-2" />
      <pre className="logo-ascii">{asciiLogo}</pre>
      <div className="flex flex-col gap-2">
        <a
          href="https://github.com/boxplayer/statusctl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="icon">
            <Github className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}
