"use client"

import type React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Icon,
  Stack,
  Flex,
  Image,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { FaShieldAlt, FaTruck, FaUserMd, FaWhatsapp, FaDownload, FaPlay, FaOm, FaHeart } from "react-icons/fa"
import { Link as RouterLink } from "react-router-dom"
import { motion, type Variants } from "framer-motion"
import AnimatedCard from "../components/AnimatedCard"
import GradientText from "../components/GradientText"
import CountUpAnimation from "../components/CountUpAnimation"

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

const features = [
  {
    icon: FaShieldAlt,
    title: "Quality Assurance",
    description: "All products blessed with quality checks and sourced from certified manufacturers.",
    color: "saffron.500",
  },
  {
    icon: FaTruck,
    title: "Swift Delivery",
    description:
      "Quick and reliable delivery across regions with temperature-controlled transport.",
    color: "sacred.500",
  },
  {
    icon: FaUserMd,
    title: "Expert Support",
    description: "Professional pharmaceutical guidance with spiritual care from our experienced team.",
    color: "divine.500",
  },
]

const stats = [
  { label: "Blessed Customers", value: 500, suffix: "+" },
  { label: "Divine Products", value: 1000, suffix: "+" },
  { label: "Years of Service", value: 15, suffix: "+" },
  { label: "Cities Served", value: 25, suffix: "+" },
]

const Home: React.FC = () => {
  const bgGradient = useColorModeValue(
    "linear(135deg, saffron.400 0%, spiritual.500 50%, saffron.600 100%)",
    "linear(135deg, saffron.600 0%, spiritual.600 50%, saffron.700 100%)",
  )

  const handleDownloadCatalog = () => {
    const link = document.createElement("a")
    link.href =
      "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKFNhbWFydGggUGhhcm1hIFByb2R1Y3QgQ2F0YWxvZykKPj4KZW5kb2JqCnRyYWlsZXIKPDwKL1NpemUgMQovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKOQolJUVPRg=="
    link.download = "samarth-pharma-catalog.pdf"
    link.click()
  }

  const heroVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const heroContentVariants: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  const heroImageVariants: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    hover: { scale: 1.05, rotateY: 5 },
  }

  const textVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const buttonVariants: Variants = {
    hover: {
      y: -2,
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  }

  const iconHoverVariants: Variants = {
    hover: { rotate: 360, scale: 1.1 },
  }

  const featureBoxVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <Box>
      {/* Hero Section with Spiritual Background */}
      <Box
        bgGradient={bgGradient}
        color="white"
        minH="100vh"
        display="flex"
        alignItems="center"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgImage:
            "radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          zIndex: 1,
        }}
      >
        {/* Floating Om Symbols */}
        <MotionBox
          position="absolute"
          top="10%"
          right="10%"
          opacity={0.1}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <FaOm size={100} />
        </MotionBox>
        <MotionBox
          position="absolute"
          bottom="20%"
          left="5%"
          opacity={0.1}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <FaOm size={80} />
        </MotionBox>

        <Container maxW="7xl" position="relative" zIndex={2}>
          <MotionFlex align="center" justify="space-between" direction={{ base: "column", lg: "row" }} gap={12}>
            <MotionBox
              flex={1}
              textAlign={{ base: "center", lg: "left" }}
              variants={heroContentVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HStack justify={{ base: "center", lg: "flex-start" }} mb={4}>
                <FaOm size={40} color="#FFE082" />
                <Text fontSize="lg" color="spiritual.200" fontWeight="medium">
                  श्री स्वामी समर्थ कृपा
                </Text>
              </HStack>

              <GradientText
                as="h1"
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                mb={6}
                lineHeight="shorter"
                gradient="linear(to-r, white, spiritual.100)"
                fontFamily="Poppins"
              >
                Your Blessed Medical Partner
              </GradientText>

              <MotionBox
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Text fontSize={{ base: "lg", md: "xl" }} mb={8} opacity={0.9} maxW="600px">
                  Samarth Pharma provides divine quality pharmaceutical products with blessed service and spiritual care
                  for healthcare providers across the region. Serving with devotion since years.
                </Text>
              </MotionBox>

              <MotionBox
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                  <MotionButton
                    as={RouterLink}
                    to="/products"
                    size="lg"
                    variant="spiritual"
                    leftIcon={<FaPlay />}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    shadow="xl"
                  >
                    Explore Products
                  </MotionButton>
                  <MotionButton
                    as="a"
                    href="https://wa.me/9325638959?text=नमस्कार%20Samarth%20Pharma,%20I%20would%20like%20to%20inquire%20about%20your%20blessed%20products"
                    target="_blank"
                    size="lg"
                    leftIcon={<FaWhatsapp />}
                    colorScheme="whatsapp"
                    variant="solid"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    shadow="xl"
                  >
                    WhatsApp Order
                  </MotionButton>
                </Stack>
              </MotionBox>
            </MotionBox>

            <MotionBox
              flex={1}
              display={{ base: "none", lg: "block" }}
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Box position="relative">
                <Image
                  src="/images/hero-medical.jpg"
                  alt="Divine Medical supplies"
                  borderRadius="3xl"
                  shadow="2xl"
                  border="4px solid"
                  borderColor="whiteAlpha.300"
                />
                <Box
                  position="absolute"
                  top="-10px"
                  right="-10px"
                  w={16}
                  h={16}
                  bg="spiritual.400"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  shadow="xl"
                >
                  <FaOm size={24} color="white" />
                </Box>
              </Box>
            </MotionBox>
          </MotionFlex>
        </Container>
      </Box>

      {/* Stats Section with Spiritual Design */}
      <Box py={16} bg="white" position="relative" overflow="hidden">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage="radial-gradient(circle at 50% 50%, rgba(255, 152, 0, 0.05) 0%, transparent 70%)"
        />
        <Container maxW="7xl" position="relative">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <AnimatedCard key={index} delay={index * 0.1} hover={false}>
                <VStack p={6} textAlign="center" spacing={3}>
                  <CountUpAnimation
                    value={stat.value}
                    suffix={stat.suffix}
                    fontSize="3xl"
                    fontWeight="bold"
                    color="saffron.600"
                  />
                  <Text color="gray.600" fontWeight="medium" fontSize="sm">
                    {stat.label}
                  </Text>
                </VStack>
              </AnimatedCard>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section with Spiritual Theme */}
      <Box py={20} bg="spiritual.50" position="relative">
        <Container maxW="7xl">
          <MotionBox
            textAlign="center"
            mb={16}
            variants={featureBoxVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <HStack justify="center" mb={4}>
              <GradientText
                as="h2"
                fontSize="4xl"
                gradient="linear(to-r, saffron.600, saffron.800)"
                fontFamily="Poppins"
              >
                Why Choose Samarth Pharma?
              </GradientText>
            </HStack>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              We serve with divine blessings, providing the highest quality medical products with spiritual care,
              exceptional service and blessed pricing.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={index * 0.2}>
                <VStack p={8} textAlign="center" spacing={6} bg="white" borderRadius="2xl" position="relative">
                  <Box
                    position="absolute"
                    top="-20px"
                    left="50%"
                    transform="translateX(-50%)"
                    w={16}
                    h={16}
                    bg="linear-gradient(135deg, #FF9800, #FF6F00)"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    shadow="xl"
                    border="4px solid white"
                  >
                    <MotionBox variants={iconHoverVariants} whileHover="hover" transition={{ duration: 0.6 }}>
                      <Icon as={feature.icon} w={6} h={6} color="white" />
                    </MotionBox>
                  </Box>

                  <Box pt={6}>
                    <Heading as="h3" size="lg" color="gray.800" mb={4} fontFamily="Poppins">
                      {feature.title}
                    </Heading>

                    <Text color="gray.600" lineHeight="tall">
                      {feature.description}
                    </Text>
                  </Box>
                </VStack>
              </AnimatedCard>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section with Divine Theme */}
      <Box bg="white" py={20}>
        <Container maxW="7xl">
          <AnimatedCard hover={false}>
            <Box
              bgGradient="linear(135deg, saffron.500, spiritual.500, saffron.600)"
              color="white"
              p={12}
              textAlign="center"
              borderRadius="3xl"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgImage: "radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
              }}
            >
              <VStack spacing={6} position="relative">
                <HStack>
                  <GradientText
                    as="h2"
                    fontSize="3xl"
                    gradient="linear(to-r, white, spiritual.100)"
                    fontFamily="Poppins"
                  >
                    Ready to Experience Divine Service?
                  </GradientText>
                </HStack>

                <Text fontSize="xl" opacity={0.9} maxW="2xl">
                  Contact us today for blessed pricing, divine quality and spiritual service. Let Swami Samarth's
                  blessings guide your healthcare journey.
                </Text>

                <Stack direction={{ base: "column", sm: "row" }} spacing={4} justify="center">
                  <MotionButton
                    as={RouterLink}
                    to="/contact"
                    size="lg"
                    colorScheme="whiteAlpha"
                    variant="solid"
                    leftIcon={<FaHeart />}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    shadow="xl"
                  >
                    Contact Us
                  </MotionButton>

                  <MotionButton
                    leftIcon={<FaDownload />}
                    size="lg"
                    variant="outline"
                    colorScheme="whiteAlpha"
                    onClick={handleDownloadCatalog}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    shadow="xl"
                  >
                    Download Catalog
                  </MotionButton>
                </Stack>

                <Text fontSize="sm" opacity={0.8} fontStyle="italic">
                  "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः" - May all be happy, may all be healthy
                </Text>
              </VStack>
            </Box>
          </AnimatedCard>
        </Container>
      </Box>
    </Box>
  )
}

// Create motion components
const MotionButton = motion(Button)

export default Home
