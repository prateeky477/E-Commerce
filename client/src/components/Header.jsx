import { AiOutlineSearch } from "react-icons/ai"
import React, { useContext, useState } from 'react'
import { BiShoppingBag } from "react-icons/bi"
import { GrFavorite } from "react-icons/gr"
import { Box, Flex, Input, IconButton, Spacer, Text, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/LoggedIn"
const Header = () => {
  const auth = useContext(AuthContext)

  const [newSearch, setNewSearch] = useState('')
  const handeKeyDown = async (e) => {
    // console.log(search)
    console.log(typeof (item))
    console.log(auth.searchP)
    // auth.setSearchP(newSearch)
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/products/s", {
        "model": newSearch
      }, {
        withCredentials: true
      }
      );
      console.log(response.data.products);
      auth.setSearchP(response.data.products)

    } catch (err) {

    }
  }
  return (
    <Box as="header" px={[4, 8]} py={5} bg="white">
      <Flex alignItems="center">
        <Flex flex={1} justifyContent="center" >
          <img
            src="https://www.bing.com/th?id=OIP.Eow3_Gl9FZNS8zhNN9tcKwHaFS&w=295&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            alt=""
            height={60}
            width={70}
          />
        </Flex>
        <Flex flex={1} justifyContent="center" gap={10}>
          <Text as={Link} to='/' cursor="pointer" _hover={{ color: "slateblue" }}>
            Products
          </Text>
          {
            auth.isLoggedIn ? <Text as={Link} to='/userinfo' cursor="pointer" _hover={{ color: "slateblue" }}>
              Userinfo
            </Text> : ""
          }

        </Flex>
        <Flex flex={1} justifyContent="center" gap={10}>
          <Box bg="gray.200" borderRadius="xl" p={1} pl={2} pr={4} display="flex" alignItems="center">
            <Input
              onChange={(event) => setNewSearch(event.target.value)}
              variant="unstyled"
              flex={1}
              ml={2}
              placeholder="Search"

              _focus={{ outline: "none" }}
            />

          </Box>
          <Button onClick={handeKeyDown}><AiOutlineSearch /></Button>
          <Flex justifyContent="center" gap={5}>
            <IconButton
              as={Link} to='/cart'
              aria-label="Shopping Bag"
              icon={<BiShoppingBag />}
              bg="transparent"
              _hover={{ bg: "gray.300", borderRadius: "full" }}
              rounded="full"
            />
            <IconButton
              as={Link} to='/fav'
              aria-label="Favorite"
              icon={<GrFavorite />}
              bg="transparent"
              _hover={{ bg: "gray.300", borderRadius: "full" }}
              rounded="full"
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
