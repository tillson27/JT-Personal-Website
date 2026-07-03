import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PasswordGate from "@/components/casper/PasswordGate";
import { isAuthenticated as checkAuth, persistAuth } from "@/components/casper/auth";

const Casper = () => {
  const [authed, setAuthed] = useState<boolean>(() => checkAuth());

  useEffect(() => {
    document.title = "Josh Tillson – Casper PM Challenge";
    const prevBg = document.body.style.background;
    document.body.style.background = "#05030b";
    return () => {
      document.body.style.background = prevBg;
    };
  }, []);

  const handleAuthenticated = useCallback(() => {
    persistAuth();
    setAuthed(true);
  }, []);

  if (!authed) {
    return <PasswordGate onAuthenticated={handleAuthenticated} />;
  }

  return <Outlet />;
};

export default Casper;
