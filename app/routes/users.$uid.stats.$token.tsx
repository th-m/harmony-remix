import {
  type ActionFunction,
  type LoaderFunction,
  type MetaFunction,
  json,
} from "@remix-run/node";

const getCredentialsFetch = (
  token: string,
  consumer_id: string,
  connector_id: string
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ consumer_id }),
  };

  return fetch(
    `https://api.getkolla.com/connect/v1/connectors/${connector_id}/linkedaccounts/-:credentials`,
    requestOptions
  );
};

const wakatimeConnectorId = "wakatime-16575";
const fitbitConnectorId = "fitbit-55416";
const rescuetimeConnectorId = "waitign for them to get back to me";

const constructIntervalTime = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const getReportURLs = (
  dayOffset: number,
  rescueTimeKey: string,
  wakatimeKey: string
) => {
  const date = new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000);
  const interval = constructIntervalTime(date);
  const rescueTimeInterval = "day";
  // https://www.rescuetime.com/rtx/developers
  const rescueTimeReportURL = `https://www.rescuetime.com/anapi/data?key=${rescueTimeKey}&perspective=interval&restrict_kind=productivity&interval=${rescueTimeInterval}&restrict_begin=${interval}&restrict_end=${interval}&format=json`;
  // https://wakatime.com/developers
  const wakatimeReportURL = `https://wakatime.com/api/v1/users/current/summaries?api_key=${wakatimeKey}&start=${interval}&end=${interval}`;
  return {
    date,
    rescueTimeReportURL,
    wakatimeReportURL,
  };
};

interface CredentialsResponse {
  /** @description LinkedAccount access token, if available */
  token?: string;
  /**
   * Format: date-time
   * @description timestamp for when a new token should be requested
   */
  expiry_time?: string;
  /** @description secret key value pairs, available keys depend on the connector type. Basic auth connectors will have a username and password. OAuth2 and most APIKey connectors will not have any secrets */
  secrets?: { [key: string]: string };
}
interface LinkedAccount {
  /** @description Resource name of the connector */
  name?: string;
  /** @description The system ID of the resource */
  uid?: string;
  /** @description The consumer that the LinkedAccount belongs to */
  consumer_id?: string;
  consumer_metadata?: Record<string, string>;
  /** @description Install URL that the end user can use to install the connector The install_uri is only set if the user has not yet completed the install. */
  install_uri?: string;
  /**
   * Format: enum
   * @description current state of the LinkedAccount
   * @enum {string}
   */
  state?: "INITIALIZED" | "ACTIVE" | "FAILED" | "DISABLED";
  /** @description A user displayable message about the linked_account state */
  state_message?: string;
  /** @description Current credentials for the linked account, only needs to be supplied if migrating existing credentials into Kolla. Credentials can only be accessed through the Credentials endpoint */
  credentials?: { [key: string]: string };
  /** @description Additional auth data received from the provider during consumer authentication, typically from oauth flows */
  auth_data?: { [key: string]: unknown };
  agent_auth_data?: any;
  /**
   * Format: enum
   * @description current state of the embedded credentials, can be used to determine if the user needs to re-auth before the credentials expire or need to be manually refreshed, typically a sub-state of the state field
   * @enum {string}
   */
  auth_state?: "UNAVAILABLE" | "VALID" | "REAUTH_REQUIRED" | "INVALID";
  /** @description A user displayable message about the auth state */
  auth_state_description?: string;
  /** @description Scopes associated with the linked account credentials, only needs to be provided if migrating credentials into Kolla */
  linked_account_scopes?: string[];
  /** @description Labels associated with the linked account */
  labels?: { [key: string]: string };
  /** @description Configuration values provided by the consumer */
  consumer_config_values?: { [key: string]: string };
  /**
   * Format: date-time
   * @description Timestamps. See: https://aip.kolla.dev/kolla/9001 create time
   */
  create_time?: string;
  /**
   * Format: date-time
   * @description time of last update
   */
  update_time?: string;
  /**
   * Format: date-time
   * @description expiration time of the linked account, active linked accounts don't expire, expired linked accounts will be deleted soon after expiration
   */
  expire_time?: string;
}
interface Credentials {
  credentials?: CredentialsResponse;
  linked_account?: LinkedAccount;
}
export let loader: LoaderFunction = async ({ request, params }) => {
  const uid = params.uid;
  const token = params.token;
  if (!token || !uid) {
    return json({ status: "error", message: "missing uid" }, { status: 500 });
  }
  const responses = await Promise.all([
    getCredentialsFetch(token, uid, wakatimeConnectorId),
    getCredentialsFetch(token, uid, fitbitConnectorId),
  ]);
  const keys: Credentials[] = await Promise.all(
    responses.map((response) => response.json())
  );
  const [wakatimeCredentials, fitbitCredentials] = keys;

  const reportUrls = getReportURLs(
    1,
    "",
    wakatimeCredentials?.credentials?.token ?? ""
  );
  const reqWakatime = await fetch(reportUrls.wakatimeReportURL);
  const wakaJson = await reqWakatime.json();
  return json({ wakaJson });
};
