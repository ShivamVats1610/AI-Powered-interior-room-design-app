"use client";

import React from "react";
import UserDetailProvider from "./context/UserDetailContext"; // adjust path if needed

function Provider({ children }) {
  return (
    <UserDetailProvider>
      {children}
    </UserDetailProvider>
  );
}

export default Provider;
