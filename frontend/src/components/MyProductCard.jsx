import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useProductStore } from "../store/useProductStore";
import { useState } from "react";

const MyProductCard = ({ product, fetchMyProducts }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const [isError, setIsError] = useState(false);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			fetchMyProducts();  // Re-fetch the products after deletion
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		// Check for required fields
		const { name, price, image, address, description } = updatedProduct;
		if (!name || !price || !image || !address) {
			setIsError(true);
			return;
		}
		setIsError(false);

		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			fetchMyProducts();  // Re-fetch the products after update
		}
	};

	return (
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

			<Box p={4}>
				<Heading as="h3" size="md" mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
					{/* Show price */}
					Rs.{product.price}
		
					{/* Conditionally show address */}
					{product.address && (
						<>
							<br />
							{product.address}
						</>
					)}
	
					{/* Conditionally show description */}
					{product.description && (
						<>
							<br />
							{product.description}
						</>
					)}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteProduct(product._id)}
						colorScheme="red"
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<FormControl isRequired isInvalid={isError}>
								<FormLabel>Product Name</FormLabel>
								<Input
									placeholder="Product Name"
									name="name"
									value={updatedProduct.name}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
								/>
								<FormErrorMessage>Product Name is required</FormErrorMessage>
							</FormControl>

							<FormControl isRequired isInvalid={isError}>
								<FormLabel>Price</FormLabel>
								<Input
									placeholder="Price"
									name="price"
									type="number"
									value={updatedProduct.price}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
								/>
								<FormErrorMessage>Price is required</FormErrorMessage>
							</FormControl>

							<FormControl isRequired isInvalid={isError}>
								<FormLabel>Image URL</FormLabel>
								<Input
									placeholder="Image URL"
									name="image"
									value={updatedProduct.image}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
								/>
								<FormErrorMessage>Image URL is required</FormErrorMessage>
							</FormControl>

							<FormControl isRequired isInvalid={isError}>
								<FormLabel>Address</FormLabel>
								<Input
									placeholder="Address"
									name="address"
									value={updatedProduct.address}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, address: e.target.value })}
								/>
								<FormErrorMessage>Address is required</FormErrorMessage>
							</FormControl>

							<FormControl>
								<FormLabel>Description</FormLabel>
								<Input
									placeholder="Description"
									name="description"
									value={updatedProduct.description}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
								/>
							</FormControl>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default MyProductCard;
