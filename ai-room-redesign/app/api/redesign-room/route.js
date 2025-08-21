import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Replicate from "replicate";
import axios from "axios";

// 🔐 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔐 Configure Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { imageUrl, roomType, designType, additionalReq } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "imageUrl is required" },
        { status: 400 }
      );
    }

    // 🧠 Create a descriptive prompt
    const prompt = `A ${roomType || "room"} designed in ${designType || "modern"} style. ${additionalReq || ""}`;
    console.log("🟡 Prompt:", prompt);

    // 🎨 Call Replicate model
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      {
        input: {
          image: imageUrl,
          prompt,
        },
      }
    );

    if (!output || (Array.isArray(output) && output.length === 0)) {
      throw new Error("Replicate returned no output");
    }

    // 📸 Extract image URL
    const redesignedImageUrl = Array.isArray(output) ? output[0] : output;
    console.log("✅ Replicate output image:", redesignedImageUrl);

    let uploadResult;

    // If Replicate already returns a hosted image URL, upload it to Cloudinary
    if (redesignedImageUrl.startsWith("http")) {
      const base64Image = await convertImageToBase64(redesignedImageUrl);
      uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: "room-redesign",
        public_id: `redesign_${Date.now()}`,
        overwrite: true,
      });
    } else {
      // If Replicate returns a base64/data URI directly
      uploadResult = await cloudinary.uploader.upload(redesignedImageUrl, {
        folder: "room-redesign",
        public_id: `redesign_${Date.now()}`,
        overwrite: true,
      });
    }

    console.log("✅ Uploaded redesigned image to Cloudinary:", uploadResult.secure_url);

    return NextResponse.json({
      success: true,
      redesignedImage: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("❌ API error in /api/redesign-room:", error.response?.data || error.message || error);

    // If Replicate rejects due to no credits
    if (error.response?.status === 402) {
      return NextResponse.json(
        { error: "You have insufficient Replicate credits. Please top up your account." },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// 🧰 Helper function: convert image URL → Base64
async function convertImageToBase64(imageUrl) {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const contentType = response.headers["content-type"] || "image/png";
  const base64 = Buffer.from(response.data).toString("base64");
  return `data:${contentType};base64,${base64}`;
}
