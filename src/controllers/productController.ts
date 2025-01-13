import { Request, Response } from 'express';
import Product  from '../models/productModel';
import cloudinary from '../config/cloudinary'
import fs from 'fs';
import path from 'path';

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, quantity, status } = req.body;

    // Ensure the uploaded file's path is captured
    const imageUrl = req.file ? req.file.path : null;

    if (!imageUrl) {
      return res.status(400).json({
        message: 'Image is required to create a product.',
      });
    }

    // Save the product to the database
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      quantity,
      status: status || 'available',
      image_url: imageUrl, // Save the image URL in the database
    });

    res.status(201).json({
      message: 'Product created successfully!',
      product: newProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create product.',
      error: error.message,
    });
  }
};



const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to retrieve products.', error: error.message });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to retrieve product.', error: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, qty } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let imageUrl = product.image_url;
    if (req.file) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;

      // Remove the file from the temporary uploads folder
      fs.unlinkSync(req.file.path);
    }

    await product.update({
      name,
      description,
      price: price ? parseFloat(price) : product.price,
      category: category || product.category,
      qty: qty ? parseInt(qty) : product.quantity,
      imageUrl,
    });

    res.status(200).json({ message: 'Product updated successfully!', product });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update product.', error: error.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete product.', error: error.message });
  }
};

export default {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
