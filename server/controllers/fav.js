const User = require("../models/user");
const Product = require("../models/product");

// const getFavoriteProducts = async (req, res) => {
//   try {
//     // Retrieve the current user's favorite products
//     const user = await User.findById(req.user._id);
//     // console.log(user)
//     const favoriteProducts = user.favoriteProducts;
//     // console.log(favoriteProducts)

//     // If there are no favorite products, return a message
//     if (favoriteProducts?.length === 0) {
//       return res.status(200).json({ message: 'You have no favorite products' });
//     }

//     // Otherwise, return the favorite products
//     return res.status(200).json({ favoriteProducts });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }

// };

const addFavoriteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    // console.log(productId,typeof(productId))
    
    // Find the product by ID
    const pro={
      _id:productId
    }
    const product = await Product.findOne(pro);
    // console.log("zxcvbn")
    console.log(req.user._id)
    // console.log(product)

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Retrieve the current user
    const user = await User.findById(req.user._id);
    console.log("vbnm",user)

    // // Check if the product is already in the user's favorites
    // if (user.favorites.find(productId)) {
    //   return res.status(400).json({ message: 'Product is already in favorites' });
    // }

    // Add the product to the user's favorites
    user.favorites.push(productId);
    console.log("1 HII ")
    await user.save();
    console.log("2")
    return res.status(200).json({ message: 'Product added to favorites' });
   
  } catch (err) {
    // console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const removeFavoriteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // Retrieve the current user
    const user = await User.findById(req.user._id);

    // Check if the product is in the user's favorites
    if (!user.favorites.findOne(productId)) {
      return res.status(400).json({ message: 'Product is not in favorites' });
    }

    // Remove the product from the user's favorites
    
    user.favorites = user.favorites.filter(id => id !== productId);
    await user.save();

    return res.status(200).json({ message: 'Product removed from favorites' });
  } catch (err) {
    // console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  // getFavoriteProducts,
  addFavoriteProduct,
  removeFavoriteProduct,
};
