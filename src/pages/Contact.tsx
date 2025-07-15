"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaOm, FaHeart } from "react-icons/fa"
import GradientText from "../components/GradientText"
import AnimatedCard from "../components/AnimatedCard"

const contactInfo = [
  {
    icon: FaPhone,
    title: "Phone",
    details: ["+91 98765 43210", "+91 87654 32109"],
  },
  {
    icon: FaEnvelope,
    title: "Email",
    details: ["info@samarthpharma.com", "orders@samarthpharma.com"],
  },
  {
    icon: FaMapMarkerAlt,
    title: "Address",
    details: ["123 Samarth Plaza", "Divine Healthcare District, Blessed City 411001"],
  },
  {
    icon: FaClock,
    title: "Hours",
    details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
  },
]

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const toast = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting Samarth Pharma. We will get back to you with Swami Samarth's blessings.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    })
  }

  const handleWhatsAppContact = () => {
    const message =
      "नमस्कार Samarth Pharma, I would like to get more information about your blessed products and divine services."
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Container maxW="7xl" py={12}>
      {/* Header */}
      <VStack spacing={6} mb={12} textAlign="center">
        <HStack>
          <GradientText as="h1" fontSize="4xl" gradient="linear(to-r, saffron.600, saffron.800)" fontFamily="Poppins">
            Contact Service
          </GradientText>
        </HStack>
        <Text fontSize="xl" color="gray.600" maxW="3xl">
          Get in touch with our team for inquiries, orders, or support. We're here to
          help you with all your medical supply needs with Swami Samarth's grace.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
        {/* Contact Information */}
        <VStack spacing={8} align="stretch">
          <Box>
            <HStack mb={6}>
              <FaHeart size={24} color="#FF9800" />
              <Heading as="h2" size="lg" color="saffron.600" fontFamily="Poppins">
                Get in Touch
              </Heading>
            </HStack>
            <VStack spacing={6} align="stretch">
              {contactInfo.map((info, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <Box p={6} bg="white" borderRadius="2xl" border="2px solid" borderColor="spiritual.200">
                    <HStack spacing={4} align="start">
                      <Box
                        w={12}
                        h={12}
                        bg="linear-gradient(135deg, #FF9800, #FF6F00)"
                        borderRadius="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        shadow="lg"
                      >
                        <Icon as={info.icon} w={5} h={5} color="white" />
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold" color="saffron.600" fontSize="lg">
                          {info.title}
                        </Text>
                        {info.details.map((detail, idx) => (
                          <Text key={idx} color="gray.600" fontSize="sm">
                            {detail}
                          </Text>
                        ))}
                      </VStack>
                    </HStack>
                  </Box>
                </AnimatedCard>
              ))}
            </VStack>
          </Box>

          {/* Quick Contact Buttons */}
          <VStack spacing={4}>
            <Button
              leftIcon={<FaWhatsapp />}
              colorScheme="whatsapp"
              size="lg"
              w="full"
              onClick={handleWhatsAppContact}
              shadow="lg"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "xl",
              }}
            >
              WhatsApp Service
            </Button>
            <Button
              as="a"
              href="tel:+919876543210"
              leftIcon={<FaPhone />}
              variant="spiritual"
              size="lg"
              w="full"
              shadow="lg"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "xl",
              }}
            >
              Call Service
            </Button>
          </VStack>
        </VStack>

        {/* Contact Form */}
        <AnimatedCard>
          <Box p={8} bg="white" borderRadius="2xl" border="2px solid" borderColor="spiritual.200">
            <HStack mb={6}>
              <Heading as="h2" size="lg" color="saffron.600" fontFamily="Poppins">
                Send us a Message
              </Heading>
            </HStack>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="semibold">
                      Name
                    </FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      border="2px solid"
                      borderColor="spiritual.200"
                      _focus={{ borderColor: "saffron.400" }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="semibold">
                      Email
                    </FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      border="2px solid"
                      borderColor="spiritual.200"
                      _focus={{ borderColor: "saffron.400" }}
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                  <FormControl>
                    <FormLabel color="gray.700" fontWeight="semibold">
                      Phone
                    </FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your contact"
                      border="2px solid"
                      borderColor="spiritual.200"
                      _focus={{ borderColor: "saffron.400" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.700" fontWeight="semibold">
                      Company
                    </FormLabel>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your organization"
                      border="2px solid"
                      borderColor="spiritual.200"
                      _focus={{ borderColor: "saffron.400" }}
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="semibold">
                    Message
                  </FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    border="2px solid"
                    borderColor="spiritual.200"
                    _focus={{ borderColor: "saffron.400" }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  variant="spiritual"
                  size="lg"
                  w="full"
                  leftIcon={<FaHeart />}
                  shadow="lg"
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "xl",
                  }}
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>
        </AnimatedCard>
      </SimpleGrid>

      {/* Map Section */}
      <Box mt={12}>
        <VStack spacing={6} mb={8}>
          <HStack>
            <GradientText
              as="h2"
              fontSize="2xl"
              textAlign="center"
              gradient="linear(to-r, saffron.600, saffron.800)"
              fontFamily="Poppins"
            >
              Our Location
            </GradientText>
          </HStack>
        </VStack>
        <Box borderRadius="2xl" overflow="hidden" h="400px" border="3px solid" borderColor="saffron.200" shadow="xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959729807!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Samarth Pharma Location"
          />
        </Box>
      </Box>

      {/* Spiritual Quote */}
      <Box
        mt={12}
        p={8}
        bg="spiritual.100"
        borderRadius="3xl"
        textAlign="center"
        border="2px solid"
        borderColor="saffron.200"
      >
        <VStack spacing={4}>
          <FaOm size={50} color="#FF9800" />
          <Text fontSize="xl" color="saffron.700" fontStyle="italic" fontFamily="Poppins">
            "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"
          </Text>
          <Text fontSize="md" color="gray.600">
            May all beings be happy, may all beings be healthy
          </Text>
          <Text fontSize="sm" color="saffron.600" fontWeight="medium">
            - Our divine mission guided by Shri Swami Samarth
          </Text>
        </VStack>
      </Box>
    </Container>
  )
}

export default Contact
