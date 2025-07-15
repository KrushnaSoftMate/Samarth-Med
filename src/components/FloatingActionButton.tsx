"use client"

import type React from "react"
import { IconButton, useColorModeValue, Tooltip, Box } from "@chakra-ui/react"
import { FaWhatsapp, FaArrowUp, FaOm } from "react-icons/fa"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useState, useEffect } from "react"

const MotionIconButton = motion(IconButton)
const MotionBox = motion(Box)

const FloatingActionButton: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const whatsappBg = useColorModeValue("whatsapp.500", "whatsapp.600")
  const scrollBg = useColorModeValue("saffron.500", "saffron.600")

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openWhatsApp = () => {
    const message = "नमस्कार Samarth Pharma! I'm interested in your blessed medical products with divine service."
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  const whatsappVariants: Variants = {
    hidden: {
      scale: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      scale: 1,
      transition: {
        delay: 1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  }

  const scrollVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  }

  const omVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  return (
    <div className="no-print">
      {/* Floating Om Symbol */}
      <MotionBox
        position="fixed"
        bottom="32"
        right="6"
        zIndex={999}
        variants={omVariants}
        animate="animate"
        opacity={0.1}
      >
        <FaOm size={60} color="#FF9800" />
      </MotionBox>

      {/* WhatsApp Button */}
      <Tooltip label="Divine WhatsApp Service" placement="left">
        <MotionIconButton
          aria-label="WhatsApp Divine Service"
          icon={<FaWhatsapp />}
          size="lg"
          colorScheme="whatsapp"
          bg={whatsappBg}
          position="fixed"
          bottom="6"
          right="6"
          borderRadius="full"
          shadow="2xl"
          zIndex={1000}
          onClick={openWhatsApp}
          variants={whatsappVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          border="3px solid"
          borderColor="white"
          _hover={{
            bg: "whatsapp.600",
            transform: "translateY(-2px)",
            shadow: "2xl",
          }}
        />
      </Tooltip>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <Tooltip label="Scroll to divine top" placement="left">
            <MotionIconButton
              aria-label="Scroll to top"
              icon={<FaArrowUp />}
              size="md"
              bg={scrollBg}
              color="white"
              position="fixed"
              bottom="24"
              right="6"
              borderRadius="full"
              shadow="xl"
              zIndex={1000}
              onClick={scrollToTop}
              variants={scrollVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              border="2px solid"
              borderColor="white"
              _hover={{
                bg: "saffron.600",
                transform: "translateY(-2px)",
                shadow: "xl",
              }}
            />
          </Tooltip>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingActionButton
