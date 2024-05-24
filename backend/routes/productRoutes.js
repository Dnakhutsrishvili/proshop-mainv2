import express from "express";
const router=express.Router();
import {
     createPRoducts, 
     getProductById,
     getPRoducts, 
     updatePruducts,
     deleteProduct,
     createProductReview,
     getTopProducts
} from "../controllers/productController.js";

import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getPRoducts);
router.route('/').post(protect,admin,createPRoducts);
router.route('/top').get(getTopProducts);

router.route('/:id').get(getProductById).put(protect,admin,updatePruducts).delete(protect,admin,deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);

export default router;