import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    Link, useRouteError,
    isRouteErrorResponse
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import MainNavigation from "~/components/NavLink";

import styles from "./styles/main.css";

export const links: LinksFunction = () => [
    {
    rel: "stylesheet",
    href: styles,
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation/>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({error}) {

    const caughtResponse = useRouteError()

    if (isRouteErrorResponse(caughtResponse)) {
        return (
            <div>
                <h1>{error.status}{error.statusText}</h1>
                <p>{error.message}</p>
            </div>
        )
    }

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
            <title>An error occured</title>
        </head>
        <body>
        <main className="error">
            <h1>An error occured!</h1>
            <p>{error}</p>
            <p>Back to <Link to="/">Back to safety</Link></p>
        </main>

        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    )

}

export default function App() {
    return <Outlet/>;
}
