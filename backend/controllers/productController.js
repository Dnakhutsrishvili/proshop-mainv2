import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc fetch all products
// @route GET/api/products
// @access Public
const getPRoducts=asyncHandler(async(req,res)=>{
    const pageSize=2;
    const page= Number(req.query.pageNumber)||1;

    const keyword =req.query.keyword?
    {name:{$regex:req.query.keyword,$options:'i'}}:{};
    const count=await Product.countDocuments({...keyword});

    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
    res.json({products,page,pages:Math.ceil(count/pageSize)})
});

// @desc fetch a product
// @route GET/api/products/:id
// @access Public
const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        return  res.json(product)
    }
  res.status(404)
  throw new Error('Product not found');
});

// @desc create product
// @route POST/api/products
// @access private/admin
const createPRoducts=asyncHandler(async(req,res)=>{
   const product= new Product({
    name:'sample name',
    price:0,
    user:req.user._id,
    image:'sample/sa,ple.jpg',
    brand:'sample brand',
    category:'sample category',
    countInStock:0,
    numReviews:0,
    description:'sample desctiprion'
   })

   const createdProduct=await product.save();
   res.status(201).json(createdProduct)
});

// @desc update products
// @route PUT/api/products/:id
// @access private
const updatePruducts=asyncHandler(async(req,res)=>{
    const {name,price,description,image,brand,category,countInStock}=req.body;
    const product=await Product.findById(req.body._id);
    if(product){
        product.name=name;
        product.price=price;
        product.description=description;
        product.image=image;
        product.brand=brand;
        product.category=category;
        product.countInStock=countInStock;

        const updatedProduct=await product.save();

        res.json(updatedProduct)
    }else{
        res.status(404);
        throw new Error('resourse not found');
    }

});


// @desc delete product
// @route DELETE/api/products/:id
// @access private
const deleteProduct=asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if (product) {
        await Product.deleteOne({_id:req.params.id});
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }

});

// @desc create new review
// @route POST/api/products/:id/reviews
// @access private
const createProductReview=asyncHandler(async(req,res)=>{
    const {rating,comment}=req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const allreadyReviewed=product.reviews.find(
            (review)=>review.user.toString()===req.user._id.toString()
        )
        if(allreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }
        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review);
        
        product.numReviews=product.reviews.length;

        product.rating=product.reviews.reduce((acc,review)=>acc+review.rating,0)/product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'review added' });
    } else {
        res.status(404);
        throw new Error('not found');
    }

});

// @desc getTopProducts
// @route GET/api/products/top
// @access Public
const getTopProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({}).sort({rating:-1}).limit(3);
if (!products || products.length === 0) {
    res.status(404);
    throw new Error('Resource not found');
}
  res.status(200).json(products);
});
export {
    getPRoducts,
    getProductById,
    createPRoducts,
    updatePruducts,
    deleteProduct,
    createProductReview,
    getTopProducts
}; 