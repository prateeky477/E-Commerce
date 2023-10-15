const express = require('express');
const router = express.Router();

const {
  getFavoriteProducts,
  addFavoriteProduct,
  removeFavoriteProduct
} = require('../controllers/fav'); 

// router.route('/')
//   .get(getFavoriteProducts);

router.route('/add').post(addFavoriteProduct)

router.route('/remove')
  .post(removeFavoriteProduct);

module.exports = router;
