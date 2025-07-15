"use client"

import type React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  VStack,
  HStack,
  Icon,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Button,
} from "@chakra-ui/react"
import { FaShoppingCart, FaUsers, FaDollarSign, FaBoxes, FaEye, FaChartLine } from "react-icons/fa"
import { AiOutlineRise } from 'react-icons/ai';
import { motion } from "framer-motion"
import AdminLayout from "../../components/admin/AdminLayout"
import { Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const MotionCard = motion(Card)

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      label: "Total Revenue",
      value: "$45,231",
      change: 12.5,
      icon: FaDollarSign,
      color: "green",
    },
    {
      label: "Total Orders",
      value: "1,234",
      change: 8.2,
      icon: FaShoppingCart,
      color: "blue",
    },
    {
      label: "Active Customers",
      value: "892",
      change: 15.3,
      icon: FaUsers,
      color: "purple",
    },
    {
      label: "Products in Stock",
      value: "2,456",
      change: -2.1,
      icon: FaBoxes,
      color: "orange",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Dr. Sarah Johnson",
      amount: "$234.50",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "City Hospital",
      amount: "$1,245.00",
      status: "Processing",
      date: "2024-01-15",
    },
    {
      id: "ORD-003",
      customer: "MedCare Clinic",
      amount: "$567.25",
      status: "Shipped",
      date: "2024-01-14",
    },
    {
      id: "ORD-004",
      customer: "Dr. Michael Chen",
      amount: "$89.99",
      status: "Pending",
      date: "2024-01-14",
    },
  ]

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  }

  const categoryData = {
    labels: ["Pain Relief", "Antibiotics", "Vitamins", "Medical Devices", "PPE"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green"
      case "Processing":
        return "blue"
      case "Shipped":
        return "purple"
      case "Pending":
        return "orange"
      default:
        return "gray"
    }
  }

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="xl" color="gray.800" mb={2}>
              Dashboard Overview
            </Heading>
            <Text color="gray.600">Welcome back! Here's what's happening with your store today.</Text>
          </Box>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {stats.map((stat, index) => (
              <MotionCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
              >
                <CardBody>
                  <Stat>
                    <HStack justify="space-between" mb={2}>
                      <StatLabel color="gray.600" fontSize="sm">
                        {stat.label}
                      </StatLabel>
                      <Icon as={stat.icon} w={5} h={5} color={`${stat.color}.500`} />
                    </HStack>
                    <StatNumber fontSize="2xl" color="gray.800">
                      {stat.value}
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type={stat.change > 0 ? "increase" : "decrease"} />
                      {Math.abs(stat.change)}% from last month
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </MotionCard>
            ))}
          </SimpleGrid>

          {/* Charts Section */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <Card>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between">
                    <Heading size="md" color="gray.800">
                      Sales Overview
                    </Heading>
                    <Icon as={FaChartLine} color="blue.500" />
                  </HStack>
                  <Box h="300px">
                    <Line
                      data={salesData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between">
                    <Heading size="md" color="gray.800">
                      Product Categories
                    </Heading>
                    <Icon as={AiOutlineRise} color="green.500" />
                  </HStack>
                  <Box h="300px">
                    <Doughnut
                      data={categoryData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                      }}
                    />
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Recent Orders */}
          <Card>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Heading size="md" color="gray.800">
                    Recent Orders
                  </Heading>
                  <Button size="sm" variant="outline" colorScheme="brand">
                    View All
                  </Button>
                </HStack>
                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Order ID</Th>
                        <Th>Customer</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                        <Th>Date</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {recentOrders.map((order) => (
                        <Tr key={order.id}>
                          <Td fontWeight="semibold">{order.id}</Td>
                          <Td>
                            <HStack>
                              <Avatar size="sm" name={order.customer} />
                              <Text>{order.customer}</Text>
                            </HStack>
                          </Td>
                          <Td fontWeight="semibold">{order.amount}</Td>
                          <Td>
                            <Badge colorScheme={getStatusColor(order.status)} variant="subtle">
                              {order.status}
                            </Badge>
                          </Td>
                          <Td>{order.date}</Td>
                          <Td>
                            <Button size="sm" variant="ghost" leftIcon={<FaEye />}>
                              View
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </AdminLayout>
  )
}

export default AdminDashboard
