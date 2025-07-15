"use client"

import type React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Image,
  Flex,
  HStack,
  CardBody,
  Avatar,
  Badge,
  Divider,
  Card,
} from "@chakra-ui/react"
import { FaAward, FaUsers, FaGlobe, FaClock, FaOm, FaHeart, FaLeaf, FaPray, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"
import { motion } from "framer-motion"
import GradientText from "../components/GradientText"
import AnimatedCard from "../components/AnimatedCard"

const MotionBox = motion(Box)
const MotionCard = motion(Card)

const stats = [
  { label: "Years of Blessed Service", value: "15+", icon: FaClock },
  { label: "Happy Customers", value: "500+", icon: FaUsers },
  { label: "Products Available", value: "1000+", icon: FaGlobe },
  { label: "Certifications", value: "10+", icon: FaAward },
]

const values = [
  {
    title: "Quality First",
    description:
      "We ensure all products meet the highest pharmaceutical standards blessed with divine grace and spiritual care.",
    icon: FaOm,
  },
  {
    title: "Customer Care",
    description:
      "Our customers are blessed souls at the heart of everything we do, providing personalized spiritual service.",
    icon: FaHeart,
  },
  {
    title: "Reliability",
    description: "Consistent blessed supply chain and divine timing delivery you can trust with Swami Samarth's grace.",
    icon: FaPray,
  },
  {
    title: "Innovation",
    description: "Continuously improving our blessed processes and expanding our divine product range with devotion.",
    icon: FaLeaf,
  },
]

const founders = [
  {
    name: "Dr. Nikhil Rote",
    position: "Founder & CEO",
    image: "/images/ceo.jpg",
    description: "A devoted follower of Shri Swami Samarth with 20+ years in pharmaceutical industry. Dr. Rajesh founded Samarth Pharma with the divine vision of serving humanity through quality healthcare.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "nikhil@samarthpharma.com"
    }
  },
  {
    name: "Mr. Nikhil Dike",
    position: "Co-Founder & COO",
    image: "/images/ceo.jpg",
    description: "A blessed soul with expertise in operations and supply chain management. She ensures that every product reaches customers with divine care and precision.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "nikhil@samarthpharma.com"
    }
  },
  {
    name: "Mr. Krushna Dike",
    position: "Chief Technology Officer",
    image: "/images/tech_leader.jpg",
    description: "Technology leader blessed with innovative vision. He integrates modern technology with traditional values to create seamless customer experiences.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "krushna@samarthpharma.com"
    }
  }
]

const About: React.FC = () => {
  return (
    <Container maxW="7xl" py={12}>
      {/* Hero Section */}
      <Flex direction={{ base: "column", lg: "row" }} align="center" gap={12} mb={16}>
        <VStack align="start" flex={1} spacing={6}>
          <HStack>
            <GradientText as="h1" fontSize="4xl" gradient="linear(to-r, saffron.600, saffron.800)" fontFamily="Poppins">
              About Samarth Pharma
            </GradientText>
          </HStack>
          <Text fontSize="lg" color="gray.600" lineHeight="tall">
            Founded in 2008 with the divine blessings of Shri Swami Samarth, Samarth Pharma has been a blessed partner
            in the healthcare industry. We provide high-quality pharmaceutical products to hospitals, clinics, and
            pharmacies across the region with spiritual devotion and divine care.
          </Text>
          <Text fontSize="lg" color="gray.600" lineHeight="tall">
            We specialize in sourcing and distributing a comprehensive range of medicines, medical devices, and
            healthcare products from certified manufacturers worldwide, all blessed with divine grace. Our
            state-of-the-art warehouse and cold chain facilities ensure product integrity from storage to delivery with
            Swami Samarth's blessings.
          </Text>
          <Box p={4} bg="spiritual.100" borderRadius="xl" border="2px solid" borderColor="saffron.200">
            <Text fontSize="md" color="saffron.700" fontStyle="italic" textAlign="center">
              "श्री स्वामी समर्थ कृपा से सेवा" <br />
              <Text fontSize="sm" mt={1}>
                Serving with the grace of Shri Swami Samarth
              </Text>
            </Text>
          </Box>
        </VStack>
        <Box flex={1}>
          <MotionBox whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ duration: 0.3 }} position="relative">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
              alt="Samarth Pharma blessed facility"
              borderRadius="2xl"
              shadow="2xl"
              border="4px solid"
              borderColor="saffron.200"
            />
            <Box
              position="absolute"
              top="-10px"
              right="-10px"
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
              <FaOm size={24} color="white" />
            </Box>
          </MotionBox>
        </Box>
      </Flex>

      {/* Stats Section */}
      <Box bg="spiritual.50" borderRadius="3xl" p={8} mb={16} border="2px solid" borderColor="saffron.200">
        <VStack spacing={8}>
          <HStack>
            <GradientText
              as="h2"
              fontSize="3xl"
              textAlign="center"
              gradient="linear(to-r, saffron.600, saffron.800)"
              fontFamily="Poppins"
            >
              Our Impact
            </GradientText>
          </HStack>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} w="full">
            {stats.map((stat, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <VStack textAlign="center" p={6} spacing={4}>
                  <Box
                    w={16}
                    h={16}
                    bg="linear-gradient(135deg, #FF9800, #FF6F00)"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    shadow="lg"
                  >
                    <Icon as={stat.icon} w={6} h={6} color="white" />
                  </Box>
                  <Stat>
                    <StatNumber fontSize="3xl" color="saffron.600" fontFamily="Poppins">
                      {stat.value}
                    </StatNumber>
                    <StatLabel fontSize="sm" color="gray.600" fontWeight="medium">
                      {stat.label}
                    </StatLabel>
                  </Stat>
                </VStack>
              </AnimatedCard>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Mission & Vision */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} mb={16}>
        <AnimatedCard>
          <Box p={8} h="full">
            <HStack mb={4}>
              <FaHeart size={24} color="#FF9800" />
              <Heading as="h3" size="lg" color="saffron.600" fontFamily="Poppins">
                Our Mission
              </Heading>
            </HStack>
            <Text color="gray.600" lineHeight="tall">
              To provide healthcare professionals with blessed access to high-quality pharmaceutical products and
              medical supplies, enabling them to deliver divine care to their patients. We strive to be the most trusted
              spiritual partner in the healthcare supply chain, serving with Swami Samarth's grace.
            </Text>
          </Box>
        </AnimatedCard>
        <AnimatedCard>
          <Box p={8} h="full">
            <HStack mb={4}>
              <FaOm size={24} color="#FF9800" />
              <Heading as="h3" size="lg" color="saffron.600" fontFamily="Poppins">
                Our Vision
              </Heading>
            </HStack>
            <Text color="gray.600" lineHeight="tall">
              To become the leading blessed medical wholesaler in the region, known for our commitment to divine
              quality, spiritual innovation, and devotional customer service. We envision a future where healthcare
              providers have seamless access to blessed products needed to save lives and improve health outcomes.
            </Text>
          </Box>
        </AnimatedCard>
      </SimpleGrid>

      {/* Values Section */}
      <Box>
        <VStack spacing={8} mb={12}>
          <HStack>
            <GradientText
              as="h2"
              fontSize="3xl"
              textAlign="center"
              gradient="linear(to-r, saffron.600, saffron.800)"
              fontFamily="Poppins"
            >
              Our Values
            </GradientText>
          </HStack>
          <Text fontSize="lg" color="gray.600" textAlign="center" maxW="3xl">
            Guided by the divine teachings of Shri Swami Samarth, our values reflect spiritual devotion and blessed
            service.
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {values.map((value, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <Box
                p={8}
                bg="white"
                borderRadius="2xl"
                shadow="lg"
                border="2px solid"
                borderColor="spiritual.200"
                position="relative"
              >
                <Box
                  position="absolute"
                  top="-15px"
                  left="30px"
                  w={12}
                  h={12}
                  bg="linear-gradient(135deg, #FF9800, #FF6F00)"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  shadow="lg"
                  border="3px solid white"
                >
                  <Icon as={value.icon} w={5} h={5} color="white" />
                </Box>
                <Box pt={4}>
                  <Heading as="h4" size="md" mb={3} color="saffron.600" fontFamily="Poppins">
                    {value.title}
                  </Heading>
                  <Text color="gray.600" lineHeight="tall">
                    {value.description}
                  </Text>
                </Box>
              </Box>
            </AnimatedCard>
          ))}
        </SimpleGrid>
      </Box>

      {/* Founders Section */}
      <Box mt={16} p={8} bg="white" borderRadius="3xl" border="2px solid" borderColor="saffron.200">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          mb={16}
        >
          <VStack spacing={8}>
            <VStack textAlign="center" spacing={4}>
              <Heading as="h2" size="xl" color="orange.600">
                Our Team
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="3xl">
                Meet the team who founded Samarth Pharma with Shri Swami Samarth's blessings,
                dedicated to serving humanity through quality healthcare.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {founders.map((founder, index) => (
                <MotionCard
                  key={index}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  bg="white"
                  shadow="xl"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="orange.100"
                  overflow="hidden"
                >
                  <CardBody p={0}>
                    <VStack spacing={4} p={6} align="center">
                      <VStack spacing={1} textAlign="center">
                        <Avatar
                          size="2xl"
                          shadow={"md"}
                          src={founder.image}
                          name={founder.name}
                          mx="auto"
                          mt={6}
                        />
                        <Heading as="h4" size="md" color="orange.600">
                          {founder.name}
                        </Heading>
                        <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                          {founder.position}
                        </Badge>
                      </VStack>

                      <Text color="gray.600" textAlign="center" fontSize="sm" lineHeight="tall">
                        {founder.description}
                      </Text>

                      <Divider />

                      <HStack spacing={4}>
                        <Icon as={FaLinkedin} color="blue.500" cursor="pointer" _hover={{ color: "blue.600" }} />
                        <Icon as={FaTwitter} color="blue.400" cursor="pointer" _hover={{ color: "blue.500" }} />
                        <Icon as={FaEnvelope} color="orange.500" cursor="pointer" _hover={{ color: "orange.600" }} />
                      </HStack>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </VStack>
        </MotionBox>
      </Box>

      {/* Spiritual Quote Section */}
      <Box
        mt={16}
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
            - Ancient Sanskrit Prayer, guiding our mission
          </Text>
        </VStack>
      </Box>
    </Container>
  )
}

export default About
