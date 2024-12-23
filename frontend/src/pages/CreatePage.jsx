import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { useColorMode } from "@chakra-ui/react"; // Import useColorMode to manage theme toggle

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
        address: "",
        description: "",
    });
    const toast = useToast();

    const { createProduct } = useProductStore();

    // Validate inputs before submitting
    const handleAddProduct = async () => {
        const authUser = JSON.parse(localStorage.getItem("authUser")); // Get authUser from localStorage
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!authUser || !authUser._id || !token) {
            toast({
                title: "Error",
                description: "User information is missing. Please log in again.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        // Include userId in the newProduct object
        const newProductWithUserId = { ...newProduct, userId: authUser._id };

        if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.address) {
            toast({
                title: "Error",
                description: "Please fill in all required fields (Name, Price, Image, and Address).",
                status: "error",
                isClosable: true,
            });
            return;
        }

        if (newProduct.name.length > 30) {
            toast({
                title: "Error",
                description: "Product Name cannot exceed 30 characters.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        if (newProduct.price.length > 5) {
            toast({
                title: "Error",
                description: "Price cannot exceed 5 characters.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        if (newProduct.description.length > 50) {
            toast({
                title: "Error",
                description: "Description cannot exceed 50 characters.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        const { success, message } = await createProduct(newProductWithUserId, token);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
            setNewProduct({ name: "", price: "", image: "", address: "", description: "" });
        }
    };

    return (
        <Container maxW={"container.sm"} style={{ marginTop: 150 }}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} style={{ marginBottom: 20 }}>
                    Create New Product
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, name: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, price: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, image: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Address"
                            name="address"
                            value={newProduct.address}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, address: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Description"
                            name="description"
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, description: e.target.value })
                            }
                        />

                        <Button colorScheme="blue" onClick={handleAddProduct} w="full">
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
