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
  Input,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  IconButton,
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
import { FaEye, FaDownload, FaPrint, FaFileInvoice, FaDollarSign, FaClock, FaEnvelope } from "react-icons/fa"
import AdminLayout from "../../components/admin/AdminLayout"

interface Invoice {
  id: string
  customerName: string
  customerEmail: string
  amount: number
  status: "Paid" | "Pending" | "Overdue"
  date: string
  dueDate: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

const AdminInvoices: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const toast = useToast()

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      customerName: "Dr. Sarah Johnson",
      customerEmail: "sarah.johnson@hospital.com",
      amount: 234.5,
      status: "Paid",
      date: "2024-01-15",
      dueDate: "2024-02-14",
      items: [
        { name: "Paracetamol 500mg", quantity: 2, price: 25.99 },
        { name: "Vitamin D3", quantity: 1, price: 18.75 },
      ],
    },
    {
      id: "INV-002",
      customerName: "City Hospital",
      customerEmail: "procurement@cityhospital.com",
      amount: 1245.0,
      status: "Pending",
      date: "2024-01-14",
      dueDate: "2024-02-13",
      items: [
        { name: "Surgical Masks", quantity: 10, price: 15.99 },
        { name: "Hand Sanitizer", quantity: 5, price: 12.5 },
        { name: "Blood Pressure Monitor", quantity: 3, price: 125.0 },
      ],
    },
    {
      id: "INV-003",
      customerName: "MedCare Clinic",
      customerEmail: "billing@medcare.com",
      amount: 567.25,
      status: "Overdue",
      date: "2024-01-10",
      dueDate: "2024-02-09",
      items: [
        { name: "Insulin Pen", quantity: 2, price: 89.99 },
        { name: "Digital Thermometer", quantity: 5, price: 29.99 },
      ],
    },
  ])

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "green"
      case "Pending":
        return "orange"
      case "Overdue":
        return "red"
      default:
        return "gray"
    }
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    onOpen()
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded as PDF`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const handlePrintInvoice = (invoiceId: string) => {
    window.print()
    toast({
      title: "Invoice Sent to Printer",
      description: `Invoice ${invoiceId} is being printed`,
      status: "info",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleSendInvoice = (invoice: Invoice) => {
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoice.id} has been sent to ${invoice.customerEmail}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const totalInvoices = invoices.length
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const overdueInvoices = invoices.filter((invoice) => invoice.status === "Overdue").length

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack justify="space-between" wrap="wrap">
            <VStack align="start" spacing={1}>
              <Heading size="xl" color="gray.800">
                Invoice Management
              </Heading>
              <Text color="gray.600">Track and manage customer invoices</Text>
            </VStack>
          </HStack>

          {/* Stats Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card>
              <CardBody>
                <Stat>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <StatLabel>Total Invoices</StatLabel>
                      <StatNumber>{totalInvoices}</StatNumber>
                    </VStack>
                    <Box p={3} bg="blue.100" borderRadius="lg">
                      <FaFileInvoice color="#3182CE" size={20} />
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
                      <StatLabel>Total Amount</StatLabel>
                      <StatNumber>${totalAmount.toFixed(2)}</StatNumber>
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
                      <StatLabel>Overdue Invoices</StatLabel>
                      <StatNumber color="red.500">{overdueInvoices}</StatNumber>
                    </VStack>
                    <Box p={3} bg="red.100" borderRadius="lg">
                      <FaClock color="#E53E3E" size={20} />
                    </Box>
                  </HStack>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Search */}
          <Card>
            <CardBody>
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                maxW="400px"
              />
            </CardBody>
          </Card>

          {/* Invoices Table */}
          <Card>
            <CardBody>
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Invoice ID</Th>
                      <Th>Customer</Th>
                      <Th isNumeric>Amount</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                      <Th>Due Date</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredInvoices.map((invoice) => (
                      <Tr key={invoice.id}>
                        <Td fontWeight="semibold" color="brand.500">
                          {invoice.id}
                        </Td>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="semibold">{invoice.customerName}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {invoice.customerEmail}
                            </Text>
                          </VStack>
                        </Td>
                        <Td isNumeric fontWeight="semibold">
                          ${invoice.amount.toFixed(2)}
                        </Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                        </Td>
                        <Td>{invoice.date}</Td>
                        <Td>{invoice.dueDate}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              aria-label="View invoice"
                              icon={<FaEye />}
                              size="sm"
                              variant="ghost"
                              colorScheme="blue"
                              onClick={() => handleViewInvoice(invoice)}
                            />
                            <IconButton
                              aria-label="Download invoice"
                              icon={<FaDownload />}
                              size="sm"
                              variant="ghost"
                              colorScheme="green"
                              onClick={() => handleDownloadInvoice(invoice.id)}
                            />
                            <IconButton
                              aria-label="Print invoice"
                              icon={<FaPrint />}
                              size="sm"
                              variant="ghost"
                              colorScheme="purple"
                              onClick={() => handlePrintInvoice(invoice.id)}
                            />
                            <IconButton
                              aria-label="Send invoice"
                              icon={<FaEnvelope />}
                              size="sm"
                              variant="ghost"
                              colorScheme="orange"
                              onClick={() => handleSendInvoice(invoice)}
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

      {/* Invoice Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invoice Details - {selectedInvoice?.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedInvoice && (
              <VStack spacing={6} align="stretch">
                {/* Invoice Header */}
                <Box p={6} bg="brand.50" borderRadius="lg">
                  <HStack justify="space-between" mb={4}>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                        RoteMed
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Medical Wholesaler
                      </Text>
                    </VStack>
                    <VStack align="end" spacing={0}>
                      <Text fontSize="xl" fontWeight="bold">
                        INVOICE
                      </Text>
                      <Text color="gray.600">{selectedInvoice.id}</Text>
                    </VStack>
                  </HStack>
                  <SimpleGrid columns={2} spacing={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={1}>
                        Bill To:
                      </Text>
                      <Text>{selectedInvoice.customerName}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {selectedInvoice.customerEmail}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={1}>
                        Invoice Date:
                      </Text>
                      <Text>{selectedInvoice.date}</Text>
                      <Text fontSize="sm" fontWeight="semibold" mt={2} mb={1}>
                        Due Date:
                      </Text>
                      <Text>{selectedInvoice.dueDate}</Text>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Invoice Items */}
                <Box>
                  <Heading size="sm" mb={3}>
                    Invoice Items
                  </Heading>
                  <Card variant="outline">
                    <CardBody>
                      <VStack spacing={3} align="stretch">
                        {selectedInvoice.items.map((item, index) => (
                          <HStack key={index} justify="space-between">
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="semibold">{item.name}</Text>
                              <Text fontSize="sm" color="gray.600">
                                {item.quantity} × ${item.price.toFixed(2)}
                              </Text>
                            </VStack>
                            <Text fontWeight="semibold">${(item.quantity * item.price).toFixed(2)}</Text>
                          </HStack>
                        ))}
                        <Divider />
                        <HStack justify="space-between">
                          <Text fontWeight="bold" fontSize="lg">
                            Total:
                          </Text>
                          <Text fontWeight="bold" fontSize="xl" color="brand.500">
                            ${selectedInvoice.amount.toFixed(2)}
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </Box>

                {/* Invoice Status */}
                <HStack justify="space-between">
                  <Badge colorScheme={getStatusColor(selectedInvoice.status)} fontSize="md" p={2}>
                    {selectedInvoice.status}
                  </Badge>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      leftIcon={<FaDownload />}
                      colorScheme="green"
                      onClick={() => handleDownloadInvoice(selectedInvoice.id)}
                    >
                      Download
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<FaPrint />}
                      colorScheme="blue"
                      onClick={() => handlePrintInvoice(selectedInvoice.id)}
                    >
                      Print
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<FaEnvelope />}
                      colorScheme="orange"
                      onClick={() => handleSendInvoice(selectedInvoice)}
                    >
                      Send
                    </Button>
                  </HStack>
                </HStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </AdminLayout>
  )
}

export default AdminInvoices
