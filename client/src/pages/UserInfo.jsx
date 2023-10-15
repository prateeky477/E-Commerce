import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/LoggedIn';

const UserInfo = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [name, setName] = useState(auth.userData.data.name || '');
    const [phone, setPhone] = useState(auth.userData.data.phone || '');
    const [address, setAddress] = useState(auth.userData.data.address || '');
    const [pincode, setPincode] = useState(auth.userData.data.pincode || '');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://e-commerce-aaoa.vercel.app/api/userinfo', {
                name,
                phone,
                address,
                pincode,
            }, {
                withCredentials: true
            });

            console.log(response.data);
            alert('User info saved successfully!');
            navigate("/");
        } catch (error) {
            console.error(error);
            alert('Failed to save user info.');
            setError('Failed to save user info.');
        }
    };

    return (
        <div>
            <Box maxW="500px" mx="auto" mt="8" mb='8'>
                <Text fontSize="4xl" textAlign="center" mb="8">
                    User Info
                </Text>
                <form onSubmit={handleSubmit} >
                    <Stack spacing="4">
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Address</FormLabel>
                            <Input
                                type="text"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input
                                type="number"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>PinCode</FormLabel>
                            <Input
                                type="number"
                                value={pincode}
                                onChange={(event) => setPincode(event.target.value)}
                            />
                        </FormControl>
                        {error && (
                            <Text color="red.500" fontWeight="semibold">
                                {error}
                            </Text>
                        )}
                        <Button type="submit"  >
                            Update Profile
                        </Button>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};

export default UserInfo;
