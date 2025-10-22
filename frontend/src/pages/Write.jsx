// minimal-blog-212250/frontend/src/pages/Write.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Input,
  Textarea,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  useColorModeValue,
  useToast,
  Text,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import { saveArticle, getDraft, saveDraft, clearDraft, getArticleById } from '../utils/storage';

const Write = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');
  const previewBg = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    if (id) {
      const article = getArticleById(id);
      if (article) {
        setTitle(article.title);
        setContent(article.content);
        setTags(article.tags || []);
      }
    } else {
      const draft = getDraft();
      if (draft) {
        setTitle(draft.title || '');
        setContent(draft.content || '');
        setTags(draft.tags || []);
        setLastSaved(draft.savedAt);
      }
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        saveDraft({ title, content, tags });
        setLastSaved(Date.now());
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, content, tags]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast({ title: 'Please enter a title', status: 'warning', duration: 2000 });
      return;
    }
    if (!content.trim()) {
      toast({ title: 'Please enter content', status: 'warning', duration: 2000 });
      return;
    }

    const article = saveArticle({ id, title, content, tags });
    if (article) {
      clearDraft();
      toast({ title: 'Published successfully', status: 'success', duration: 2000 });
      navigate(`/article/${article.id}`);
    } else {
      toast({ title: 'Failed to publish', status: 'error', duration: 2000 });
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box bg={bgColor} minH="calc(100vh - 70px)" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={6} align="stretch">
          <Box
            bg={cardBg}
            borderRadius="16px"
            border="1px solid"
            borderColor={borderColor}
            p={6}
          >
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Enter article title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fontSize="2xl"
                fontWeight="500"
                border="none"
                _focus={{ outline: 'none' }}
                _placeholder={{ color: placeholderColor }}
              />

              <Divider />

              <HStack spacing={2} flexWrap="wrap">
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    size="md"
                    borderRadius="full"
                    variant="subtle"
                    colorScheme="blue"
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                  </Tag>
                ))}
                <Input
                  placeholder="Add tags..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  maxW="200px"
                  size="sm"
                  borderRadius="full"
                />
              </HStack>
            </VStack>
          </Box>

          <Tabs colorScheme="blue" variant="soft-rounded">
            <TabList bg={cardBg} p={2} borderRadius="12px" border="1px solid" borderColor={borderColor}>
              <Tab>Edit</Tab>
              <Tab>Preview</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0} pt={4}>
                <Box
                  bg={cardBg}
                  borderRadius="16px"
                  border="1px solid"
                  borderColor={borderColor}
                  p={6}
                >
                  <Textarea
                    placeholder="Write your article content using Markdown..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    minH="500px"
                    border="none"
                    _focus={{ outline: 'none' }}
                    _placeholder={{ color: placeholderColor }}
                    fontFamily="monospace"
                    fontSize="md"
                    lineHeight="1.8"
                    resize="vertical"
                  />
                </Box>
              </TabPanel>

              <TabPanel p={0} pt={4}>
                <Box
                  bg={previewBg}
                  borderRadius="16px"
                  border="1px solid"
                  borderColor={borderColor}
                  p={8}
                  minH="500px"
                >
                  <Box
                    sx={{
                      '& h1': { fontSize: '2xl', fontWeight: '600', mb: 4, mt: 6 },
                      '& h2': { fontSize: 'xl', fontWeight: '600', mb: 3, mt: 5 },
                      '& h3': { fontSize: 'lg', fontWeight: '600', mb: 2, mt: 4 },
                      '& p': { mb: 4, lineHeight: '1.8' },
                      '& ul, & ol': { ml: 6, mb: 4 },
                      '& li': { mb: 2 },
                      '& code': { 
                        bg: useColorModeValue('gray.100', 'gray.700'),
                        px: 2,
                        py: 1,
                        borderRadius: '4px',
                        fontSize: 'sm'
                      },
                      '& pre': {
                        bg: useColorModeValue('gray.100', 'gray.700'),
                        p: 4,
                        borderRadius: '8px',
                        overflowX: 'auto',
                        mb: 4
                      },
                      '& blockquote': {
                        borderLeft: '4px solid',
                        borderColor: 'blue.400',
                        pl: 4,
                        py: 2,
                        my: 4,
                        fontStyle: 'italic'
                      }
                    }}
                    color={textColor}
                  >
                    {content ? (
                      <ReactMarkdown>{content}</ReactMarkdown>
                    ) : (
                      <Text color={placeholderColor}>Preview area</Text>
                    )}
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <HStack justify="space-between" pt={4}>
            <Text fontSize="sm" color={textColor}>
              {lastSaved && `Last saved: ${formatTime(lastSaved)}`}
            </Text>
            <HStack spacing={3}>
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                borderRadius="8px"
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handlePublish}
                borderRadius="8px"
                px={8}
              >
                {id ? 'Update' : 'Publish'}
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Write;