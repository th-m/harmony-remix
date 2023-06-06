// import { kollaSDK } from "@kolla/js-sdk";
import { ConnectorButton } from "@kolla/react-sdk";
import type { V2_MetaFunction } from "@remix-run/node";

import { useAuth } from "~/hooks/use.auth";
import { fitbitConnectorId, rescuetimeConnectorId, wakatimeConnectorId } from "~/models/kolla";
// import { useKollaToken } from "~/hooks/use.kolla.token";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Harmony Hub" },
    { name: "description", content: "We are Unifying Productivity!" },
  ];
};
interface Token {
    name?: string
    token?: string
    expiry_time?: string
  }
export default function Index() {
  const auth = useAuth();
  
  return (
    <>

      <h1 className="text-6xl m-auto text-center">
        {auth.user?.displayName}'s Dashboard
      </h1>
      <div className="flex flex-col w-60 gap-5">

    <ConnectorButton connectorID={wakatimeConnectorId} styleOverrides={{"button":{display:"flex",flex:1, width:'100%',flexDirection:'row', justifyContent:'flex-start'}}} />
    <ConnectorButton connectorID={fitbitConnectorId} styleOverrides={{"button":{display:"flex",flex:1,width:'100%', flexDirection:'row', justifyContent:'flex-start'}}}  />
      </div>
      {/* <button onClick={() => kollaSDK.openConnector(wakatimeConnectorId)}>
        Wakatime connector
      </button>
      <button onClick={() => kollaSDK.openConnector(rescuetimeConnectorId)}>
        RescueTime
      </button>
      <button onClick={() => kollaSDK.openConnector(fitbitConnectorId)}>
        Fitbit
      </button> */}
    </>
  );
}
