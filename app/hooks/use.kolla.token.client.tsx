
// import { kollaSDK } from "@kolla/js-sdk";
import { KollaSDKProvider } from "@kolla/react-sdk";
import { sdk } from "~/models/kolla.client";
import { useAuth } from "./use.auth";
import { useEffect, useMemo, useState } from "react";


interface Token {
    name?: string
    token?: string
    expiry_time?: string
  }
export function KollaTokenWrapper() {
  const auth = useAuth();
  const [tokenData, setTokenData] = useState<Token>();
  // const sdk = useMemo(() => kollaSDK,[]);
  // const sdk = useKollaSDK();
  useEffect(() => {
    if (auth.userId) {
      fetch(`/users/${auth.userId}/tokens`)
        .then((resp) => resp.json())
        .then((data) => setTokenData(data));
    }
  }, [auth.userId]);

  const consumerToken = useMemo(()=>tokenData?.token,[tokenData?.token])
    
  useEffect(()=>{
    if( consumerToken){
      
      console.log("I am authenticating")
      sdk.authenticate(consumerToken)
    }
  },[consumerToken])

  return (<></>)
}

export function KollaWrapper({children}:{children:React.ReactNode}){
  const auth = useAuth();
  const [tokenData, setTokenData] = useState<Token>();
  // const sdk = useMemo(() => kollaSDK,[]);
  // const sdk = useKollaSDK();
  useEffect(() => {
    if (auth.userId) {
      fetch(`/users/${auth.userId}/tokens`)
        .then((resp) => resp.json())
        .then((data) => setTokenData(data));
    }
  }, [auth.userId]);

  const consumerToken = useMemo(()=>tokenData?.token,[tokenData?.token])
    
  // useEffect(()=>{
  //   if( consumerToken){
      
  //     console.log("I am authenticating")
  //     sdk.authenticate(consumerToken)
  //   }
  // },[consumerToken])
  if(consumerToken){
   return (

     <KollaSDKProvider token={consumerToken}>
      {children}
    </KollaSDKProvider>
     ) 
    }
    return (
 
      <>
       {children}
     </>
      ) 

}