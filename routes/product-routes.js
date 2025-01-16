import { Router } from "express";
import Product from "../mongoose-model/product.js";
import sample_products from "../seed-data.js";


const router = Router();

//get stats of the products
router.get("/stats", async (req, res) => {
    try {

        //filter the products that are in stock and price is greater than 100
        const data = await Product.aggregate([
            {
                $match: {
                    inStock: true,
                    price: {
                        $gte: 100
                    }
                }
            }
        ]);

        res.status(200).json({
            isSuccess: true,
            message: "Success! Fetched products.",
            data
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            isSuccess: false,
            message: "An error occured! Please try again..."
        });
    }
});

//get the summary or analysis of the products in a certain catalog
router.get("/catalog-analysis", async (req, res) => {
    try {
        const data = await Product.aggregate([
            //get all the products in the given catalog
            {
                $match: {
                    category: "Electronics"
                },
            },

            //group the products together
            //calculate total-revenue, average-price, maximum and minimum price in that catalog
            //count the number of products in the catalog
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$price"
                    },
                    averagePrice: {
                        $avg: "$price"
                    },
                    maxProductPrice: {
                        $max: "$price"
                    },
                    minProductPrice: {
                        $min: "$price"
                    },
                    count: {
                        $sum: 1,
                    }
                }
            },

            //resets the documents by specifying which field to include
            //0 means exclude and 1 means include
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    averagePrice: 1,
                    maxProductPrice: 1,
                    minProductPrice: 1,
                    count: 1,
                    priceRange: {
                        $subtract: ["$maxProductPrice", "$minProductPrice"],
                    }

                }
            }
        ]);

        res.status(200).json({
            isSuccess: true,
            message: "Success! Fetched products.",
            data
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            isSuccess: false,
            message: "An error occured! Please try again..."
        });
    }
});


//seed the dB with sample products
router.post("/add-sample-product", async (req, res) => {
    try {
        const data = await Product.insertMany(sample_products);

        res.status(201).json({
            isSuccess: true,
            message: "Success! Product(s) added.",
            data
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            isSuccess: false,
            message: "An error occured! Please try again..."
        });

    }
});



export default router;