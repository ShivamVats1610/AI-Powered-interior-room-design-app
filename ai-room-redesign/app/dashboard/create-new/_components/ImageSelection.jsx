"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function ImageSelection({ selectedImage }) {   // ✅ FIXED

  const [file, setFile] = useState(null);

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);

    // Only call if parent actually passed a function
    if (typeof selectedImage === "function") {
      selectedImage(selectedFile);
    }
  };

  return (
    <div>
      <label>Select Image of your room</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`border rounded-xl border-dotted flex justify-center items-center border-primary bg-slate-200 cursor-pointer hover:shadow-lg 
          ${file ? "p-0 bg-white" : "p-20"} w-[300px] h-[300px] `}
          >
            {!file ? (
              <Image
                src={"/imageupload.jpg"}
                width={70}
                height={70}
                alt="Upload placeholder"
              />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                alt="Selected image"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>

  )
}

export default ImageSelection
