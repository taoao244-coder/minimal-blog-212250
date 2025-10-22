// minimal-blog-212250/frontend/src/components/ArticleCard.jsx

import React from 'react';
import { Box, Heading, Text, HStack, Tag, VStack, Image, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const titleColor = useColorModeValue('gray.800', 'gray.100');

  const coverImages = [
    'https://hpi-hub.tos-cn-beijing.volces.com/static/image/cHJpdmF0ZS9sci91748499998706-2601M2NfMS5qcGc.jpg',
    'https://hpi-hub.tos-cn-beijing.volces.com/static/image/cHJpdmF0ZS9sci91748523015713-2270NjJfMS5qcGc.jpg',
    'https://hpi-hub.tos-cn-beijing.volces.com/static/styles/cHJpdmF0ZS9sci91748499200233-1504Y2t1cC5wbmc.png'
  ];

  const getExcerpt = (content) => {
    const plainText = content.replace(/[#*`>\-\[\]]/g, '').trim();
    return plainText.length > 120 ? `${plainText.slice(0, 120)}...` : plainText;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  const randomCover = coverImages[Math.floor(Math.random() * coverImages.length)];

  return (
    <Box
      bg={bgColor}
      borderRadius="16px"
      border="1px solid"
      borderColor={borderColor}
      overflow="hidden"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{ transform: 'translateY(-4px)', bg: hoverBg, shadow: 'lg' }}
      onClick={handleClick}
    >
      <Image
        src={randomCover}
        alt={article.title}
        w="100%"
        h="200px"
        objectFit="cover"
      />
      
      <VStack align="stretch" p={6} spacing={3}>
        <Heading
          as="h3"
          size="md"
          color={titleColor}
          fontWeight="500"
          letterSpacing="tight"
          noOfLines={2}
        >
          {article.title}
        </Heading>
        
        <Text color={textColor} fontSize="sm" noOfLines={3} lineHeight="1.7">
          {getExcerpt(article.content)}
        </Text>
        
        {article.tags && article.tags.length > 0 && (
          <HStack spacing={2} flexWrap="wrap">
            {article.tags.slice(0, 3).map((tag, index) => (
              <Tag
                key={index}
                size="sm"
                borderRadius="full"
                bg={useColorModeValue('blue.50', 'blue.900')}
                color={useColorModeValue('blue.600', 'blue.200')}
                fontWeight="500"
                px={3}
              >
                {tag}
              </Tag>
            ))}
          </HStack>
        )}
        
        <Text fontSize="xs" color={textColor} pt={2}>
          {formatDate(article.createdAt || Date.now())}
        </Text>
      </VStack>
    </Box>
  );
};

export default ArticleCard;