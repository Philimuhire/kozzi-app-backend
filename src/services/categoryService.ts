import Category from '../models/categoryModel';

class CategoryService {
  async createCategory(name: string, description?: string) {
    return await Category.create({ name, description });
  }

  async getAllCategories() {
    return await Category.findAll();
  }

  async getCategoryById(id: string) {
    return await Category.findByPk(id);
  }

  async updateCategory(id: string, updates: Partial<{ name: string; description: string }>) {
    const category = await Category.findByPk(id);
    if (!category) throw new Error('Category not found');
    return await category.update(updates);
  }

  async deleteCategory(id: string) {
    const category = await Category.findByPk(id);
    if (!category) throw new Error('Category not found');
    await category.destroy();
    return { message: 'Category deleted successfully' };
  }
}

export default new CategoryService();
