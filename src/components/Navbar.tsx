"use client"

import type React from "react"
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Badge,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { FaShoppingCart, FaUserShield, FaOm } from "react-icons/fa"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAdmin } from "../context/AdminContext"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useState, useEffect } from "react"

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
  { name: "Cart", href: "/cart" },
]

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrolled, setScrolled] = useState(false)
  const bg = useColorModeValue("rgba(255, 248, 225, 0.95)", "gray.800")
  const scrolledBg = useColorModeValue("rgba(255, 248, 225, 0.98)", "rgba(26, 32, 44, 0.95)")
  const borderColor = useColorModeValue("saffron.200", "gray.700")
  const hoverBg = useColorModeValue("spiritual.100", "gray.700")
  const location = useLocation()

  const { getCartCount } = useCart()
  const { user, isAuthenticated, logout } = useAdmin()
  const cartCount = getCartCount()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const logoVariants: Variants = {
    hover: { scale: 1.05, rotate: 5 },
    tap: { scale: 0.95 },
  }

  const omVariants: Variants = {
    hover: { rotate: 360, scale: 1.1 },
  }

  const linkVariants: Variants = {
    hover: { y: -2, color: "#FF9800" },
  }

  const badgeVariants: Variants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    exit: { scale: 0 },
    hover: { scale: 1.1 },
  }

  return (
    <MotionBox
      bg={scrolled ? scrolledBg : bg}
      backdropFilter="blur(20px)"
      borderBottom="2px solid"
      borderColor={scrolled ? "saffron.300" : borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      shadow={scrolled ? "xl" : "md"}
      transition={{ duration: 0.3 }}
    >
      <MotionFlex
        h={scrolled ? 16 : 20}
        alignItems="center"
        justifyContent="space-between"
        maxW="7xl"
        mx="auto"
        px={6}
        transition={{ duration: 0.3 }}
      >
        <HStack spacing={8} alignItems="center">
          <MotionBox
            as={RouterLink}
            to="/"
            display="flex"
            alignItems="center"
            gap={3}
            variants={logoVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <MotionBox
              w={scrolled ? 10 : 12}
              h={scrolled ? 10 : 12}
              bg="linear-gradient(135deg, #FF9800, #FF6F00)"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              shadow="lg"
              border="2px solid"
              borderColor="saffron.300"
              variants={omVariants}
              whileHover="hover"
              transition={{ duration: 0.6 }}
            >
              <FaOm color="white" size={scrolled ? 20 : 24} />
            </MotionBox>
            <Box>
              <Text
                fontSize={scrolled ? "xl" : "2xl"}
                fontWeight="bold"
                bgGradient="linear(to-r, saffron.600, saffron.800)"
                bgClip="text"
                fontFamily="Poppins"
              >
                Samarth Pharma
              </Text>
              <Text fontSize="xs" color="saffron.600" fontWeight="medium" mt={-1}>
                श्री स्वामी समर्थ कृपा
              </Text>
            </Box>
          </MotionBox>

          <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
            {navLinks.slice(0, -1).map((link) => (
              <MotionBox key={link.name} variants={linkVariants} whileHover="hover" transition={{ duration: 0.2 }}>
                <Link
                  as={RouterLink}
                  to={link.href}
                  px={4}
                  py={2}
                  rounded="xl"
                  color={location.pathname === link.href ? "saffron.600" : "gray.700"}
                  fontWeight={location.pathname === link.href ? "bold" : "semibold"}
                  position="relative"
                  fontSize="md"
                  _hover={{
                    textDecoration: "none",
                    bg: hoverBg,
                    color: "saffron.600",
                  }}
                  _after={
                    location.pathname === link.href
                      ? {
                        content: '""',
                        position: "absolute",
                        bottom: "0px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "30px",
                        height: "3px",
                        bg: "linear-gradient(to-r, #FF9800, #FF6F00)",
                        borderRadius: "full",
                      }
                      : {}
                  }
                >
                  {link.name}
                </Link>
              </MotionBox>
            ))}

            <MotionBox position="relative" variants={linkVariants} whileHover="hover">
              <Link
                as={RouterLink}
                to="/cart"
                px={4}
                py={2}
                rounded="xl"
                color={location.pathname === "/cart" ? "saffron.600" : "gray.700"}
                fontWeight={location.pathname === "/cart" ? "bold" : "semibold"}
                _hover={{
                  textDecoration: "none",
                  bg: hoverBg,
                  color: "saffron.600",
                }}
                display="flex"
                alignItems="center"
                gap={2}
                fontSize="md"
              >
                <FaShoppingCart />
                Cart
                <AnimatePresence>
                  {cartCount > 0 && (
                    <Badge
                      as={MotionBox}
                      colorScheme="red"
                      borderRadius="full"
                      fontSize="xs"
                      variants={badgeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover="hover"
                      bg="linear-gradient(135deg, #FF5722, #D32F2F)"
                      color="white"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </AnimatePresence>
              </Link>
            </MotionBox>
          </HStack>
        </HStack>

        <HStack spacing={4}>
          {/* Admin Menu */}
          {isAuthenticated ? (
            <Menu>
              <MenuButton
                as={IconButton}
                variant="ghost"
                icon={
                  <HStack>
                    <Avatar size="sm" name={user?.name} bg="saffron.500" />
                    <ChevronDownIcon />
                  </HStack>
                }
                display={{ base: "none", md: "flex" }}
                _hover={{ bg: hoverBg }}
              />
              <MenuList borderColor="saffron.200" shadow="xl">
                <MenuItem as={RouterLink} to="/admin/dashboard" icon={<FaUserShield />}>
                  Admin Dashboard
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link
              as={RouterLink}
              to="/admin/login"
              px={4}
              py={2}
              rounded="xl"
              color="gray.700"
              fontWeight="semibold"
              _hover={{
                textDecoration: "none",
                bg: hoverBg,
                color: "saffron.600",
              }}
              display={{ base: "none", md: "flex" }}
              alignItems="center"
              gap={2}
              fontSize="sm"
            >
              <FaUserShield />
              Admin
            </Link>
          )}

          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            color="saffron.600"
            _hover={{ bg: hoverBg }}
          />
        </HStack>
      </MotionFlex>

      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }} bg={bg} borderTop="1px" borderColor={borderColor}>
          <Stack as="nav" spacing={4} px={6}>
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                as={RouterLink}
                to={link.href}
                px={3}
                py={2}
                rounded="xl"
                color={location.pathname === link.href ? "saffron.600" : "gray.700"}
                fontWeight={location.pathname === link.href ? "bold" : "semibold"}
                _hover={{
                  textDecoration: "none",
                  bg: hoverBg,
                  color: "saffron.600",
                }}
                onClick={onClose}
                display="flex"
                alignItems="center"
                gap={2}
              >
                {link.name === "Cart" && <FaShoppingCart />}
                {link.name}
                {link.name === "Cart" && cartCount > 0 && (
                  <Badge colorScheme="red" borderRadius="full" fontSize="xs">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                as={RouterLink}
                to="/admin/login"
                px={3}
                py={2}
                rounded="xl"
                color="gray.700"
                _hover={{
                  textDecoration: "none",
                  bg: hoverBg,
                  color: "saffron.600",
                }}
                onClick={onClose}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <FaUserShield />
                Admin Login
              </Link>
            )}
          </Stack>
        </Box>
      </Collapse>
    </MotionBox>
  )
}

export default Navbar
