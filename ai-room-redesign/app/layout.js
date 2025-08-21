// app/layout.jsx
import { ClerkProvider } from "@clerk/nextjs";
import { UserDetailProvider } from "./context/UserDetailContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Room Redesign",
  description: "AI-Powered Interior Room Design App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <UserDetailProvider>{children}</UserDetailProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
