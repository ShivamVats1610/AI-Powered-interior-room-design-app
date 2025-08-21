// app/context/UserDetailContext.jsx
"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

// Named export for context
export const UserDetailContext = createContext({
  userDetail: { credits: 0 },
  setUserDetail: () => {},
});

// Named export for provider
export function UserDetailProvider({ children }) {
  const { user, isLoaded } = useUser();
  const [userDetail, setUserDetail] = useState({ credits: 0 });

  useEffect(() => {
    if (isLoaded && user) {
      verifyUser();
    }
  }, [isLoaded, user]);

  const verifyUser = async () => {
    try {
      const res = await axios.post("/api/verify-user", {
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        imgUrl: user.imageUrl,
      });
      setUserDetail(res.data.result);
    } catch (error) {
      console.error("Verify user failed:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}
