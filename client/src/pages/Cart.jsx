import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import {
  Container,
  Flex,
  VStack,
  Text,
  Divider,
  Button,
  Box,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../context/LoggedIn";

const Cart = () => {
  const { products } = useContext(ProductContext);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [cartProduct, setCartProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const auth = useContext(AuthContext);

  useEffect(() => {
    // Check if user data exists in auth
    if (auth && auth.userData) {
      // Access the cart from userData
      const userCart = auth?.userData?.data?.cart;
      setCart(userCart);
    } else {
      setError("User data not found.");
    }
  }, [auth]);

  useEffect(() => {
    let tempCartProduct = [];
    cart?.forEach((prod) => {
      // Find the product that matches the cart item by _id
      const product = products.find((p) => p._id === prod.pid);
      if (product) {
        tempCartProduct.push(product);
      }
    });
    setCartProduct(tempCartProduct);
  }, [cart, products]);

  useEffect(() => {
    let totalPrice = 0;
    cartProduct?.forEach((prod) => {
      totalPrice += prod.price;
    });
    setTotalPrice(totalPrice);
  }, [cartProduct]);

  return (
    <Container maxW="container.lg" mt={2}>
      <Flex direction={{ base: "column", sm: "row" }} justify="space-between">
        <VStack spacing={2} align="center">
          <Text fontSize="2xl">Cart</Text>
          {cart?.map((prod, index) => (
            <Box
              key={index}
              p={4}
              bg="white"
              shadow="md"
              borderRadius="md"
            >
              <Image src={cartProduct[index]?.img} h='300px' w='300px'></Image>
              <Text>Product ID: {prod.pid}</Text>
              <Text>Product Size: {prod.psize}</Text>
              <Text>Product Name: {cartProduct[index]?.model}</Text>
              <Text>Product Price: {cartProduct[index]?.price}</Text>
            </Box>
          ))}
        </VStack>

        <VStack spacing={5} align={{ base: "center", sm: "flex-start" }}>
          <Text fontSize="2xl">Summary</Text>
          <Text> Subtotal : $. {totalPrice}</Text>
          <Text>Estimated Delivery & Handling : $ {totalPrice * 0.15}</Text>
          <Divider />
          <Flex justify="space-between" w="100%">
            <Text fontWeight="semibold">
              Total <span>$. {totalPrice + totalPrice * 0.15}</span>
            </Text>
          </Flex>
          <Divider />
          <Flex direction={{ base: "column", sm: "row" }} gap={2}>
            <Button
              variant="solid"
              colorScheme="gray"
              size={{ base: "sm", sm: "md" }}
              disabled
            // onClick={alert(`order placed with address:${auth?.userData?.address}`)}
            >
              CheckOut
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Cart;
