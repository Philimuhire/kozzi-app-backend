import express from 'express';
import { upload } from '../middlewares/upload';
import {
  handleCreateProduct,
  handleFetchAllProducts,
  handleGetProductById,
  handleUpdateProduct,
  handleDeleteProduct,
} from '../controllers/productController';

const router = express.Router();


router.post('/createProduct', upload.single('image'), handleCreateProduct); 
router.get('/getAllProducts', handleFetchAllProducts); 
router.get('/getProductById/:id', handleGetProductById); 
router.put('/updateProduct/:id', upload.single('image'), handleUpdateProduct); 
router.delete('/deleteProduct/:id', handleDeleteProduct); 

export default router;
