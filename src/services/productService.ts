import Product from '../models/productModel';
import cloudinary from '../config/cloudinary'
import fs from 'fs';

class ProductService {
  // Create a product
  static async createProduct(data: any, filePath?: string) {
    let image_url = null;

    if (filePath) {
      const uploadResult = await cloudinary.uploader.upload(filePath, { folder: 'products' });
      fs.unlinkSync(filePath); // Clean up temporary file
      image_url = uploadResult.secure_url;
    }

    const product = await Product.create({
      ...data,
      image_url,
    });

    return product;
  }

  // Get all products
  static async getAllProducts() {
    const products = await Product.findAll();
    return products;
  }

  // Get product by ID
  static async getProductById(id: string) {
    const product = await Product.findByPk(id);
    return product;
  }

  // Update a product
  static async updateProduct(id: string, data: any, filePath?: string) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }

    let image_url = product.image_url;

    if (filePath) {
      const uploadResult = await cloudinary.uploader.upload(filePath, { folder: 'products' });
      fs.unlinkSync(filePath); // Clean up temporary file
      image_url = uploadResult.secure_url;
    }

    await product.update({
      ...data,
      image_url,
    });

    return product;
  }

  // Delete a product
  static async deleteProduct(id: string) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }

    await product.destroy();
    return true;
  }
}

export default ProductService;
