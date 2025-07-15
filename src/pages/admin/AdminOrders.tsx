"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  VStack,
  Button,
  Select,
  Input,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
} from "@chakra-ui/react"
import { FaEye, FaShoppingCart, FaDollarSign, FaClock, FaChevronDown, FaPhone, FaEnvelope } from "react-icons/fa"
import AdminLayout from "../../components/admin/AdminLayout"

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    avatar?: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  date: string
  shippingAddress: string
}

const AdminOrders: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const toast = useToast()

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@hospital.com",
        phone: "+1 (555) 123-4567",
      },
      items: [
        { name: "Paracetamol 500mg", quantity: 2, price: 25.99 },
        { name: "Vitamin D3", quantity: 1, price: 18.75 },
      ],
      total: 70.73,
      status: "Processing",
      date: "2024-01-15",
      shippingAddress: "123 Medical Center Dr, Healthcare City, HC 12345",
    },
    {
      id: "ORD-002",
      customer: {
        name: "City Hospital",
        email: "procurement@cityhospital.com",
        phone: "+1 (555) 987-6543",
      },
      items: [
        { name: "Surgical Masks", quantity: 10, price: 15.99 },
        { name: "Hand Sanitizer", quantity: 5, price: 12.5 },
      ],
      total: 222.4,
      status: "Shipped",
      date: "2024-01-14",
      shippingAddress: "456 Hospital Ave, Medical District, MD 67890",
    },
    {
      id: "ORD-003",
      customer: {
        name: "Dr. Michael Chen",
        email: "m.chen@clinic.com",
        phone: "+1 (555) 456-7890",
      },
      items: [{ name: "Blood Pressure Monitor", quantity: 1, price: 125.0 }],
      total: 125.0,
      status: "Delivered",
      date: "2024-01-13",
      shippingAddress: "789 Clinic St, Health Plaza, HP 13579",
    },
  ])

  const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "orange"
      case "Processing":
        return "blue"
      case "Shipped":
        return "purple"
      case "Delivered":
        return "green"
      case "Cancelled":
        return "red"
      default:
        return "gray"
    }
  }

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    toast({
      title: "Order status updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    onOpen()
  }

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((order) => order.status === "Pending").length

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack justify="space-between" wrap="wrap">
            <VStack align="start" spacing={1}>
              <Heading size="xl" color="gray.800">
                Order Management
              </Heading>
              <Text color="gray.600">Track and manage customer orders</Text>
            </VStack>
          </HStack>

          {/* Stats Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card>
              <CardBody>
                <Stat>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <StatLabel>Total Orders</StatLabel>
                      <StatNumber>{totalOrders}</StatNumber>
                    </VStack>
                    <Box p={3} bg="blue.100" borderRadius="lg">
                      <FaShoppingCart color="#3182CE" size={20} />
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
                      <StatLabel>Total Revenue</StatLabel>
                      <StatNumber>${totalRevenue.toFixed(2)}</StatNumber>
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
                      <StatLabel>Pending Orders</StatLabel>
                      <StatNumber color="orange.500">{pendingOrders}</StatNumber>
                    </VStack>
                    <Box p={3} bg="orange.100" borderRadius="lg">
                      <FaClock color="#DD6B20" size={20} />
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
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  maxW="300px"
                />
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} maxW="200px">
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </HStack>
            </CardBody>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardBody>
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Order ID</Th>
                      <Th>Customer</Th>
                      <Th>Items</Th>
                      <Th isNumeric>Total</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredOrders.map((order) => (
                      <Tr key={order.id}>
                        <Td fontWeight="semibold" color="brand.500">
                          {order.id}
                        </Td>
                        <Td>
                          <HStack>
                            <Avatar size="sm" name={order.customer.name} />
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="semibold">{order.customer.name}</Text>
                              <Text fontSize="sm" color="gray.500">
                                {order.customer.email}
                              </Text>
                            </VStack>
                          </HStack>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                          </Text>
                        </Td>
                        <Td isNumeric fontWeight="semibold">
                          ${order.total.toFixed(2)}
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton as={Button} size="sm" variant="ghost" rightIcon={<FaChevronDown />}>
                              <Badge colorScheme={getStatusColor(order.status)}>{order.status}</Badge>
                            </MenuButton>
                            <MenuList>
                              {statusOptions.slice(1).map((status) => (
                                <MenuItem
                                  key={status}
                                  onClick={() => handleStatusChange(order.id, status as Order["status"])}
                                >
                                  {status}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </Menu>
                        </Td>
                        <Td>{order.date}</Td>
                        <Td>
                          <Button size="sm" variant="ghost" leftIcon={<FaEye />} onClick={() => handleViewOrder(order)}>
                            View
                          </Button>
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

      {/* Order Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details - {selectedOrder?.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedOrder && (
              <VStack spacing={6} align="stretch">
                {/* Customer Info */}
                <Box>
                  <Heading size="sm" mb={3}>
                    Customer Information
                  </Heading>
                  <Card variant="outline">
                    <CardBody>
                      <HStack spacing={4}>
                        <Avatar size="md" name={selectedOrder.customer.name} />
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">{selectedOrder.customer.name}</Text>
                          <HStack>
                            <FaEnvelope size={12} />
                            <Text fontSize="sm" color="gray.600">
                              {selectedOrder.customer.email}
                            </Text>
                          </HStack>
                          <HStack>
                            <FaPhone size={12} />
                            <Text fontSize="sm" color="gray.600">
                              {selectedOrder.customer.phone}
                            </Text>
                          </HStack>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                </Box>

                {/* Order Items */}
                <Box>
                  <Heading size="sm" mb={3}>
                    Order Items
                  </Heading>
                  <Card variant="outline">
                    <CardBody>
                      <VStack spacing={3} align="stretch">
                        {selectedOrder.items.map((item, index) => (
                          <HStack key={index} justify="space-between">
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="semibold">{item.name}</Text>
                              <Text fontSize="sm" color="gray.600">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </Text>
                            </VStack>
                            <Text fontWeight="semibold">${(item.quantity * item.price).toFixed(2)}</Text>
                          </HStack>
                        ))}
                        <Divider />
                        <HStack justify="space-between">
                          <Text fontWeight="bold">Total:</Text>
                          <Text fontWeight="bold" fontSize="lg" color="brand.500">
                            ${selectedOrder.total.toFixed(2)}
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </Box>

                {/* Shipping Address */}
                <Box>
                  <Heading size="sm" mb={3}>
                    Shipping Address
                  </Heading>
                  <Card variant="outline">
                    <CardBody>
                      <Text>{selectedOrder.shippingAddress}</Text>
                    </CardBody>
                  </Card>
                </Box>

                {/* Order Status */}
                <Box>
                  <Heading size="sm" mb={3}>
                    Order Status
                  </Heading>
                  <HStack>
                    <Badge colorScheme={getStatusColor(selectedOrder.status)} fontSize="md" p={2}>
                      {selectedOrder.status}
                    </Badge>
                    <Text color="gray.600">Order placed on {selectedOrder.date}</Text>
                  </HStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </AdminLayout>
  )
}

export default AdminOrders
