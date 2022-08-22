const { Product } = require("../models/product");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  // http://localhost:3000/api/v1/products?categories=6300d1162c69485bf1aa1782
  let filter = {};

  if (req.query.categories) {
    filter = { categories: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }

  res.send(productList);
});

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid Category");

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numberReviews: req.body.numberReviews,
    isFeatured: req.body.isFeatured,
  });

  // product
  //   .save()
  //   .then((createProduct) => {
  //     res.status(201).json(createProduct);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       error: err,
  //       success: false,
  //     });
  //   });

  product = await product.save();

  if (!product) return res.status(500).send("the product cannot be created!");

  res.send(product);
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the product not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numberReviews: req.body.numberReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) return res.status(401).send("the product cannot be update!");

  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({
      success: false,
      message: "The product with the given ID was not found!",
    });
  }

  res.status(200).send(product);
});

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false });
  }

  res.send({ productCount: productCount });
});

router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const productsFeatured = await Product.find({ isFeatured: true }).limit(
    +count
  );

  if (!productsFeatured) {
    res.status(500).json({ success: false });
  }

  res.send(productsFeatured);
});

module.exports = router;
