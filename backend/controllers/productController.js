import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"
import mongoose from "mongoose"

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, quantity, brand } = req.fields

    // Validation
    switch(true) {
        case !name: 
        return res.json({ error: 'Nom requise' })
        case !price: 
        return res.json({ error: 'Prix requise' })
        case !description: 
        return res.json({ error: 'Description requise' })
        case !category: 
        return res.json({ error: 'Categorie requise' })
        case !quantity: 
        return res.json({ error: 'Quantité requise' })
        case !brand: 
        return res.json({ error: 'Marque requise' })
    }

    const product = new Product({ ...req.fields })
    await product.save()
    res.json(product)
    console.log(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message)
  }
})

const updateProduct = asyncHandler(async (req, res)=> {
    const { name, price, description, category, quantity, brand } = req.fields
      try {
          // Validation
          switch(true) {
            case !name: 
            return res.json({ error: 'Nom requise' })
            case !price: 
            return res.json({ error: 'Prix requise' })
            case !description: 
            return res.json({ error: 'Description requise' })
            case !category: 
            return res.json({ error: 'Categorie requise' })
            case !quantity: 
            return res.json({ error: 'Quantité requise' })
            case !brand: 
            return res.json({ error: 'Marque requise' })
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {...req.fields},
            {new: true}
        )
        await product.save()
        res.json(product)
      } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
      }
})

const removeProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.json(product)
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
})

const fetchProduct = asyncHandler(async (req, res) => {
     try {
        const pageSize = 6

        const keyword = req.query.keyword 
          ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            },
          }
          : {}
     const count = await Product.countDocuments({ ...keyword })
     const products = await Product.find({ ...keyword }).limit(pageSize)

     res.json({
        products,
        page: 1,
        pages: Math.ceil(count / pageSize),
        hasMore: false
     })
     } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server Error"})
     }
})

const fetchProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    try {
        const product = await Product.findById(productId);
        if (product) {
            return res.json(product);
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: 'Product not found' });
    }
});


const fetchAllProduct = asyncHandler(async (req, res) => {
    try {
       const products = await Product.find({}) 
       .populate('category')
       .limit(12)
       .sort({createdAt: -1})
       res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server Error"})
    }
})

const addProductReviews = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    
    if(product){
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = 
        product.reviews.reduce((acc, item) =>item.rating + acc, 0) /
        product.reviews.length
        await product.save()
        res.status(201).json({message: 'Review added'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
})

const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
       const products = await Product.find({}).sort({ rating: -1 }).limit(4)
       res.json(products) 
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 }).limit(5)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})

const filterProducts = asyncHandler(async (req, res) => {
   try {
    const  { checked, radio} = req.body
    let args = {}
    if(checked.length > 0) args.category = checked
    if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]}
    const products = await Product.find(args)
    res.json(products)
   } catch (error) {
    console.error(error);
    res.status(500).json({error: "Server Error"})
   }
})

export {
    addProduct,
    updateProduct,
    removeProduct,
    fetchProduct,
    fetchProductById,
    fetchAllProduct,
    addProductReviews,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
}