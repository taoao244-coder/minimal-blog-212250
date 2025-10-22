// minimal-blog-212250/frontend/src/pages/ArticleDetail.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Tag,
  Button,
  Divider,
  Avatar,
  Input,
  Textarea,
  useColorModeValue,
  useToast,
  IconButton
} from '@chakra-ui/react';
import { ArrowBackIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getArticleById, deleteArticle, getComments, addComment } from '../utils/storage';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'gray.100');
  const mutedColor = useColorModeValue('gray.500', 'gray.500');
  const commentBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    const fetchedArticle = getArticleById(id);
    if (fetchedArticle) {
      setArticle(fetchedArticle);
      setComments(getComments(id));
    } else {
      toast({ title: 'Article not found', status: 'error', duration: 2000 });
      navigate('/');
    }
  }, [id, navigate, toast]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(id);
      toast({ title: 'Deleted successfully', status: 'success', duration: 2000 });
      navigate('/');
    }
  };

  const handleAddComment = () => {
    if (!commentName.trim()) {
      toast({ title: 'Please enter your name', status: 'warning', duration: 2000 });
      return;
    }
    if (!commentContent.trim()) {
      toast({ title: 'Please enter comment content', status: 'warning', duration: 2000 });
      return;
    }

    const newComment = addComment(id, {
      name: commentName.trim(),
      content: commentContent.trim()
    });

    if (newComment) {
      setComments([...comments, newComment]);
      setCommentName('');
      setCommentContent('');
      toast({ title: 'Comment posted successfully', status: 'success', duration: 2000 });
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!article) {
    return null;
  }

  return (
    <Box bg={bgColor} minH="calc(100vh - 70px)" py={8}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between">
            <Button
              leftIcon={<ArrowBackIcon />}
              variant="ghost"
              onClick={() => navigate('/')}
              borderRadius="8px"
            >
              Back
            </Button>
            <HStack spacing={2}>
              <IconButton
                icon={<EditIcon />}
                aria-label="Edit article"
                variant="ghost"
                borderRadius="8px"
                onClick={() => navigate(`/write/${id}`)}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete article"
                variant="ghost"
                colorScheme="red"
                borderRadius="8px"
                onClick={handleDelete}
              />
            </HStack>
          </HStack>

          <Box
            bg={cardBg}
            borderRadius="16px"
            border="1px solid"
            borderColor={borderColor}
            p={8}
          >
            <VStack spacing={6} align="stretch">
              <VStack spacing={4} align="stretch">
                <Heading
                  as="h1"
                  size="2xl"
                  color={headingColor}
                  fontWeight="500"
                  letterSpacing="tight"
                  lineHeight="1.3"
                >
                  {article.title}
                </Heading>

                <HStack spacing={4} color={mutedColor} fontSize="sm">
                  <Text>{formatDate(article.createdAt)}</Text>
                  {article.updatedAt !== article.createdAt && (
                    <Text>· Updated</Text>
                  )}
                </HStack>

                {article.tags && article.tags.length > 0 && (
                  <HStack spacing={2} flexWrap="wrap">
                    {article.tags.map((tag, index) => (
                      <Tag
                        key={index}
                        size="md"
                        borderRadius="full"
                        colorScheme="blue"
                        fontWeight="500"
                      >
                        {tag}
                      </Tag>
                    ))}
                  </HStack>
                )}
              </VStack>

              <Divider />

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
                    fontSize: 'sm',
                    fontFamily: 'monospace'
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
                  },
                  '& img': {
                    borderRadius: '8px',
                    maxW: '100%',
                    my: 4
                  }
                }}
                color={textColor}
                fontSize="md"
              >
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </Box>
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
                size="lg"
                color={headingColor}
                fontWeight="500"
                letterSpacing="tight"
              >
                Comments ({comments.length})
              </Heading>

              <VStack spacing={4} align="stretch">
                <Input
                  placeholder="Your name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  borderRadius="8px"
                />
                <Textarea
                  placeholder="Share your thoughts..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  minH="120px"
                  borderRadius="8px"
                />
                <Button
                  colorScheme="blue"
                  onClick={handleAddComment}
                  alignSelf="flex-end"
                  borderRadius="8px"
                  px={8}
                >
                  Post Comment
                </Button>
              </VStack>

              {comments.length > 0 && (
                <>
                  <Divider />
                  <VStack spacing={4} align="stretch">
                    {comments.map((comment) => (
                      <Box
                        key={comment.id}
                        bg={commentBg}
                        p={4}
                        borderRadius="12px"
                      >
                        <HStack spacing={3} mb={3}>
                          <Avatar
                            size="sm"
                            name={comment.name}
                            bg="blue.400"
                          />
                          <VStack align="stretch" spacing={0} flex={1}>
                            <Text fontWeight="500" color={textColor}>
                              {comment.name}
                            </Text>
                            <Text fontSize="xs" color={mutedColor}>
                              {formatDate(comment.createdAt)}
                            </Text>
                          </VStack>
                        </HStack>
                        <Text color={textColor} lineHeight="1.7" pl={10}>
                          {comment.content}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </>
              )}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ArticleDetail;