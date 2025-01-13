import express from 'express';
import multer from 'multer';
import ProductController from '../controllers/productController';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const asyncHandler = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/addProduct', upload.single('file'), asyncHandler(ProductController.addProduct));

router.get('/getAllProducts', asyncHandler(ProductController.getAllProducts));

router.get('/getProduct/:id', asyncHandler(ProductController.getProductById));

router.put('/updateProduct/:id', upload.single('file'), asyncHandler(ProductController.updateProduct));

router.delete('/deleteProduct/:id', asyncHandler(ProductController.deleteProduct));

export default router;
