import { Request, Response } from 'express';
import Category from '../models/categoryModel'; // Replace with your actual model path

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const newCategory = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      message: 'Category created successfully!',
      category: newCategory,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create category.',
      error: error.message,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to retrieve categories.',
      error: error.message,
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to retrieve category.',
      error: error.message,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    await category.update(updates);

    res.status(200).json({
      message: 'Category updated successfully!',
      category,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to update category.',
      error: error.message,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    await category.destroy();

    res.status(200).json({
      message: 'Category deleted successfully!',
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to delete category.',
      error: error.message,
    });
  }
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
