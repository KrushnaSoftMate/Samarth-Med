"use client"

import type React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Card,
  CardBody,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Badge,
  useToast,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react"
import { FaTrash, FaWhatsapp, FaArrowRight, FaOm, FaHeart } from "react-icons/fa"
import { Link as RouterLink } from "react-router-dom"
import { useCart } from "../context/CartContext"
import GradientText from "../components/GradientText"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart()
  const toast = useToast()

  const handleWhatsAppOrder = () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before ordering.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const orderDetails = state.items
      .map((item) => `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const message = `नमस्कार Samarth Pharma, I would like to place the following order:\n\n${orderDetails}\n\nTotal: ₹${state.total.toFixed(2)}\n\nPlease confirm availability and delivery details with Swami Samarth's grace.`

    const whatsappUrl = `https://wa.me/9325638959?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
      status: "info",
      duration: 3000,
      isClosable: true,
    })
  }

  if (state.items.length === 0) {
    return (
      <Container maxW="7xl" py={12}>
        <VStack spacing={8} textAlign="center">
          <MotionBox
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <FaOm size={80} color="#FF9800" opacity={0.5} />
          </MotionBox>
          <VStack spacing={4}>
            <GradientText as="h1" fontSize="3xl" gradient="linear(to-r, saffron.600, saffron.800)" fontFamily="Poppins">
              Your    Cart is Empty
            </GradientText>
            <Text fontSize="lg" color="gray.600">
              Browse our  products and add    items to your    cart to begin your    shopping
              journey.
            </Text>
            <Button
              as={RouterLink}
              to="/products"
              variant="spiritual"
              size="lg"
              rightIcon={<FaArrowRight />}
              shadow="xl"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "2xl",
              }}
            >
              Explore  Products
            </Button>
          </VStack>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Box>
            <HStack mb={2}>
              <GradientText
                as="h1"
                fontSize="3xl"
                gradient="linear(to-r, saffron.600, saffron.800)"
                fontFamily="Poppins"
              >
                Shopping Cart
              </GradientText>
            </HStack>
            <Text color="gray.600">
              {state.items.length}    item{state.items.length !== 1 ? "s" : ""} in your  cart
            </Text>
          </Box>
          <Button
            variant="outline"
            colorScheme="red"
            onClick={handleClearCart}
            _hover={{
              transform: "translateY(-2px)",
              shadow: "lg",
            }}
          >
            Clear    Cart
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          {/* Cart Items */}
          <Box gridColumn={{ base: "1", lg: "1 / 3" }}>
            <VStack spacing={4} align="stretch">
              {state.items.map((item) => (
                <Card key={item.id} border="2px solid" borderColor="spiritual.200" borderRadius="2xl">
                  <CardBody>
                    <Flex gap={4} align="center">
                      <Box position="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          boxSize="100px"
                          objectFit="cover"
                          borderRadius="xl"
                          border="2px solid"
                          borderColor="saffron.200"
                        />
                        <Box
                          position="absolute"
                          top="-5px"
                          right="-5px"
                          w={6}
                          h={6}
                          bg="saffron.500"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <FaOm color="white" size={12} />
                        </Box>
                      </Box>

                      <Box flex="1">
                        <Heading size="md" mb={1} color="gray.800" fontFamily="Poppins">
                          {item.name}
                        </Heading>
                        <Badge colorScheme="blue" variant="subtle" mb={2} borderRadius="lg">
                          {item.category}
                        </Badge>
                        <Text fontWeight="bold" color="saffron.600" fontSize="lg">
                          ₹{item.price.toFixed(2)} each
                        </Text>
                      </Box>

                      <VStack spacing={2}>
                        <NumberInput
                          value={item.quantity}
                          onChange={(_, value) => updateQuantity(item.id, value)}
                          min={1}
                          max={100}
                          size="sm"
                          w="100px"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <Text fontSize="sm" color="gray.600">
                          Qty: {item.quantity}
                        </Text>
                      </VStack>

                      <VStack spacing={2} align="end">
                        <Text fontWeight="bold" fontSize="xl" color="saffron.600">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </Text>
                        <IconButton
                          aria-label="Remove    item"
                          icon={<FaTrash />}
                          colorScheme="red"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          _hover={{
                            bg: "red.100",
                            transform: "scale(1.1)",
                          }}
                        />
                      </VStack>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Box>

          {/* Order Summary */}
          <Card
            h="fit-content"
            position="sticky"
            top="4"
            border="2px solid"
            borderColor="saffron.200"
            borderRadius="2xl"
            bg="spiritual.50"
          >
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <FaHeart size={20} color="#FF9800" />
                  <Heading size="md" color="saffron.600" fontFamily="Poppins">
                      Order Summary
                  </Heading>
                </HStack>

                <VStack spacing={2} align="stretch">
                  {state.items.map((item) => (
                    <HStack key={item.id} justify="space-between" fontSize="sm">
                      <Text>
                        {item.name} x{item.quantity}
                      </Text>
                      <Text fontWeight="semibold">₹{(item.price * item.quantity).toFixed(2)}</Text>
                    </HStack>
                  ))}
                </VStack>

                <Divider borderColor="saffron.300" />

                <HStack justify="space-between">
                  <Text>Subtotal:</Text>
                  <Text fontWeight="semibold">₹{state.total.toFixed(2)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Tax (18% GST):</Text>
                  <Text fontWeight="semibold">₹{(state.total * 0.18).toFixed(2)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Shipping:</Text>
                  <Text fontWeight="semibold" color="green.500">
                    FREE
                  </Text>
                </HStack>

                <Divider borderColor="saffron.300" />

                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="bold">
                    Total:
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" color="saffron.600">
                    ₹{(state.total * 1.18).toFixed(2)}
                  </Text>
                </HStack>

                <VStack spacing={3} pt={4}>
                  <Button
                    leftIcon={<FaWhatsapp />}
                    colorScheme="whatsapp"
                    size="lg"
                    w="full"
                    onClick={handleWhatsAppOrder}
                    shadow="lg"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "xl",
                    }}
                  >
                    Order via WhatsApp
                  </Button>

                  <Button
                    as={RouterLink}
                    to="/products"
                    variant="outline"
                    colorScheme="saffron"
                    size="lg"
                    w="full"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "lg",
                    }}
                  >
                    Continue    Shopping
                  </Button>
                </VStack>

                <Box p={4} bg="spiritual.100" borderRadius="xl" border="1px solid" borderColor="saffron.200">
                  <Text fontSize="sm" color="saffron.700" fontStyle="italic" textAlign="center">
                    "श्री स्वामी समर्थ कृपा से सेवा"
                    <br />
                    <Text fontSize="xs" mt={1}>
                         with Swami Samarth's grace
                    </Text>
                  </Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Cart
