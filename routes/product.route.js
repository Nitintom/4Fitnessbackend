import express from "express";
import {getAllProducts,
createProduct,
updateProduct,
deleteProduct,
uploadImportExcel} from '../controllers/product.controller.js';


const router = express.Router(); 

// Route to get all products
router.get('/allproducts', getAllProducts);

// Route to create a new product
router.post('/product', createProduct);

// Add more routes for updating and deleting products if needed
// Route to update a product by ID
router.put('/product/:id', updateProduct);

// Route to delete a product by ID
router.delete('/product/delete/:id', deleteProduct);

router.post("/upload-excel", uploadImportExcel);

export default router;