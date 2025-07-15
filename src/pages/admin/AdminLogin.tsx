"use client"

import type React from "react"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
} from "@chakra-ui/react"
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa"
import { motion } from "framer-motion"
import { useAdmin } from "../../context/AdminContext"

const MotionBox = motion(Box)
const MotionCard = motion(Card)

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAdmin()
  const toast = useToast()

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to RoteMed Admin Dashboard",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(135deg, brand.500 0%, medical.500 50%, brand.600 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md">
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <MotionCard
            shadow="2xl"
            borderRadius="2xl"
            overflow="hidden"
            bg="white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CardBody p={8}>
              <VStack spacing={6}>
                {/* Logo and Header */}
                <VStack spacing={4} textAlign="center">
                  <Box
                    w={16}
                    h={16}
                    bg="brand.500"
                    borderRadius="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    shadow="lg"
                  >
                    <FaLock color="white" size={24} />
                  </Box>
                  <VStack spacing={2}>
                    <Heading size="lg" color="gray.800">
                      Admin Login
                    </Heading>
                    <Text color="gray.600" fontSize="sm">
                      Sign in to access RoteMed Admin Dashboard
                    </Text>
                  </VStack>
                </VStack>

                <Divider />

                {/* Demo Credentials */}
                <Box bg="blue.50" p={4} borderRadius="lg" border="1px" borderColor="blue.200" w="full">
                  <Text fontSize="sm" fontWeight="semibold" color="blue.800" mb={2}>
                    Demo Credentials:
                  </Text>
                  <VStack spacing={1} align="start">
                    <Text fontSize="xs" color="blue.700">
                      Email: admin@rotemed.com
                    </Text>
                    <Text fontSize="xs" color="blue.700">
                      Password: admin123
                    </Text>
                  </VStack>
                </Box>

                {/* Login Form */}
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <VStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel color="gray.700" fontSize="sm" fontWeight="semibold">
                        Email Address
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          size="lg"
                          bg="gray.50"
                          border="2px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "brand.300" }}
                          _focus={{ borderColor: "brand.500", bg: "white" }}
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color="gray.700" fontSize="sm" fontWeight="semibold">
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          size="lg"
                          bg="gray.50"
                          border="2px"
                          borderColor="gray.200"
                          _hover={{ borderColor: "brand.300" }}
                          _focus={{ borderColor: "brand.500", bg: "white" }}
                        />
                        <InputRightElement h="full">
                          <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="brand"
                      size="lg"
                      w="full"
                      isLoading={loading}
                      loadingText="Signing in..."
                      leftIcon={<FaUser />}
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "lg",
                      }}
                      transition="all 0.3s ease"
                    >
                      Sign In
                    </Button>
                  </VStack>
                </form>
              </VStack>
            </CardBody>
          </MotionCard>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default AdminLogin
