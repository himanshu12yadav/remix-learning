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

import styles from "./styles/main.css?url";

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

export function ErrorBoundary({error}:{error:Error}) {

    const caughtResponse: any = useRouteError()

    if (isRouteErrorResponse(caughtResponse)) {
        return (
            <div>
                <p>{error.message}</p>
            </div>
        )
    }

    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>{caughtResponse}</p>
            <p>Back to <Link to="/">Back to safety</Link></p>
        </main>
    )

}

export default function App() {
    return <Outlet/>;
}
