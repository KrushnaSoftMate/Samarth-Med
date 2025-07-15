"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Select,
  HStack,
  VStack,
  Badge,
  Button,
  Image,
  Card,
  CardBody,
  CardFooter,
  InputGroup,
  InputLeftElement,
  Flex,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { FaWhatsapp, FaDownload, FaShoppingCart, FaHeart, FaEye, FaOm, FaStar } from "react-icons/fa"
import { useCart } from "../context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import GradientText from "../components/GradientText"
import LoadingSpinner from "../components/LoadingSpinner"

const MotionBox = motion(Box)
const MotionSimpleGrid = motion(SimpleGrid)

interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
  inStock: boolean
  rating: number
  reviews: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 25.99,
    description: "Pain relief and fever reducer tablets for divine healing and comfort",
    image: "/images/product.jpg",
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    price: 45.5,
    description: "Divine broad-spectrum antibiotic capsules for blessed healing from infections",
    image: "/images/product2.jpg",
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Insulin Pen",
    category: "Diabetes Care",
    price: 89.99,
    description: "Sacred pre-filled insulin pen for divine diabetes management and blessed blood sugar control",
    image: "/images/product3.jpg",
    inStock: false,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Blood Pressure Monitor",
    category: "Medical Devices",
    price: 125.0,
    description: "Blessed digital blood pressure monitoring device with divine accuracy and large LCD display",
    image: "/images/product.jpg",
    inStock: true,
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 5,
    name: "Vitamin D3 1000IU",
    category: "Vitamins",
    price: 18.75,
    description: "Divine vitamin D3 supplement tablets for blessed bone health and spiritual wellness",
    image: "/images/product3.jpg",
    inStock: true,
    rating: 4.5,
    reviews: 78,
  },
  {
    id: 6,
    name: "Surgical Masks (Box of 50)",
    category: "PPE",
    price: 15.99,
    description: "Sacred disposable surgical face masks with divine 3-layer protection and blessed safety",
    image: "/images/product2.jpg",
    inStock: true,
    rating: 4.4,
    reviews: 312,
  },
  {
    id: 7,
    name: "Digital Thermometer",
    category: "Medical Devices",
    price: 29.99,
    description: "Blessed fast and accurate digital thermometer with divine fever alarm and sacred readings",
    image: "/images/product.jpg",
    inStock: true,
    rating: 4.7,
    reviews: 145,
  },
  {
    id: 8,
    name: "Hand Sanitizer 500ml",
    category: "PPE",
    price: 12.5,
    description: "Divine 70% alcohol-based hand sanitizer with blessed moisturizing agents and spiritual protection",
    image: "/images/product2.jpg",
    inStock: true,
    rating: 4.3,
    reviews: 267,
  },
]

const categories = ["All", "Pain Relief", "Antibiotics", "Diabetes Care", "Medical Devices", "Vitamins", "PPE"]

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const toast = useToast()
  const { addToCart } = useCart()

  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("spiritual.200", "gray.600")

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  const handleWhatsAppOrder = (product: Product) => {
    const message = `नमस्कार Samarth Pharma, I would like to order: ${product.name} - ₹${product.price} with service`
    const whatsappUrl = `https://wa.me/9325638959?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleDownloadPriceList = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Price List Downloaded",
        description: "The complete price list has been downloaded successfully with Swami Samarth's grace.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }, 2000)
  }

  const handleAddToCart = (product: Product, quantity = 1) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity,
    })
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  if (loading) {
    return (
      <Container maxW="7xl" py={12}>
        <LoadingSpinner text="Downloading price list..." />
      </Container>
    )
  }

  return (
    <Container maxW="7xl" py={8}>
      {/* Header */}
      <VStack spacing={6} mb={8} textAlign="center">
        <HStack>
          <GradientText as="h1" fontSize="4xl" gradient="linear(to-r, saffron.600, saffron.800)" fontFamily="Poppins">
            Our Products
          </GradientText>
        </HStack>
        <Text fontSize="xl" color="gray.600" maxW="3xl">
          Browse our comprehensive range of pharmaceutical products and medical supplies. All products are
          sourced from certified manufacturers and blessed with divine quality assurance.
        </Text>
        <Button
          leftIcon={<FaDownload />}
          variant="spiritual"
          size="lg"
          onClick={handleDownloadPriceList}
          shadow="xl"
          _hover={{
            transform: "translateY(-2px)",
            shadow: "2xl",
          }}
        >
          Download Price List
        </Button>
      </VStack>

      {/* Filters */}
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={8}
        p={6}
        bg="spiritual.50"
        borderRadius="2xl"
        shadow="lg"
        border="2px solid"
        borderColor="saffron.200"
      >
        <InputGroup flex={2}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="saffron.400" />
          </InputLeftElement>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="white"
            border="2px solid"
            borderColor="spiritual.200"
            _focus={{
              borderColor: "saffron.400",
              shadow: "lg",
            }}
          />
        </InputGroup>

        <Select
          flex={1}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          bg="white"
          border="2px solid"
          borderColor="spiritual.200"
          _focus={{
            borderColor: "saffron.400",
            shadow: "lg",
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Select
          flex={1}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          bg="white"
          border="2px solid"
          borderColor="spiritual.200"
          _focus={{
            borderColor: "saffron.400",
            shadow: "lg",
          }}
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Blessed Rating</option>
        </Select>
      </Flex>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <MotionSimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
          key={`${searchTerm}-${selectedCategory}-${sortBy}`}
        >
          {filteredProducts.map((product, index) => (
            <MotionBox
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card
                bg={cardBg}
                shadow="lg"
                border="2px solid"
                borderColor={borderColor}
                overflow="hidden"
                position="relative"
                h="full"
                borderRadius="2xl"
                _hover={{
                  borderColor: "saffron.300",
                  shadow: "2xl",
                }}
                transition="all 0.3s ease"
              >
                <Box position="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    w="full"
                    h="200px"
                    objectFit="cover"
                  />

                  {/* Favorite Button */}
                  <IconButton
                    aria-label="Add to favorites"
                    icon={<FaHeart />}
                    size="sm"
                    position="absolute"
                    top={2}
                    right={2}
                    colorScheme={favorites.includes(product.id) ? "red" : "gray"}
                    variant={favorites.includes(product.id) ? "solid" : "ghost"}
                    onClick={() => toggleFavorite(product.id)}
                    bg={favorites.includes(product.id) ? "red.500" : "whiteAlpha.800"}
                    _hover={{
                      bg: favorites.includes(product.id) ? "red.600" : "whiteAlpha.900",
                      transform: "scale(1.1)",
                    }}
                  />

                  {/* Stock Badge */}
                  <Badge
                    position="absolute"
                    top={2}
                    left={2}
                    colorScheme={product.inStock ? "green" : "red"}
                    variant="solid"
                    borderRadius="lg"
                    px={2}
                    py={1}
                  >
                    {product.inStock ? "Stock" : "Restock Soon"}
                  </Badge>

                  {/* Om Symbol Overlay */}
                  <Box
                    position="absolute"
                    bottom={2}
                    right={2}
                    w={8}
                    h={8}
                    bg="saffron.500"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity={0.8}
                  >
                    <FaOm color="white" size={16} />
                  </Box>
                </Box>

                <CardBody>
                  <VStack align="start" spacing={3}>
                    <HStack justify="space-between" w="full">
                      <Badge colorScheme="blue" variant="subtle" borderRadius="lg">
                        {product.category}
                      </Badge>
                      <HStack spacing={1}>
                        <FaStar color="#FFD700" size={14} />
                        <Text fontSize="sm" color="gray.600" fontWeight="medium">
                          {product.rating} ({product.reviews})
                        </Text>
                      </HStack>
                    </HStack>

                    <Heading as="h3" size="md" noOfLines={2} color="gray.800" fontFamily="Poppins">
                      {product.name}
                    </Heading>

                    <Text color="gray.600" fontSize="sm" noOfLines={2} lineHeight="tall">
                      {product.description}
                    </Text>

                    <HStack justify="space-between" w="full">
                      <Text fontSize="2xl" fontWeight="bold" color="saffron.600">
                        ₹{product.price.toFixed(2)}
                      </Text>
                      <Tooltip label="Product quick view">
                        <IconButton
                          aria-label="Quick view"
                          icon={<FaEye />}
                          size="sm"
                          variant="ghost"
                          colorScheme="saffron"
                          _hover={{ bg: "spiritual.100" }}
                        />
                      </Tooltip>
                    </HStack>
                  </VStack>
                </CardBody>

                <CardFooter pt={0}>
                  <VStack spacing={3} w="full">
                    <NumberInput defaultValue={1} min={1} max={100} size="sm" w="full">
                      <NumberInputField placeholder="Quantity" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <HStack w="full" spacing={2}>
                      <Button
                        leftIcon={<FaShoppingCart />}
                        variant="spiritual"
                        size="sm"
                        flex={1}
                        isDisabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                        _hover={{
                          transform: "translateY(-1px)",
                        }}
                      >
                        Add To Cart
                      </Button>
                      <Button
                        leftIcon={<FaWhatsapp />}
                        colorScheme="whatsapp"
                        size="sm"
                        flex={1}
                        isDisabled={!product.inStock}
                        onClick={() => handleWhatsAppOrder(product)}
                        _hover={{
                          transform: "translateY(-1px)",
                        }}
                      >
                        WhatsApp
                      </Button>
                    </HStack>
                  </VStack>
                </CardFooter>
              </Card>
            </MotionBox>
          ))}
        </MotionSimpleGrid>
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <MotionBox
          textAlign="center"
          py={12}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={4}>
            <FaOm size={60} color="#FF9800" opacity={0.5} />
            <Text fontSize="xl" color="gray.500" mb={4}>
              No products found matching your criteria.
            </Text>
            <Button
              variant="spiritual"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </VStack>
        </MotionBox>
      )}
    </Container>
  )
}

export default Products
