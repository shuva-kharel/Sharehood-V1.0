import { Container, SimpleGrid, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/MyProductCard";

const YourProductsPage = () => {
    const { fetchMyProducts, myProducts, isLoading, error } = useProductStore(); // Assuming isLoading and error are part of the store

    useEffect(() => {
        fetchMyProducts();
    }, [fetchMyProducts]);

    // Handling loading and error states
    if (isLoading) {
        return (
            <Container maxW="container.xl" py={12}>
                <VStack spacing={8} justify="center" align="center">
                    <Spinner size="xl" />
                    <Text fontSize="xl" fontWeight="bold">
                        Loading your products...
                    </Text>
                </VStack>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxW="container.xl" py={12}>
                <VStack spacing={8} justify="center" align="center">
                    <Text fontSize="xl" fontWeight="bold" color="red.500">
                        There was an error fetching your products. Please try again later.
                    </Text>
                </VStack>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize="30"
                    fontWeight="bold"
                    bgGradient="linear(to-r, cyan.400, blue.500)"
                    bgClip="text"
                    textAlign="center"
                >
                    My Products
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w="full"
                >
                    {myProducts && myProducts.map((product) => (
                        <ProductCard key={product._id} product={product} fetchMyProducts={fetchMyProducts} />  // Passing fetchMyProducts
                    ))}
                </SimpleGrid>

                {myProducts && myProducts.length === 0 && (
                    <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                        You have not published any products yet 😢{" "}
                        <Link to="/create">
                            <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                                Create a product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default YourProductsPage;
