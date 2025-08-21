"use client";
import React from "react";
import Header from "./components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleDashboardClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in"); // go to login if not signed in
    } else {
      router.push("/dashboard"); // go to dashboard if signed in
    }
  };

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          AI Room and Home <br />
          <span className="text-blue-600">Interior Design</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Transform Your Space with AI: Effortless Room & Home Interior Design at
          Your Fingertips!
        </p>
        <div className="mt-6">
          <button
            onClick={handleDashboardClick}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Get started →
          </button>
        </div>
      </section>

      {/* Showcase Image */}
      <section className="py-16 flex justify-center px-6">
        <Image
          src="/group.png" // put your combined image in /public folder
          width={1000}
          height={500}
          alt="Room transformation with AI"
          className="rounded-lg"
        />
      </section>
    </div>
  );
}
