import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "./styles/app.css";
import { AuthProvider } from "./hooks/use.auth";
import { KollaTokenWrapper, KollaWrapper } from "./hooks/use.kolla.token.client";
import { Suspend } from "./components/suspend";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="bg-slate-900 min-h-screen font-sans text-base text-gray-200">
          <Suspend>
            <AuthProvider>
              <KollaWrapper>
                <Outlet />
              </KollaWrapper>
            </AuthProvider>
          </Suspend>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
