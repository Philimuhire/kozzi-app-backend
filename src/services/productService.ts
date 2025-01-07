import {
  createProduct as createProductModel,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../models/productModel';
import { uploadImage } from '../utils/cloudinary';
import { Product } from '../models/productModel';

export const createProduct = async (
  name: string,
  description: string,
  price: number,  
  qty: number,    
  imagePath: string
): Promise<Product> => {
  const imageUrl = await uploadImage(imagePath);

  return createProductModel({
    name,
    description,
    price,  
    qty,   
    image_url: imageUrl
  });
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  return getAllProducts();
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  return getProductById(id);
};

export const updateProductDetails = async (
  id: string,
  updates: Partial<Omit<Product, 'id' | 'created_at'>>,
  imagePath?: string
): Promise<Product | null> => {
  try {
    if (imagePath) {
      updates.image_url = await uploadImage(imagePath);
    }

    if (updates.price !== undefined && typeof updates.price !== 'number') {
      updates.price = parseFloat(updates.price as any);
    }
    
    if (updates.qty !== undefined && typeof updates.qty !== 'number') {
      updates.qty = parseInt(updates.qty as any, 10);
    }

    const product = await updateProduct(id, updates);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error: any) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
};

export const removeProduct = async (id: string): Promise<void> => {
  await deleteProduct(id);
};
