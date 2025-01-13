import cloudinary from '../config/cloudinary';

export const uploadImage = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'products', 
    });
    return result.secure_url; 
  } catch (error: any) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

