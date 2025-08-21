import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg">
        <Image
          src="/loading.gif"
          alt="Loading..."
          width={80}
          height={80}
          className="animate-pulse"
        />
        <h2 className="mt-4 text-lg font-semibold text-gray-800 text-center">
          Redesigning your Room...
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Please wait, do not refresh.
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
