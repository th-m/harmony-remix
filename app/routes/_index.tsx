import type { V2_MetaFunction } from "@remix-run/node";
import { Header } from "~/components/header";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="bg-slate-900 min-h-screen font-sans text-base text-gray-200" >
      <Header />
      <h1 className="text-6xl m-auto text-center">Harmony Hub</h1>
    </div>
  );
}
