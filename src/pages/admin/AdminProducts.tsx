"use client"

import React from "react"
import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Badge,
  HStack,
  VStack,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  Switch,
  useToast,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"
import { FaPlus, FaEdit, FaTrash, FaBoxes, FaDollarSign, FaChartLine } from "react-icons/fa"
import { SearchIcon } from "@chakra-ui/icons"
import AdminLayout from "../../components/admin/AdminLayout"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  description: string
  image: string
  inStock: boolean
  sku: string
}

const AdminProducts: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const toast = useToast()

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 25.99,
      stock: 150,
      description: "Effective pain relief and fever reducer tablets",
      image: "/images/paracetamol.jpg",
      inStock: true,
      sku: "PAR-500-001",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotics",
      price: 45.5,
      stock: 75,
      description: "Broad-spectrum antibiotic capsules",
      image: "/images/antibiotics.jpg",
      inStock: true,
      sku: "AMX-250-002",
    },
    {
      id: 3,
      name: "Insulin Pen",
      category: "Diabetes Care",
      price: 89.99,
      stock: 0,
      description: "Pre-filled insulin pen for diabetes management",
      image: "/images/insulin-pen.jpg",
      inStock: false,
      sku: "INS-PEN-003",
    },
  ])

  const categories = ["All", "Pain Relief", "Antibiotics", "Diabetes Care", "Medical Devices", "Vitamins", "PPE"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddProduct = () => {
    setEditingProduct(null)
    onOpen()
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    onOpen()
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
    toast({
      title: "Product deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...productData } : p)))
      toast({
        title: "Product updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now(),
        ...productData,
      } as Product
      setProducts([...products, newProduct])
      toast({
        title: "Product added",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
    onClose()
  }

  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
  const lowStockProducts = products.filter((product) => product.stock < 10).length

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack justify="space-between" wrap="wrap">
            <VStack align="start" spacing={1}>
              <Heading size="xl" color="gray.800">
                Product Management
              </Heading>
              <Text color="gray.600">Manage your inventory and product catalog</Text>
            </VStack>
            <Button leftIcon={<FaPlus />} colorScheme="brand" onClick={handleAddProduct}>
              Add Product
            </Button>
          </HStack>

          {/* Stats Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card>
              <CardBody>
                <Stat>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <StatLabel>Total Products</StatLabel>
                      <StatNumber>{totalProducts}</StatNumber>
                    </VStack>
                    <Box p={3} bg="blue.100" borderRadius="lg">
                      <FaBoxes color="#3182CE" size={20} />
                    </Box>
                  </HStack>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <StatLabel>Inventory Value</StatLabel>
                      <StatNumber>${totalValue.toFixed(2)}</StatNumber>
                    </VStack>
                    <Box p={3} bg="green.100" borderRadius="lg">
                      <FaDollarSign color="#38A169" size={20} />
                    </Box>
                  </HStack>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <StatLabel>Low Stock Items</StatLabel>
                      <StatNumber color="red.500">{lowStockProducts}</StatNumber>
                    </VStack>
                    <Box p={3} bg="red.100" borderRadius="lg">
                      <FaChartLine color="#E53E3E" size={20} />
                    </Box>
                  </HStack>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Filters */}
          <Card>
            <CardBody>
              <HStack spacing={4} wrap="wrap">
                <InputGroup maxW="300px">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <Select maxW="200px" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </HStack>
            </CardBody>
          </Card>

          {/* Products Table */}
          <Card>
            <CardBody>
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Product</Th>
                      <Th>SKU</Th>
                      <Th>Category</Th>
                      <Th isNumeric>Price</Th>
                      <Th isNumeric>Stock</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredProducts.map((product) => (
                      <Tr key={product.id}>
                        <Td>
                          <HStack>
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              boxSize="50px"
                              objectFit="cover"
                              borderRadius="md"
                            />
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="semibold">{product.name}</Text>
                              <Text fontSize="sm" color="gray.500" noOfLines={1}>
                                {product.description}
                              </Text>
                            </VStack>
                          </HStack>
                        </Td>
                        <Td>
                          <Text fontSize="sm" fontFamily="mono">
                            {product.sku}
                          </Text>
                        </Td>
                        <Td>
                          <Badge colorScheme="blue" variant="subtle">
                            {product.category}
                          </Badge>
                        </Td>
                        <Td isNumeric fontWeight="semibold">
                          ${product.price.toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          <Text color={product.stock < 10 ? "red.500" : "gray.800"}>{product.stock}</Text>
                        </Td>
                        <Td>
                          <Badge colorScheme={product.inStock ? "green" : "red"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              aria-label="Edit product"
                              icon={<FaEdit />}
                              size="sm"
                              variant="ghost"
                              colorScheme="blue"
                              onClick={() => handleEditProduct(product)}
                            />
                            <IconButton
                              aria-label="Delete product"
                              icon={<FaTrash />}
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => handleDeleteProduct(product.id)}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </CardBody>
          </Card>
        </VStack>
      </Container>

      {/* Add/Edit Product Modal */}
      <ProductModal
        isOpen={isOpen}
        onClose={onClose}
        product={editingProduct}
        onSave={handleSaveProduct}
        categories={categories.filter((c) => c !== "All")}
      />
    </AdminLayout>
  )
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onSave: (product: Partial<Product>) => void
  categories: string[]
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onSave, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    image: "",
    inStock: true,
    sku: "",
  })

  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image: product.image,
        inStock: product.inStock,
        sku: product.sku,
      })
    } else {
      setFormData({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        description: "",
        image: "",
        inStock: true,
        sku: "",
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product ? "Edit Product" : "Add New Product"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Product Name</FormLabel>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>SKU</FormLabel>
                  <Input value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <NumberInput
                    value={formData.price}
                    onChange={(_, value) => setFormData({ ...formData, price: value })}
                    min={0}
                    precision={2}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Stock Quantity</FormLabel>
                <NumberInput
                  value={formData.stock}
                  onChange={(_, value) => setFormData({ ...formData, stock: value })}
                  min={0}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">In Stock</FormLabel>
                <Switch
                  isChecked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="end">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="brand">
                  {product ? "Update" : "Add"} Product
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AdminProducts
