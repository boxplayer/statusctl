import Image from "next/image";
import Weather from "./widgets/Weather/WeatherCard";
import LiveFX from "./widgets/LiveFX/LiveFX";

export default function Home() {
  return (
    <div>
      <main className="grid grid-rows-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 sm:p-20 pb-20 justify-items-stretch">
        <div className="row-span-2">
          <Weather />
        </div>
        <LiveFX baseCurrency="GBP" />
        <LiveFX baseCurrency="USD" />
        <LiveFX baseCurrency="EUR" />
        <div className="row-span-2">
          <Weather />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
