"use client";

import React, { useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";

function CreateNew() {
  const [formData, setFormData] = useState({
    image: null, // File object
    roomType: "",
    designType: "",
    additionalReq: "",
  });

  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // ✅ Upload raw image to Cloudinary
  const SaveRawImageToCloudinary = async () => {
    if (!formData.image) return null;

    try {
      console.log("🔹 Requesting signature from backend...");
      const { data: signatureData } = await axios.post("/api/sign-cloudinary", {
        folder: "room-redesign",
      });

      if (!signatureData) throw new Error("No signature returned");

      const { timestamp, signature, apiKey, cloudName, folder } = signatureData;

      const uploadData = new FormData();
      uploadData.append("file", formData.image);
      uploadData.append("api_key", apiKey);
      uploadData.append("timestamp", timestamp);
      uploadData.append("signature", signature);
      uploadData.append("folder", folder);

      console.log("🔹 Uploading image to Cloudinary...");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: uploadData }
      );

      const file = await res.json();
      console.log("🔹 Cloudinary response:", file);

      if (file?.secure_url) return file.secure_url;

      throw new Error("Cloudinary upload failed");
    } catch (err) {
      console.error("❌ Error uploading to Cloudinary:", err);
      return null;
    }
  };

  // ✅ Generate AI Image
  const GenerateAiImage = async () => {
    if (!formData.image) {
      alert("Please select an image first.");
      return;
    }

    try {
      setLoading(true);
      setGeneratedImage(null);

      // 1️⃣ Upload original image → get Cloudinary URL
      const rawImageUrl = await SaveRawImageToCloudinary();
      if (!rawImageUrl) {
        alert("❌ Image upload failed. Please try again.");
        return;
      }
      console.log("🔹 Raw image uploaded:", rawImageUrl);

      // 2️⃣ Call backend AI generation route
      console.log("🔹 Requesting AI image generation...");
      const { data } = await axios.post("/api/redesign-room", {
        imageUrl: rawImageUrl,
        roomType: formData.roomType,
        designType: formData.designType,
        additionalReq: formData.additionalReq,
      });

      console.log("🔹 AI generation response:", data);

      if (data?.redesignedImage) {
        setGeneratedImage(data.redesignedImage);
      } else {
        alert("❌ AI image generation failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error generating AI image:", error);

      if (error.response?.status === 402) {
        alert("⚠️ You don’t have enough Replicate credits. Please upgrade your plan.");
      } else {
        alert("❌ Something went wrong while generating your design. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {/* Image selection */}
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />

        {/* Form inputs */}
        <div>
          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
          />

          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />

          <AdditionalReq
            additionalRequirementInput={(value) =>
              onHandleInputChange(value, "additionalReq")
            }
          />

          <Button
            className="w-full mt-5"
            onClick={GenerateAiImage}
            disabled={loading}
          >
            {loading ? "✨ Generating your design..." : "Generate"}
          </Button>

          <p className="text-sm text-gray-400 mb-10">
            Note: 1 Credit will be used to redesign your room
          </p>
        </div>
      </div>

      {/* Display generated image */}
      {generatedImage && (
        <div className="mt-10 text-center">
          <h3 className="font-bold text-xl mb-4">✨ Your AI-Generated Design</h3>
          <img
            src={generatedImage}
            alt="AI Generated Room"
            className="mx-auto rounded-lg shadow-lg max-w-xl"
          />
        </div>
      )}

      {/* ✅ Loader based on state */}
      <CustomLoading loading={loading} />
    </div>
  );
}

export default CreateNew;
