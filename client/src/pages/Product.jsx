import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Box, Button, Flex, Heading, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/LoggedIn';
const Product = () => {
  const [productId, setProductID] = useState('');
  const [size, setSize] = useState('');
  const { products } = useContext(ProductContext);
  const [error, setError] = useState('');




  const auth = useContext(AuthContext)
  console.log(auth.searchP[0])
  useEffect(() => {
    const reload = async () => {
      auth.setSearchP([])
    };
    reload();
  }, []);


  return (
    <>
      <div className=''>
        {
          auth?.searchP.length == 0 && <Flex flexWrap="wrap" justifyContent="center" alignItems="center" >
            {products.map((product) => (
              <Link to={`/singleproduct/${product._id}`} key={product._id} color='blue'>
                <Box
                  key={product._id}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  m={4}
                >
                  <Box className=' p-10 transition ease-in-out delay-50  hover:scale-110 duration-500 '>
                    <Box d="flex" alignItems="baseline" className=''>
                      <Image src={product.img} alt='Dan Abramov' h='300px' w='300px' className='rounded-md' />
                      <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                        {product.brand} {product.model}
                      </Text>
                      <Text
                        ml={2}
                        fontSize="sm"
                        color="gray.500"
                        fontWeight="semibold"
                      >
                        ({product.options.join(', ')})
                      </Text>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {product.description}
                    </Box>

                    <Box d="flex" mt="2" alignItems="center">
                      <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {product.size.join(', ')}
                      </Box>
                    </Box>

                    <Box d="flex" mt="2" alignItems="center">
                      <Box as="span" color="gray.600" fontSize="sm">
                        {product.reviews.length} reviews
                      </Box>
                    </Box>

                    <Box d="flex" mt="2" alignItems="center">
                      <Heading as="h4" size="md">
                        {product.discount
                          ? `$${(
                            (product.price * (100 - product.discount)) /
                            100
                          ).toFixed(2)}`
                          : `$${product.price}`}
                      </Heading>
                    </Box>

                    <Box d="flex" mt="2" alignItems="center">
                    </Box>
                  </Box>
                </Box>
              </Link>
            ))}
          </Flex>
        }
      </div>
      <div className=''>
        {
          auth?.searchP.length != 0 && <Flex flexWrap="wrap" justifyContent="center" alignItems="center" >
            <Link to={`/singleproduct/${auth?.searchP[0]._id}`} key={auth?.searchP[0]._id} color='blue'>
              <Box
                key={auth?.searchP[0]._id}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m={4}
              >
                <Box className=' p-10 transition ease-in-out delay-50  hover:scale-110 duration-500 '>
                  <Box d="flex" alignItems="baseline" className=''>
                    <Image src={auth?.searchP[0].img} alt='Dan Abramov' h='300px' w='300px' className='rounded-md' />
                    <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                      {auth?.searchP[0].brand} {auth?.searchP[0].model}
                    </Text>
                    <Text
                      ml={2}
                      fontSize="sm"
                      color="gray.500"
                      fontWeight="semibold"
                    >
                      ({auth?.searchP[0].options.join(', ')})
                    </Text>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {auth?.searchP[0].description}
                  </Box>

                  <Box d="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {auth?.searchP[0].size.join(', ')}
                    </Box>
                  </Box>

                  <Box d="flex" mt="2" alignItems="center">
                    <Box as="span" color="gray.600" fontSize="sm">
                      {auth?.searchP[0].reviews.length} reviews
                    </Box>
                  </Box>

                  <Box d="flex" mt="2" alignItems="center">
                    <Heading as="h4" size="md">
                      {auth?.searchP[0].discount
                        ? `$${(
                          (auth?.searchP[0].price * (100 - auth?.searchP[0].discount)) /
                          100
                        ).toFixed(2)}`
                        : `$${auth?.searchP[0].price}`}
                    </Heading>
                  </Box>

                  <Box d="flex" mt="2" alignItems="center">
                  </Box>
                </Box>
              </Box>
            </Link>
          </Flex>
        }
      </div>
    </>)
}
export default Product;
