import { Request, Response, NextFunction } from 'express';
import {
  createProduct,
  fetchAllProducts,
  fetchProductById as getProductByIdService,
  updateProductDetails as updateProductService,
  removeProduct as deleteProductService,
} from '../services/productService';
import { Product } from '../models/productModel';

export const handleCreateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, description, price, qty } = req.body;
  const file = req.file?.path; 

  try {
    if (!file) {
      res.status(400).json({ message: 'Image file is required' });
      return;
    }

    const priceNum = parseFloat(price);
    const qtyNum = parseInt(qty, 10);

    if (isNaN(priceNum) || priceNum <= 0) {
      res.status(400).json({ message: 'Price must be a positive number' });
      return;
    }

    if (isNaN(qtyNum) || qtyNum < 0) {
      res.status(400).json({ message: 'Quantity must be a non-negative number' });
      return;
    }

    const product = await createProduct(name, description, priceNum, qtyNum, file);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const handleFetchAllProducts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await fetchAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const handleGetProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await getProductByIdService(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { name, description, price, qty } = req.body;

  try {
    const priceNum = parseFloat(price);
    const qtyNum = parseInt(qty, 10);

    if (isNaN(priceNum) || priceNum <= 0) {
      res.status(400).json({ message: 'Price must be a positive number' });
      return;
    }

    if (isNaN(qtyNum) || qtyNum < 0) {
      res.status(400).json({ message: 'Quantity must be a non-negative number' });
      return;
    }

    const updates: Partial<Omit<Product, 'id' | 'created_at'>> = {
      name,
      description,
      price: priceNum, 
      qty: qtyNum,    
    };

    if (req.file?.path) {
      updates.image_url = req.file.path; 
    }

    const product = await updateProductService(id, updates);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteProductService(id);
    res.status(200).json({ message: 'Product deleted successfully' }); 
  } catch (error) {
    next(error);
  }
};
