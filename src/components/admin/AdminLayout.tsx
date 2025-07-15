"use client"

import type React from "react"
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import {
  FaHome,
  FaBoxes,
  FaShoppingCart,
  FaFileInvoice,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
} from "react-icons/fa"
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom"
import { useAdmin } from "../../context/AdminContext"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAdmin()
  const location = useLocation()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const sidebarBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  const menuItems = [
    { name: "Dashboard", icon: FaHome, path: "/admin/dashboard" },
    { name: "Products", icon: FaBoxes, path: "/admin/products" },
    { name: "Orders", icon: FaShoppingCart, path: "/admin/orders" },
    { name: "Invoices", icon: FaFileInvoice, path: "/admin/invoices" },
  ]

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const SidebarContent = () => (
    <VStack spacing={0} align="stretch" h="full">
      {/* Logo */}
      <Box p={6} borderBottom="1px" borderColor={borderColor}>
        <HStack spacing={3}>
          <Box
            w={10}
            h={10}
            bg="brand.500"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontWeight="bold" fontSize="lg">
              R
            </Text>
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold" fontSize="lg" color="gray.800">
              RoteMed
            </Text>
            <Text fontSize="xs" color="gray.500">
              Admin Panel
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* Navigation */}
      <VStack spacing={1} p={4} flex={1}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <MotionBox key={item.name} w="full" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Button
                as={RouterLink}
                to={item.path}
                leftIcon={<item.icon />}
                variant={isActive ? "solid" : "ghost"}
                colorScheme={isActive ? "brand" : "gray"}
                justifyContent="flex-start"
                w="full"
                h={12}
                fontSize="sm"
                fontWeight={isActive ? "semibold" : "normal"}
                _hover={{
                  bg: isActive ? "brand.600" : "gray.100",
                }}
              >
                {item.name}
              </Button>
            </MotionBox>
          )
        })}
      </VStack>

      {/* User Profile */}
      <Box p={4} borderTop="1px" borderColor={borderColor}>
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            w="full"
            h={12}
            justifyContent="space-between"
            rightIcon={<FaChevronDown />}
          >
            <HStack>
              <Avatar size="sm" name={user?.name} />
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="semibold">
                  {user?.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {user?.role}
                </Text>
              </VStack>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FaCog />}>Settings</MenuItem>
            <MenuDivider />
            <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </VStack>
  )

  return (
    <Flex h="100vh" bg="gray.50">
      {/* Desktop Sidebar */}
      <Box
        w="280px"
        bg={sidebarBg}
        borderRight="1px"
        borderColor={borderColor}
        display={{ base: "none", lg: "block" }}
        position="fixed"
        h="full"
        zIndex={10}
      >
        <SidebarContent />
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box flex={1} ml={{ base: 0, lg: "280px" }}>
        {/* Mobile Header */}
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          px={4}
          bg={sidebarBg}
          borderBottom="1px"
          borderColor={borderColor}
          display={{ base: "flex", lg: "none" }}
        >
          <IconButton aria-label="Open menu" icon={<FaBars />} variant="ghost" onClick={onOpen} />
          <Text fontWeight="bold" fontSize="lg">
            RoteMed Admin
          </Text>
          <Avatar size="sm" name={user?.name} />
        </Flex>

        {/* Page Content */}
        <Box h={{ base: "calc(100vh - 64px)", lg: "100vh" }} overflowY="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default AdminLayout
