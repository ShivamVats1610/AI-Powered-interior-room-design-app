"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

// Create Context
export const UserDetailContext = createContext();

function Provider({ children }) {
  const { user, isLoaded } = useUser();
  const [userDetail, setUserDetail] = useState(null);

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

      // Store the verified user detail
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

export default Provider;
