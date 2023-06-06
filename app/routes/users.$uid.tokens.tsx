import {
  type LoaderFunction,
  json,
} from "@remix-run/node";
import {  getAdminAuth } from "~/models/firebase.server";

const KollaAPIKey = process.env.KOLLA_API_KEY ?? "";
const fetchToken = (
  consumer_id: string,
  username: string = "",
  email: string = ""
) =>
  fetch("https://api.getkolla.com/connect/v1/consumers:consumerToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${KollaAPIKey}`,
    },
    body: JSON.stringify({
      consumer_id,
      metadata: { username, email },
    }),
  });

export let loader: LoaderFunction = async ({ request, params }) => {
  const uid = params.uid;
  if (!uid) {
    return json({ status: "error", message: "missing uid" }, { status: 500 });
  }
  const adminAuth = getAdminAuth();
  if(!adminAuth){
    return json({ status: "error", message: "admin failed to init" }, { status: 500 });
  }
  const user = await adminAuth.getUser(uid);
  const tokenResponse = await fetchToken(uid, user.displayName, user.email);
  if (tokenResponse.status >= 400) {
    if (!uid) {
      return json(
        { status: "error", message: tokenResponse.statusText },
        { status: 400 }
      );
    }
  }
  const token = await tokenResponse.json();

  return json( token);
};

