// minimal-blog-212250/frontend/src/components/Navbar.jsx

import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Container,
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const activeColor = useColorModeValue('blue.500', 'blue.300');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Write', path: '/write' },
    { label: 'About', path: '/about' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex h="70px" alignItems="center" justifyContent="space-between">
          <Text
            fontSize="2xl"
            fontWeight="500"
            color={textColor}
            letterSpacing="tight"
            cursor="pointer"
            onClick={() => navigate('/')}
            _hover={{ color: activeColor }}
            transition="color 0.2s"
          >
            Nordic Blog
          </Text>

          <HStack spacing={1}>
            {navItems.map((item) => (
              <Box
                key={item.path}
                px={4}
                py={2}
                borderRadius="8px"
                cursor="pointer"
                color={isActive(item.path) ? activeColor : textColor}
                fontWeight={isActive(item.path) ? '500' : '400'}
                bg={isActive(item.path) ? hoverBg : 'transparent'}
                _hover={{ bg: hoverBg }}
                transition="all 0.2s"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Box>
            ))}

            <IconButton
              aria-label="Toggle dark mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              borderRadius="8px"
              size="md"
              ml={2}
              _hover={{ bg: hoverBg }}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;