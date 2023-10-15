import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Select,
  Stack,
  Text,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [psize, setPSize] = useState("");
  const toast = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const imageWidth = useBreakpointValue({
    base: "100%",
    md: "50%",
    width: "100%",
  });

  // useEffect(() => {
  //   const getProduct = async () => {
  //     const product = products.find((item) => item._id === id);
  //     setProduct(product);
  //   };
  //   getProduct();
  // }, [id, products]);

  // useEffect(() => {
  //   const checkFavoriteStatus = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/fav`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setIsFavorite(response.data.isFavorite);
  //     } catch (err) {
  //       console.error("Error checking favorite status:", err);
  //       // You can display a user-friendly error message here
  //     }
  //   };
  
  //   checkFavoriteStatus();
  // }, [id]);
  

  const toggleFavorite = async () => {
    try {
      const endpoint = isFavorite ? "remove" : "add";
      await axios.post(
        `https://e-commerce-aaoa.vercel.app/api/fav/${endpoint}`,
        { productId: id },
        {
          withCredentials: true,
        }
      );
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async () => {
    if (!color || !psize) {
      toast({
        title: "Please select a color and size",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://e-commerce-aaoa.vercel.app/api/products",
        {
          productId: id,
          size: psize,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast({
        title: "Item added to cart",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      setError(err.response.data); // You should define 'setError' in your component
    }
  };

  return (
    <Box className="p-10 border-2 border-gray-400 mx-10 mb-5 rounded-md">
      <Flex
        flexWrap="wrap"
        flexDirection={{ base: "column", md: "row" }}
        className=""
      >
        <Box
          flex="1"
          className="bg-gray-100 p-2 max-w-full border-2 border-gray-400 rounded-md"
        >
          <Image
            src={product.img}
            width={imageWidth}
            alt={product.model}
            className="transition ease-in-out delay-50 hover:scale-110 duration-500"
          />
        </Box>
        <Box flex="1" className="p-2 border-2 border-gray-400 rounded-md">
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "3xl" }}
            mb={2}
            className="text-gray-600"
          >
            {product.brand} {product.model}
          </Heading>
          <Text
            fontSize={{ base: "md", md: "md" }}
            mb={6}
            className="px-2 text-gray-500"
          >
            {product.description}
          </Text>
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            mb={3}
            className="px-4 text-gray-400"
          >
            ${product.price}
          </Text>

          <Stack>
            <div className="pt-4">
              <div className="flex gap-2 pb-10">
                <FormControl>
                  <div>
                    <FormLabel className="px-4">Select Color</FormLabel>

                    <Select
                      placeholder="Select color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      {product.options &&
                        product.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                    </Select>
                  </div>
                </FormControl>
                <FormControl>
                  <div>
                    <FormLabel className="px-4">Select Size</FormLabel>
                    <Select
                      placeholder="Select size"
                      value={psize}
                      onChange={(e) => setPSize(e.target.value)}
                    >
                      {product.size &&
                        product.size.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                    </Select>
                  </div>
                </FormControl>
              </div>
              <div className="w-full flex justify-center border-green-900">
                <Button
                  colorScheme="green"
                  onClick={handleAddToCart}
                  className="p-2 shadow-xl"
                  style={{ width: "30%" }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="w-full flex justify-center mt-4">
              <Button
                colorScheme={isFavorite ? "red" : "gray"}
                onClick={toggleFavorite}
                className="p-2 shadow-xl"
                style={{ width: "30%" }}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleProduct;
