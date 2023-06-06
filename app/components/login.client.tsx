import { useEffect, useState } from "react";
import type { Auth} from "firebase/auth";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { auth, uiConfig } from "~/models/firebase.client";
const ELEMENT_ID = "firebaseui_container";

function FirebaseAuth({
  uiConfig,
  firebaseAuth,
  className,
}: {
  uiConfig: firebaseui.auth.Config;
  firebaseAuth: Auth;
  className?: string;
}) {
  useEffect(() => {
    let userSignedIn = false;

    // Get or Create a firebaseUI instance.
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseAuth);

    if (uiConfig.signInFlow === "popup") firebaseUiWidget.reset();

    // We track the auth state to reset firebaseUi if the user signs out.
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn) firebaseUiWidget.reset();
      userSignedIn = !!user;
    });

    // Render the firebaseUi Widget.
    firebaseUiWidget.start("#" + ELEMENT_ID, uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [uiConfig, firebaseAuth]);

  return <div className={className} id={ELEMENT_ID} />;
}

export const Login = () => {

  const [sent, setSent] = useState(false);
  

  const handleEmailVerify = () => {
    if (auth && auth.currentUser) {
      sendEmailVerification(auth.currentUser).then((x) => {
        setSent(true);
        console.log(x);
      });
    }
  };
  if(!auth){
    return null;
  }
  return (
    <>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </>
  );
};

export const Logout = () => {
  const isLoggedIn = !!auth?.currentUser?.uid;

  const handleLogout = async () => {
    await auth?.signOut();
  };

  if (isLoggedIn) {
    return (
      <>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  } else {
    return null;
  }
};
