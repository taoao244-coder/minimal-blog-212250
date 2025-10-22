// minimal-blog-212250/frontend/src/App.jsx

import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme, Box, useColorMode } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Write from './pages/Write';
import About from './pages/About';
import { getTheme, saveTheme } from './utils/storage';

const theme = extendTheme({
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`
  },
  colors: {
    brand: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1'
    },
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  config: {
    initialColorMode: getTheme(),
    useSystemColorMode: false
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
        color: props.colorMode === 'light' ? 'gray.800' : 'gray.100'
      }
    })
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: '8px'
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'light' ? 'blue.500' : 'blue.400',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'light' ? 'blue.600' : 'blue.500'
          }
        })
      }
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: '8px'
        }
      }
    },
    Textarea: {
      baseStyle: {
        borderRadius: '8px'
      }
    }
  }
});

const ThemeSync = () => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    saveTheme(colorMode);
  }, [colorMode]);

  return null;
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ThemeSync />
        <Box minH="100vh">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/write" element={<Write />} />
            <Route path="/write/:id" element={<Write />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;