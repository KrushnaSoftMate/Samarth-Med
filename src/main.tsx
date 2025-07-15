import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { CartProvider } from "./context/CartContext"
import "./index.css"

const theme = extendTheme({
  colors: {
    whatsapp: {
      50: "#e2f7e1",
      100: "#b6eab5",
      200: "#89dd88",
      300: "#5dd05c",
      400: "#31c330",
      500: "#17aa16", // Primary WhatsApp green
      600: "#118511",
      700: "#0b600c",
      800: "#063b06",
      900: "#011600",
    },
    spiritual: {
      50: "#FFF8E1",
      100: "#FFECB3",
      200: "#FFE082",
      300: "#FFD54F",
      400: "#FFCA28",
      500: "#FFC107",
      600: "#FFB300",
      700: "#FF8F00",
      800: "#FF6F00",
      900: "#E65100",
    },
    saffron: {
      50: "#FFF3E0",
      100: "#FFE0B2",
      200: "#FFCC80",
      300: "#FFB74D",
      400: "#FFA726",
      500: "#FF9800",
      600: "#FB8C00",
      700: "#F57C00",
      800: "#EF6C00",
      900: "#E65100",
    },
    divine: {
      50: "#F3E5F5",
      100: "#E1BEE7",
      200: "#CE93D8",
      300: "#BA68C8",
      400: "#AB47BC",
      500: "#9C27B0",
      600: "#8E24AA",
      700: "#7B1FA2",
      800: "#6A1B9A",
      900: "#4A148C",
    },
    sacred: {
      50: "#E8F5E8",
      100: "#C8E6C8",
      200: "#A5D6A7",
      300: "#81C784",
      400: "#66BB6A",
      500: "#4CAF50",
      600: "#43A047",
      700: "#388E3C",
      800: "#2E7D32",
      900: "#1B5E20",
    },
    // Keep existing brand colors for admin
    brand: {
      50: "#E6F3FF",
      100: "#BAE3FF",
      200: "#7CC4FA",
      300: "#47A3F3",
      400: "#2B6CB0",
      500: "#2C5282",
      600: "#2A4365",
      700: "#1A365D",
      800: "#153E75",
      900: "#1A202C",
    },
    medical: {
      50: "#F0FFF4",
      100: "#C6F6D5",
      200: "#9AE6B4",
      300: "#68D391",
      400: "#48BB78",
      500: "#38A169",
      600: "#2F855A",
      700: "#276749",
      800: "#22543D",
      900: "#1C4532",
    },
  },
  fonts: {
    heading: "Poppins, Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "spiritual.50",
      },
      "*": {
        scrollBehavior: "smooth",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "semibold",
        borderRadius: "xl",
        transition: "all 0.3s ease",
      },
      variants: {
        solid: {
          _hover: {
            transform: "translateY(-2px)",
            shadow: "xl",
          },
        },
        spiritual: {
          bg: "linear-gradient(135deg, #FF9800, #FF6F00)",
          color: "white",
          _hover: {
            bg: "linear-gradient(135deg, #FB8C00, #E65100)",
            transform: "translateY(-2px)",
            shadow: "xl",
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "2xl",
          overflow: "hidden",
          transition: "all 0.3s ease",
          border: "1px solid",
          borderColor: "spiritual.200",
          _hover: {
            transform: "translateY(-4px)",
            shadow: "2xl",
            borderColor: "saffron.300",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "Poppins, sans-serif",
      },
    },
  },
})

const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error("Failed to find the root element")
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
