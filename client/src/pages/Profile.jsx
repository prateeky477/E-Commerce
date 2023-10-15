import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/LoggedIn';
import {
  Box,
  Text,
  Button,
  VStack,
  Avatar,
  Flex,
  Badge,
  useColorModeValue,
  IconButton,
  Spacer,
  ScaleFade,
} from '@chakra-ui/react';
import { EditIcon, StarIcon, AddIcon, CheckCircleIcon } from '@chakra-ui/icons';

const Profile = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const userData = auth.userData.data;
  const [showDetails, setShowDetails] = useState(false);

  const handleEdit = () => {
    // Handle edit functionality here
  };

  const handleFavorite = () => {
    // Handle favorite (fav) functionality here
  };

  const handleAddToCart = () => {
    // Handle adding to cart (cart) functionality here
  };

  const handleMarkAsPurchased = () => {
    // Handle marking as purchased functionality here
  };

  return (
    <Box
      p="4"
      shadow="lg"
      borderWidth="1px"
      borderRadius="md"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Flex align="center" justify="space-between">
        <Avatar
          size="xl"
          name={userData.name}
          src="https://via.placeholder.com/150" // You can replace this with the user's profile picture URL
        />
        <Badge variant="outline" colorScheme="teal">
          {userData.credits} Credits
        </Badge>
      </Flex>
      <VStack spacing="4" mt="4">
        <Text fontSize="lg" fontWeight="bold">
          {userData.name}
        </Text>
        <Text fontSize="md">
          @{userData.username} | Phone: {userData.phone} | Pincode: {userData.pincode}
        </Text>
        <Text fontSize="md">Address: {userData.address}</Text>
      </VStack>
      <Button
        colorScheme="teal"
        mt="4"
        onClick={() => setShowDetails(!showDetails)}
      >
        View Details (Toggle Animation)
      </Button>

      {/* Add/Edit Button */}
      <Flex mt="4" align="center">
        <IconButton
          icon={<EditIcon />}
          colorScheme="teal"
          onClick={handleEdit}
          mr="2"
        />
        <Spacer />
        <IconButton
          icon={<StarIcon />}
          colorScheme="teal"
          onClick={handleFavorite}
          mr="2"
        />
        <IconButton
          icon={<AddIcon />}
          colorScheme="teal"
          onClick={handleAddToCart}
          mr="2"
        />
        <IconButton
          icon={<CheckCircleIcon />}
          colorScheme="teal"
          onClick={handleMarkAsPurchased}
        />
      </Flex>

      {/* Animated Details */}
      <ScaleFade in={showDetails} unmountOnExit>
        <Box mt="4">
          {/* Add your additional details here */}
          <Text>Additional Details</Text>
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default Profile;
