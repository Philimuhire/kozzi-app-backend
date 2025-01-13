import cloudinary from '../config/cloudinary';

export const uploadImage = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'products', // Optional: Organize uploads in a folder
    });
    return result.secure_url; // Return the uploaded image's URL
  } catch (error: any) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

