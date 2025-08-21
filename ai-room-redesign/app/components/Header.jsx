"use client";

import React, { useContext } from "react";
import { UserDetailContext } from "../context/UserDetailContext"; // adjust path
import Image from "next/image";
import { UserButton, useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Header() {
  const { userDetail } = useContext(UserDetailContext);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleDashboardClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in"); // go to login if not signed in
    } else {
      router.push("/dashboard"); // go to dashboard if signed in
    }
  };

  return (
    <header className="p-5 shadow-sm flex justify-between items-center">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" width={40} height={40} alt="Logo" />
        <h2 className="font-bold text-lg">AI Room Design</h2>
      </div>
<button className="rounded-full text-primary">Buy More Credits</button>

      {/* Right Side Buttons */}
      <div className="flex gap-6 items-center">
        {/* Profile/User button */}
        <UserButton afterSignOutUrl="/" />

        {/* Dashboard button */}
        <button
          onClick={handleDashboardClick}
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:opacity-90 transition"
        >
          Dashboard
        </button>
      </div>
    </header>
  );
}

export default Header;

