import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/useProductStore";

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
        // Retrieve user information from localStorage
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        // Check if user information is missing
        if (!userId || !token) {
            toast({
                title: "Error",
                description: "User information is missing. Please log in again.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        // Prepare the new product data with userId
        const newProductWithUserId = { ...newProduct, userId };

        // Input validation checks
        if (!newProductWithUserId.name || !newProductWithUserId.price || !newProductWithUserId.image || !newProductWithUserId.address) {
            toast({
                title: "Error",
                description: "Please fill in all required fields (Name, Price, Image, and Address).",
                status: "error",
                isClosable: true,
            });
            return;
        }

        if (newProductWithUserId.name.length > 30) {
            toast({
                title: "Error",
                description: "Product Name cannot exceed 30 characters.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        if (newProductWithUserId.price.length > 5) {
            toast({
                title: "Error",
                description: "Price cannot exceed 5 characters.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        if (newProductWithUserId.description.length > 50) {
            toast({
                title: "Error",
                description: "Description cannot exceed 50 characters.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        // Send the product data to the backend
        const { success, message } = await createProduct(newProductWithUserId, token);

        // Show appropriate feedback
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

            // Reset product form after successful creation
            setNewProduct({ name: "", price: "", image: "", address: "", description: "" });
        }
    };

    return (
        <Container maxW="container.sm" mt={150}>
            <VStack spacing={8}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    Create New Product
                </Heading>

                <Box w="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded="lg" shadow="md">
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                        <Input
                            placeholder="Address"
                            name="address"
                            value={newProduct.address}
                            onChange={(e) => setNewProduct({ ...newProduct, address: e.target.value })}
                        />
                        <Input
                            placeholder="Description"
                            name="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
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
