import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";

const theme = extendTheme({
  fonts: {
    heading: "Roboto, sans-serif",
    body: "Open Sans, sans-serif",
  },
});

const MotionBox = motion(Box);

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          p={4}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </MotionBox>
      </Router>
    </ChakraProvider>
  );
};

export default App;