# Statusctl

Statusctl is a personal dashboard application that provides a quick overview of various real-time information, including weather, currency exchange rates, news, and more. It's built with Next.js and is designed to be a customizable and extensible platform for monitoring personal and public data feeds.

## How it Works

```
Next.js 15 (App Router)
 ├─┬ Server Actions
 │ ├── getWeather  ─→ OpenWeather API
 │ ├── getFxRate   ─→ exchangerate.host
 │ └── getNews     ─→ RSS Feeds (Hacker News, Arch Linux, Neovim)
 └─ Frontend
    ├─┬ Dashboard
    │ ├── Weather
    │ ├── Live FX
    │ ├── News
    │ ├── Air Quality
    │ ├── Vim Tip
    │ ├── Trivia Tip
    │ └── Weather Tip
    └─ Tailwind CSS + shadcn/ui
```

*All heavy lifting happens server-side; the browser only receives lightweight RSC-rendered HTML + hydrated widgets where needed.*

## Features

*   **Weather:** Get the current weather and a 7-day forecast.
*   **Live FX Rates:** Monitor the real-time PLN to GBP exchange rate.
*   **News Feeds:** Stay up-to-date with the latest headlines from Hacker News, Arch Linux, and Neovim.
*   **Air Quality:** Check the air quality and pollen levels in your area.
*   **Vim Tip of the Day:** Get a new Vim tip every day.
*   **Trivia Tip of the Day:** Get a new Trivia tip every day.
*   **Weather Tip of the Day:** Get a new Weather tip every day.

## Getting Started

### Prerequisites

*   Node.js 20+
*   pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/statusctl.git
    ```
2.  Install the dependencies:
    ```bash
    pnpm install
    ```
3.  Set up your environment variables by creating a `.env.local` file in the root of the project. You will need to add API keys for the weather and news feeds.

### Running the Application

To run the application in development mode, use the following command:

```bash
pnpm dev
```

This will start the development server on [http://localhost:3005](http://localhost:3005).

## Technologies Used

*   [Next.js](https://nextjs.org/) - React framework for building full-stack applications.
*   [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
*   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
*   [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
*   [Vitest](https://vitest.dev/) - A blazing fast unit-test framework powered by Vite.
*   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Simple and complete React DOM testing utilities that encourage good testing practices.
