"use client";
import React, { useContext } from "react";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex gap-2 items-center">
  <Link href="/" className="flex gap-2 items-center">
    <Image src="/logo.svg" width={40} height={40} alt="Logo" />
    <h2 className="font-bold text-lg">AI Room Design</h2>
  </Link>
</div>

      <button variant="ghost" className="rounded-full text-primary">Buy More Credits</button>
      <div className="flex gap-10 items-center">
        <div className="flex gap-2 p-1 items-center bg-slate-200 px-3 rounded-full">
          <Image src="/star.png" width={20} height={20} alt="Star" />
          <h2 className="font-bold text-black">{userDetail?.credits}</h2>
        </div>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
