import type { V2_MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { Login, Logout } from "~/components/login.client";
import { Suspend } from "~/components/suspend";
import { useAuth } from "~/hooks/use.auth";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Harmony Hub" },
    { name: "description", content: "We are Unifying Productivity!" },
  ];
};

export default function Index() {
  const auth = useAuth()
  console.log(auth)
  const navigate = useNavigate();
  useEffect(()=>{
    if(auth?.user?.uid){
      navigate('/dashboard')
    }
  },[auth?.user?.uid])
  return (
    <>
      <h1 className="text-6xl m-auto text-center">Harmony Hub</h1>
      <span className="flex flex-1">
        <Suspend>
          <Login />
          <Logout />
        </Suspend>
      </span>
    </>
  );
}
