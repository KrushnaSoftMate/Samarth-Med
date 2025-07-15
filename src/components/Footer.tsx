import type React from "react"
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Heading,
  useColorModeValue,
  HStack,
  Icon,
  Divider,
  VStack,
} from "@chakra-ui/react"
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaOm,
  FaHeart,
} from "react-icons/fa"
import { Link as RouterLink } from "react-router-dom"

const Footer: React.FC = () => {
  const bg = useColorModeValue("spiritual.100", "gray.900")
  const color = useColorModeValue("gray.700", "gray.200")

  return (
    <Box bg={bg} color={color} mt="auto" borderTop="2px solid" borderColor="saffron.300">
      <Container as={Stack} maxW="7xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {/* Company Info */}
          <Stack spacing={6}>
            <Box>
              <HStack mb={3}>
                <Box
                  w={10}
                  h={10}
                  bg="linear-gradient(135deg, #FF9800, #FF6F00)"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  shadow="lg"
                >
                  <FaOm color="white" size={20} />
                </Box>
                <VStack align="start" spacing={0}>
                  <Heading size="md" color="saffron.600" fontFamily="Poppins">
                    Samarth Pharma
                  </Heading>
                  <Text fontSize="xs" color="saffron.500" fontWeight="medium">
                    श्री स्वामी समर्थ कृपा
                  </Text>
                </VStack>
              </HStack>
              <Text fontSize="sm" lineHeight="tall">
                Your blessed medical wholesaler providing divine quality pharmaceutical products with spiritual service
                and devotional care.
              </Text>
            </Box>
            <Stack direction="row" spacing={6}>
              <Link href="https://facebook.com" isExternal>
                <Icon as={FaFacebook} w={5} h={5} color="blue.500" _hover={{ color: "saffron.500" }} />
              </Link>
              <Link href="https://twitter.com" isExternal>
                <Icon as={FaTwitter} w={5} h={5} color="blue.400" _hover={{ color: "saffron.500" }} />
              </Link>
              <Link href="https://instagram.com" isExternal>
                <Icon as={FaInstagram} w={5} h={5} color="pink.500" _hover={{ color: "saffron.500" }} />
              </Link>
              <Link href="https://linkedin.com" isExternal>
                <Icon as={FaLinkedin} w={5} h={5} color="blue.600" _hover={{ color: "saffron.500" }} />
              </Link>
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={6}>
            <Text fontWeight="600" color="saffron.600" fontSize="lg">
              Sacred Links
            </Text>
            <Stack spacing={3}>
              <Link as={RouterLink} to="/" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Home
              </Link>
              <Link as={RouterLink} to="/about" fontSize="sm" _hover={{ color: "saffron.600" }}>
                About Us
              </Link>
              <Link as={RouterLink} to="/products" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Divine Products
              </Link>
              <Link as={RouterLink} to="/contact" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Contact
              </Link>
            </Stack>
          </Stack>

          {/* Services */}
          <Stack spacing={6}>
            <Text fontWeight="600" color="saffron.600" fontSize="lg">
              Blessed Services
            </Text>
            <Stack spacing={3}>
              <Link as={RouterLink} to="/cart" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Sacred Cart
              </Link>
              <Link href="#" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Bulk Divine Orders
              </Link>
              <Link href="#" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Prescription Services
              </Link>
              <Link href="#" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Spiritual Consultation
              </Link>
            </Stack>
          </Stack>

          {/* Contact Info */}
          <Stack spacing={6}>
            <Text fontWeight="600" color="saffron.600" fontSize="lg">
              Divine Contact
            </Text>
            <Stack spacing={3}>
              <HStack>
                <Icon as={FaPhone} color="saffron.500" />
                <Text fontSize="sm">+91 98765 43210</Text>
              </HStack>
              <HStack>
                <Icon as={FaEnvelope} color="saffron.500" />
                <Text fontSize="sm">info@samarthpharma.com</Text>
              </HStack>
              <HStack align="start">
                <Icon as={FaMapMarkerAlt} color="saffron.500" mt={1} />
                <Text fontSize="sm">
                  123 Samarth Plaza
                  <br />
                  Divine Healthcare District
                  <br />
                  Blessed City 411001
                </Text>
              </HStack>
              <Link
                href="https://wa.me/919876543210"
                isExternal
                color="whatsapp.500"
                fontSize="sm"
                display="flex"
                alignItems="center"
                gap={2}
                _hover={{ color: "saffron.600" }}
              >
                <Icon as={FaWhatsapp} />
                WhatsApp Divine Service
              </Link>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Divider borderColor="saffron.300" />

      <Container maxW="7xl">
        <VStack py={6} spacing={4}>
          <HStack spacing={4} direction={{ base: "column", md: "row" }}>
            <Text fontSize="sm" textAlign="center">
              © 2024 Samarth Pharma. All rights blessed and reserved.
            </Text>
            <HStack spacing={4}>
              <Link href="#" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Privacy Policy
              </Link>
              <Link href="#" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Terms of Service
              </Link>
              <Link href="#" fontSize="sm" _hover={{ color: "saffron.600" }}>
                Sacred Cookie Policy
              </Link>
            </HStack>
          </HStack>

          <HStack spacing={2}>
            <Text fontSize="sm" color="saffron.600" fontStyle="italic">
              Made with
            </Text>
            <FaHeart color="#FF9800" size={12} />
            <Text fontSize="sm" color="saffron.600" fontStyle="italic">
              and divine blessings of Shri Swami Samarth
            </Text>
          </HStack>

          <Text fontSize="xs" color="saffron.500" fontStyle="italic" textAlign="center">
            "श्री स्वामी समर्थ महाराज की जय" - Victory to Shri Swami Samarth Maharaj
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer
