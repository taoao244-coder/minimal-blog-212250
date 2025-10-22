// minimal-blog-212250/frontend/src/pages/About.jsx

import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Avatar,
  HStack,
  Link,
  useColorModeValue,
  SimpleGrid,
  Icon
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaEnvelope, FaLinkedin } from 'react-icons/fa';

const About = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'gray.100');
  const linkColor = useColorModeValue('blue.500', 'blue.300');
  const iconBg = useColorModeValue('gray.100', 'gray.700');
  const iconHoverBg = useColorModeValue('blue.50', 'blue.900');

  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com', color: '#333' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com', color: '#1DA1F2' },
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: '#0077B5' },
    { icon: FaEnvelope, label: 'Email', url: 'mailto:hello@example.com', color: '#EA4335' }
  ];

  const skills = [
    'Frontend Development',
    'React',
    'JavaScript',
    'TypeScript',
    'UI/UX Design',
    'Markdown Writing'
  ];

  return (
    <Box bg={bgColor} minH="calc(100vh - 70px)" py={12}>
      <Container maxW="container.md">
        <VStack spacing={10} align="stretch">
          <Box
            bg={cardBg}
            borderRadius="16px"
            border="1px solid"
            borderColor={borderColor}
            p={8}
            textAlign="center"
          >
            <VStack spacing={6}>
              <Avatar
                size="2xl"
                name="Blogger"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
                border="4px solid"
                borderColor={borderColor}
              />

              <VStack spacing={2}>
                <Heading
                  as="h1"
                  size="xl"
                  color={headingColor}
                  fontWeight="500"
                  letterSpacing="tight"
                >
                  Hello, I'm the Blogger
                </Heading>
                <Text color={textColor} fontSize="lg">
                  A passionate writer and content creator
                </Text>
              </VStack>

              <Text
                color={textColor}
                lineHeight="1.8"
                maxW="500px"
                textAlign="left"
              >
                Welcome to my Scandinavian-style blog. I love minimalist design, 
                elegant writing, and thoughtful exploration. This space documents 
                my technical learning, life reflections, and creative journey.
              </Text>

              <Text
                color={textColor}
                lineHeight="1.8"
                maxW="500px"
                textAlign="left"
              >
                I believe good design should be simple yet sophisticated, much like 
                the Scandinavian philosophy of life - pursuing the perfect balance 
                between functionality and aesthetics. I hope my words inspire and 
                resonate with you.
              </Text>
            </VStack>
          </Box>

          <Box
            bg={cardBg}
            borderRadius="16px"
            border="1px solid"
            borderColor={borderColor}
            p={8}
          >
            <VStack spacing={6} align="stretch">
              <Heading
                as="h2"
                size="md"
                color={headingColor}
                fontWeight="500"
                letterSpacing="tight"
              >
                Skills & Expertise
              </Heading>

              <SimpleGrid columns={[2, 3]} spacing={3}>
                {skills.map((skill, index) => (
                  <Box
                    key={index}
                    bg={iconBg}
                    borderRadius="8px"
                    py={2}
                    px={4}
                    textAlign="center"
                    color={textColor}
                    fontWeight="500"
                    transition="all 0.2s"
                    _hover={{ bg: iconHoverBg, color: linkColor }}
                  >
                    {skill}
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </Box>

          <Box
            bg={cardBg}
            borderRadius="16px"
            border="1px solid"
            borderColor={borderColor}
            p={8}
          >
            <VStack spacing={6} align="stretch">
              <Heading
                as="h2"
                size="md"
                color={headingColor}
                fontWeight="500"
                letterSpacing="tight"
              >
                Connect With Me
              </Heading>

              <HStack spacing={4} justify="center" flexWrap="wrap">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    isExternal
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Box
                      bg={iconBg}
                      borderRadius="12px"
                      p={4}
                      transition="all 0.3s"
                      _hover={{
                        bg: iconHoverBg,
                        transform: 'translateY(-4px)',
                        shadow: 'md'
                      }}
                      cursor="pointer"
                    >
                      <VStack spacing={2}>
                        <Icon
                          as={social.icon}
                          boxSize={6}
                          color={linkColor}
                        />
                        <Text fontSize="sm" color={textColor} fontWeight="500">
                          {social.label}
                        </Text>
                      </VStack>
                    </Box>
                  </Link>
                ))}
              </HStack>
            </VStack>
          </Box>

          <Box textAlign="center" pt={4}>
            <Text color={textColor} fontSize="sm">
              Thank you for visiting, looking forward to connecting with you ✨
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default About;