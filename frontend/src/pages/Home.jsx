// minimal-blog-212250/frontend/src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Tag,
  TagLabel,
  Heading,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  Button
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ArticleCard from '../components/ArticleCard';
import { getArticles, searchArticles, filterByTag, getAllTags, initSampleData } from '../utils/storage';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'gray.100');
  const tagBg = useColorModeValue('blue.50', 'blue.900');
  const tagColor = useColorModeValue('blue.600', 'blue.200');
  const activeTagBg = useColorModeValue('blue.500', 'blue.400');
  const activeTagColor = 'white';

  useEffect(() => {
    initSampleData();
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [searchKeyword, selectedTag, articles]);

  const loadArticles = () => {
    const fetchedArticles = getArticles();
    setArticles(fetchedArticles);
    setDisplayedArticles(fetchedArticles);
    setAllTags(getAllTags());
  };

  const filterArticles = () => {
    let filtered = articles;

    if (selectedTag) {
      filtered = filterByTag(selectedTag);
    }

    if (searchKeyword.trim()) {
      filtered = searchArticles(searchKeyword);
      if (selectedTag) {
        filtered = filtered.filter(article => 
          article.tags && article.tags.includes(selectedTag)
        );
      }
    }

    setDisplayedArticles(filtered);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const clearFilters = () => {
    setSearchKeyword('');
    setSelectedTag(null);
  };

  return (
    <Box bg={bgColor} minH="calc(100vh - 70px)" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <VStack spacing={4} align="stretch">
            <Heading
              as="h1"
              size="2xl"
              color={headingColor}
              fontWeight="500"
              letterSpacing="tight"
              textAlign="center"
            >
              Explore Articles
            </Heading>
            <Text
              color={textColor}
              fontSize="lg"
              textAlign="center"
              maxW="600px"
              mx="auto"
            >
              Share thoughts, document life, explore the world
            </Text>
          </VStack>

          <Box
            bg={cardBg}
            borderRadius="16px"
            border="1px solid"
            borderColor={borderColor}
            p={6}
          >
            <VStack spacing={4} align="stretch">
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search articles by title, content or tags..."
                  value={searchKeyword}
                  onChange={handleSearchChange}
                  borderRadius="12px"
                  _focus={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)'
                  }}
                />
              </InputGroup>

              {allTags.length > 0 && (
                <VStack spacing={3} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="sm" color={textColor} fontWeight="500">
                      Filter by Tags
                    </Text>
                    {(selectedTag || searchKeyword) && (
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={clearFilters}
                        borderRadius="6px"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </HStack>
                  <Wrap spacing={2}>
                    {allTags.map((tag, index) => (
                      <WrapItem key={index}>
                        <Tag
                          size="md"
                          borderRadius="full"
                          cursor="pointer"
                          bg={selectedTag === tag ? activeTagBg : tagBg}
                          color={selectedTag === tag ? activeTagColor : tagColor}
                          fontWeight="500"
                          px={4}
                          py={2}
                          transition="all 0.2s"
                          _hover={{
                            transform: 'translateY(-2px)',
                            shadow: 'md'
                          }}
                          onClick={() => handleTagClick(tag)}
                        >
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                </VStack>
              )}
            </VStack>
          </Box>

          {displayedArticles.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {displayedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              bg={cardBg}
              borderRadius="16px"
              border="1px solid"
              borderColor={borderColor}
              p={12}
              textAlign="center"
            >
              <Text color={textColor} fontSize="lg">
                {searchKeyword || selectedTag
                  ? 'No articles found matching your criteria'
                  : 'No articles yet, start writing your first post!'}
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;