"use client";

import React from "react";
import UserDetailProvider from "./_context/UserDetailContext"; // adjust path if needed

function Provider({ children }) {
  return (
    <UserDetailProvider>
      {children}
    </UserDetailProvider>
  );
}

export default Provider;
