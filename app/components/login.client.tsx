import { useEffect, useState } from "react";
import { Auth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
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
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!auth.currentUser?.uid;
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const initText = isLoggedIn ? "Logout" : "Login";
  const emailVerified = auth.currentUser?.emailVerified;
  const [btnText, setBtnText] = useState(initText);
  const [fireUI, setUI] = useState(null);
  const handleBtnClick = async () => {
    if (isLoggedIn) {
      await auth.signOut();
      setBtnText("Login");
    } else {
      setOpen(true);
    }
  };

  const handleEmailVerify = () => {
    if (auth && auth.currentUser) {
      sendEmailVerification(auth.currentUser).then((x) => {
        setSent(true);
        console.log(x);
      });
    }
  };

  return (
    <>
      <button onClick={handleBtnClick}>Login/Signup</button>
      <dialog open={open} className="relative">
        <span className="absolute object-right-top" onClick={() => setOpen(false)}>X</span>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </dialog>
    </>
  );
};