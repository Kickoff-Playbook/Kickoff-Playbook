import { tryMultipleURLs } from "../utils/urlConfig";

// Upload an image and get back a URL
export const uploadImage = async (imageBase64, filename = "image.jpg") => {
  try {
    const response = await tryMultipleURLs("/upload/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageBase64,
        filename: filename,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.url; // Return the uploaded image URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Convert local image URI to base64
export const convertImageToBase64 = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove data:image/jpeg;base64, prefix
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
};
