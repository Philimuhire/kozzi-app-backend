import express from 'express';
import CategoryController from '../controllers/categoryController';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/addCategory', asyncHandler(CategoryController.createCategory));

router.get('/getAllCategories', asyncHandler(CategoryController.getAllCategories));

router.get('/getCategory/:id', asyncHandler(CategoryController.getCategoryById));

router.put('/updateCategory/:id', asyncHandler(CategoryController.updateCategory));

router.delete('/deleteCategory/:id', asyncHandler(CategoryController.deleteCategory));

export default router;
