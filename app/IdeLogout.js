"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const IdleLogout = ({ timeout = 15 * 60 * 1000 }) => {
  const { data: session } = useSession();
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), timeout);
    };

    const handleActivity = () => {
      resetTimer();
      setIsIdle(false);
    };

    // Set up event listeners to detect user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);

    // Start the idle timer
    resetTimer();

    // When user becomes idle, log them out
    if (isIdle && session) {
      signOut({ callbackUrl: "/login", redirect: true });
    }

    // Cleanup event listeners and timer
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [isIdle, session, timeout]);

  return null;
};

export default IdleLogout;
