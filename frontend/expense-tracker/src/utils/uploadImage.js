import axiosInstance from "./axiosinstance";
import { API_PATHS } from "./apiPaths";

const uploadImageToCloudinary = async (imageFile) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary credentials not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env",
    );
  }

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();
  return {
    imageUrl: data.secure_url,
  };
};

const uploadImageToLocalBackend = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const uploadImage = async (imageFile) => {
  try {
    // Default mode: Cloudinary (recommended for Vercel/serverless deployments).
    return await uploadImageToCloudinary(imageFile);

    // Local mode (for local server/file-system projects):
    // return await uploadImageToLocalBackend(imageFile);
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error;
  }
};

export default uploadImage;