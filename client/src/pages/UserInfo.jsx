import React, { useContext, useState } from 'react'
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
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/LoggedIn';
const UserInfo = () => {


    const auth = useContext(AuthContext)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState()
    console.log(auth)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/userinfo', {
                name,
                phone,
                address,
                pincode,
            }, {
                withCredentials: true
            });

            console.log(response.data);
            alert('User info saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to save user info.');
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
                                value={auth.userData.data.name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Address</FormLabel>
                            <Input
                                type="text"
                                value={auth.userData.data.address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input
                                type="number"
                                value={auth.userData.data.phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>PinCode</FormLabel>
                            <Input
                                type="number"
                                value={auth.userData.data.pincode}
                                onChange={(event) => setPincode(event.target.value)}
                            />
                        </FormControl>
                        {typeof error === "string" && (
                            <Text color="red.500" fontWeight="semibold">
                                {error}
                            </Text>
                        )}
                        <Button type="submit"  >
                            Update Profile
                        </Button>
                    </Stack>
                </form>
                {/* <Link to='/login'>
                    <Text m={5}>Already registered??? Login</Text>
                </Link> */}
            </Box>
        </div>
    );
};

export default UserInfo;



