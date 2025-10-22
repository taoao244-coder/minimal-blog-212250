// minimal-blog-212250/frontend/src/utils/storage.js

/**
 * Local storage utility functions
 * Manages article data and draft saving
 */

const STORAGE_KEYS = {
  ARTICLES: 'blog_articles',
  DRAFTS: 'blog_drafts',
  COMMENTS: 'blog_comments',
  THEME: 'blog_theme'
};

// Get all articles
export const getArticles = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get articles:', error);
    return [];
  }
};

// Save article
export const saveArticle = (article) => {
  try {
    const articles = getArticles();
    const timestamp = Date.now();
    
    const newArticle = {
      ...article,
      id: article.id || `article_${timestamp}`,
      createdAt: article.createdAt || timestamp,
      updatedAt: timestamp,
      tags: article.tags || []
    };
    
    const existingIndex = articles.findIndex(a => a.id === newArticle.id);
    if (existingIndex >= 0) {
      articles[existingIndex] = newArticle;
    } else {
      articles.unshift(newArticle);
    }
    
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    return newArticle;
  } catch (error) {
    console.error('Failed to save article:', error);
    return null;
  }
};

// Get article by ID
export const getArticleById = (id) => {
  const articles = getArticles();
  return articles.find(a => a.id === id) || null;
};

// Delete article
export const deleteArticle = (id) => {
  try {
    const articles = getArticles();
    const filtered = articles.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete article:', error);
    return false;
  }
};

// Get draft
export const getDraft = (id = 'current') => {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.DRAFTS}_${id}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get draft:', error);
    return null;
  }
};

// Save draft
export const saveDraft = (draft, id = 'current') => {
  try {
    const draftData = {
      ...draft,
      savedAt: Date.now()
    };
    localStorage.setItem(`${STORAGE_KEYS.DRAFTS}_${id}`, JSON.stringify(draftData));
    return true;
  } catch (error) {
    console.error('Failed to save draft:', error);
    return false;
  }
};

// Clear draft
export const clearDraft = (id = 'current') => {
  try {
    localStorage.removeItem(`${STORAGE_KEYS.DRAFTS}_${id}`);
    return true;
  } catch (error) {
    console.error('Failed to clear draft:', error);
    return false;
  }
};

// Get article comments
export const getComments = (articleId) => {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.COMMENTS}_${articleId}`);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get comments:', error);
    return [];
  }
};

// Add comment
export const addComment = (articleId, comment) => {
  try {
    const comments = getComments(articleId);
    const newComment = {
      ...comment,
      id: `comment_${Date.now()}`,
      createdAt: Date.now()
    };
    comments.push(newComment);
    localStorage.setItem(`${STORAGE_KEYS.COMMENTS}_${articleId}`, JSON.stringify(comments));
    return newComment;
  } catch (error) {
    console.error('Failed to add comment:', error);
    return null;
  }
};

// Search articles
export const searchArticles = (keyword) => {
  const articles = getArticles();
  const lowerKeyword = keyword.toLowerCase();
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowerKeyword) ||
    article.content.toLowerCase().includes(lowerKeyword) ||
    (article.tags && article.tags.some(tag => tag.toLowerCase().includes(lowerKeyword)))
  );
};

// Filter by tag
export const filterByTag = (tag) => {
  const articles = getArticles();
  return articles.filter(article => 
    article.tags && article.tags.includes(tag)
  );
};

// Get all tags
export const getAllTags = () => {
  const articles = getArticles();
  const tagsSet = new Set();
  articles.forEach(article => {
    if (article.tags) {
      article.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet);
};

// Save theme preference
export const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    return true;
  } catch (error) {
    console.error('Failed to save theme:', error);
    return false;
  }
};

// Get theme preference
export const getTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  } catch (error) {
    console.error('Failed to get theme:', error);
    return 'light';
  }
};

// Initialize sample data
export const initSampleData = () => {
  const articles = getArticles();
  if (articles.length === 0) {
    const sampleArticles = [
      {
        id: 'article_1',
        title: 'Welcome to My Nordic Blog',
        content: `# Welcome

Welcome to my Scandinavian-style minimalist blog. This is a space where simplicity meets elegance.

## Design Philosophy

The design follows the Nordic aesthetic principles:
- **Simplicity**: Clean lines and uncluttered layouts
- **Functionality**: Every element serves a purpose
- **Natural Materials**: Inspired by wood, stone, and light
- **Muted Colors**: Soft blues, grays, and warm neutrals

## Features

- ✍️ Markdown editing support
- 🏷️ Tag-based filtering
- 🔍 Full-text search
- 🌓 Dark mode toggle
- 💬 Comment system

I hope you enjoy this clean and thoughtful design. Happy reading!`,
        tags: ['welcome', 'design'],
        createdAt: Date.now() - 86400000,
        updatedAt: Date.now() - 86400000
      },
      {
        id: 'article_2',
        title: 'The Power of Markdown',
        content: `# The Power of Markdown

Markdown is a lightweight markup language that has revolutionized how we write for the web.

## Why Markdown?

Markdown allows you to write using an easy-to-read, easy-to-write plain text format, which then converts to structurally valid HTML.

### Key Benefits

1. **Simple Syntax**: Easy to learn and use
2. **Platform Independent**: Works everywhere
3. **Future-Proof**: Plain text files last forever
4. **Version Control Friendly**: Perfect for Git

## Common Syntax

Here are some common Markdown elements:

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

[Link text](https://example.com)
\`\`\`

> "Markdown is intended to be as easy-to-read and easy-to-write as is feasible."
> — John Gruber

Try it yourself and see how intuitive it is!`,
        tags: ['markdown', 'tools', 'writing'],
        createdAt: Date.now() - 172800000,
        updatedAt: Date.now() - 172800000
      },
      {
        id: 'article_3',
        title: 'Building with Chakra UI',
        content: `# Building with Chakra UI

Chakra UI is a simple, modular, and accessible component library that provides the building blocks for React applications.

## Why Choose Chakra UI?

### 1. Accessibility First
All components follow WAI-ARIA standards, ensuring your app is accessible to everyone.

### 2. Dark Mode Support
Built-in dark mode support with zero additional configuration.

### 3. Customizable
Easy to customize with theme objects and style props.

### 4. Developer Experience
Intuitive API that feels natural to React developers.

## Example Component

\`\`\`jsx
import { Box, Heading, Text } from '@chakra-ui/react';

function Card() {
  return (
    <Box bg="white" p={6} borderRadius="md" shadow="md">
      <Heading size="md">Card Title</Heading>
      <Text mt={4}>Card content goes here</Text>
    </Box>
  );
}
\`\`\`

The combination of simplicity and power makes Chakra UI perfect for building modern web applications.`,
        tags: ['react', 'ui', 'development'],
        createdAt: Date.now() - 259200000,
        updatedAt: Date.now() - 259200000
      },
      {
        id: 'article_4',
        title: 'Embracing Minimalism in Design',
        content: `# Embracing Minimalism in Design

Minimalism is more than just an aesthetic choice—it's a philosophy that values simplicity, clarity, and purpose.

## The Essence of Minimalism

Minimalist design strips away the unnecessary, leaving only what truly matters. This approach creates:

- **Clarity**: Users can focus on what's important
- **Elegance**: Beauty through simplicity
- **Efficiency**: Faster load times and better performance

## Scandinavian Design Principles

Nordic design embodies minimalism through:

### 1. Functionality
Every element serves a purpose. Form follows function.

### 2. Natural Light
Maximizing natural light creates warmth and openness.

### 3. Quality Over Quantity
Fewer, better things. Each piece is carefully chosen.

### 4. Neutral Palette
Soft whites, warm grays, and natural wood tones create a calm atmosphere.

## Applying to Digital Design

In web design, minimalism means:
- Clean typography
- Generous white space
- Limited color palette
- Clear hierarchy
- Purposeful interactions

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

Less is truly more when every element has meaning.`,
        tags: ['design', 'minimalism', 'philosophy'],
        createdAt: Date.now() - 345600000,
        updatedAt: Date.now() - 345600000
      },
      {
        id: 'article_5',
        title: 'React 18: What\'s New',
        content: `# React 18: What's New

React 18 brings exciting new features that improve performance and developer experience.

## Concurrent Rendering

The biggest change in React 18 is the introduction of concurrent rendering, allowing React to work on multiple tasks simultaneously.

### Benefits:
- Smoother user interfaces
- Better responsiveness
- Improved performance

## Automatic Batching

React 18 automatically batches state updates, reducing the number of re-renders:

\`\`\`jsx
// Before React 18: Two re-renders
// After React 18: One re-render
setCount(c => c + 1);
setFlag(f => !f);
\`\`\`

## Transitions

New APIs for marking updates as non-urgent:

\`\`\`jsx
import { useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };
  
  return (
    <input onChange={handleChange} />
  );
}
\`\`\`

## Suspense Improvements

Suspense now works on the server and supports more use cases.

React 18 represents a major leap forward in building responsive, user-friendly applications.`,
        tags: ['react', 'javascript', 'development'],
        createdAt: Date.now() - 432000000,
        updatedAt: Date.now() - 432000000
      },
      {
        id: 'article_6',
        title: 'The Art of Writing',
        content: `# The Art of Writing

Writing is both a craft and an art. It's a way to share ideas, tell stories, and connect with others.

## Why Write?

Writing helps us:
1. **Clarify Thinking**: Writing forces us to organize our thoughts
2. **Preserve Ideas**: Capture insights before they fade
3. **Share Knowledge**: Help others learn from our experiences
4. **Build Connections**: Find like-minded people

## Developing Your Voice

Your writing voice is unique to you. To develop it:

### Read Widely
Expose yourself to different styles and perspectives.

### Write Regularly
Consistency builds skill. Even 15 minutes daily makes a difference.

### Be Authentic
Write as you speak. Don't try to sound like someone else.

### Edit Ruthlessly
First drafts are rarely perfect. Revise and refine.

## Tips for Better Writing

- Start with an outline
- Use short sentences and paragraphs
- Choose specific, concrete words
- Cut unnecessary words
- Read your work aloud
- Get feedback from others

## The Power of Blogging

Blogging combines writing with sharing. It's a platform to:
- Document your journey
- Build expertise
- Create community
- Express creativity

> "There is no greater agony than bearing an untold story inside you."
> — Maya Angelou

Start writing today. Your voice matters.`,
        tags: ['writing', 'blogging', 'creativity'],
        createdAt: Date.now() - 518400000,
        updatedAt: Date.now() - 518400000
      },
      {
        id: 'article_7',
        title: 'Modern Web Development Workflow',
        content: `# Modern Web Development Workflow

Building modern web applications requires a robust workflow and the right tools.

## The Tech Stack

A typical modern stack includes:

### Frontend
- **React**: Component-based UI library
- **Vite**: Fast build tool and dev server
- **Chakra UI**: Component library

### Version Control
- **Git**: Track changes
- **GitHub**: Collaborate and share code

### Package Management
- **npm** or **yarn**: Manage dependencies

## Development Process

### 1. Planning
Start with clear requirements and user stories.

### 2. Design
Create wireframes and mockups before coding.

### 3. Development
Build features incrementally, testing as you go.

### 4. Testing
Write tests to catch bugs early.

### 5. Deployment
Deploy to production with CI/CD pipelines.

## Best Practices

\`\`\`javascript
// Write clean, readable code
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Use meaningful variable names
const userIsAuthenticated = true;

// Keep functions small and focused
const validateEmail = (email) => {
  return email.includes('@');
};
\`\`\`

## Continuous Learning

Web development evolves rapidly. Stay current by:
- Reading documentation
- Following industry blogs
- Building side projects
- Contributing to open source

The journey of learning never ends, and that's what makes it exciting!`,
        tags: ['development', 'workflow', 'tools'],
        createdAt: Date.now() - 604800000,
        updatedAt: Date.now() - 604800000
      },
      {
        id: 'article_8',
        title: 'Finding Balance in a Digital World',
        content: `# Finding Balance in a Digital World

In our always-connected world, finding balance between technology and life is more important than ever.

## The Digital Dilemma

Technology offers incredible benefits:
- Instant communication
- Access to information
- Creative tools
- Entertainment

But it also brings challenges:
- Constant notifications
- Information overload
- Screen fatigue
- FOMO (Fear of Missing Out)

## Strategies for Balance

### 1. Set Boundaries
Designate tech-free times and spaces in your day.

### 2. Practice Mindfulness
Be present in the moment, whether online or offline.

### 3. Curate Your Feed
Follow accounts that inspire and educate, not just entertain.

### 4. Take Regular Breaks
Use the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.

## Digital Minimalism

Apply minimalist principles to your digital life:

- **Unsubscribe** from unnecessary emails
- **Delete** apps you don't use
- **Limit** social media time
- **Focus** on quality over quantity

## Creating Intentional Spaces

Design your physical and digital environments to support focus:

- Clean desk workspace
- Organized file structure
- Minimalist desktop
- Purposeful bookmarks

## The Goal

Technology should enhance life, not dominate it. Find your balance.

> "The greatest weapon against stress is our ability to choose one thought over another."
> — William James

Choose wisely how you spend your time and attention.`,
        tags: ['lifestyle', 'balance', 'mindfulness'],
        createdAt: Date.now() - 691200000,
        updatedAt: Date.now() - 691200000
      },
      {
        id: 'article_9',
        title: 'Creating Beautiful User Interfaces',
        content: `# Creating Beautiful User Interfaces

Good UI design is invisible—it just works. Great UI design delights users while serving their needs.

## Principles of Great UI

### 1. Consistency
Use consistent patterns, colors, and spacing throughout your application.

### 2. Hierarchy
Guide users' attention with clear visual hierarchy and typography.

### 3. Feedback
Provide immediate feedback for user actions—buttons should respond, forms should validate.

### 4. Simplicity
Remove everything unnecessary. Every element should serve a purpose.

## Color Psychology

Colors evoke emotions and guide behavior:

- **Blue**: Trust, stability, professionalism
- **Green**: Growth, harmony, success
- **Red**: Urgency, passion, warning
- **Gray**: Neutrality, sophistication, balance

## Typography Matters

Good typography improves readability and sets the tone:

- Use a maximum of 2-3 font families
- Maintain consistent line heights
- Ensure sufficient contrast
- Choose appropriate font sizes

## Whitespace is Your Friend

Don't be afraid of empty space. Whitespace:
- Improves readability
- Creates visual breathing room
- Highlights important elements
- Adds elegance

## Mobile-First Design

Start with mobile constraints, then expand:

\`\`\`css
/* Mobile first */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
\`\`\`

## Accessibility Always

Design for everyone:
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Maintain color contrast ratios

Beautiful design is accessible design.`,
        tags: ['design', 'ui', 'accessibility'],
        createdAt: Date.now() - 777600000,
        updatedAt: Date.now() - 777600000
      },
      {
        id: 'article_10',
        title: 'The Joy of Learning',
        content: `# The Joy of Learning

Learning is a lifelong journey that enriches our lives and expands our possibilities.

## Why Keep Learning?

Continuous learning brings numerous benefits:

### Personal Growth
- Expands your worldview
- Builds confidence
- Develops critical thinking
- Sparks creativity

### Professional Development
- Keeps skills relevant
- Opens new opportunities
- Increases earning potential
- Builds adaptability

### Mental Health
- Keeps the mind sharp
- Reduces cognitive decline
- Provides sense of purpose
- Boosts self-esteem

## How to Learn Effectively

### 1. Set Clear Goals
Know what you want to learn and why. Specific goals motivate action.

### 2. Practice Consistently
Regular practice beats occasional marathons. Even 20 minutes daily adds up.

### 3. Teach Others
Teaching reinforces your understanding and reveals knowledge gaps.

### 4. Embrace Mistakes
Errors are learning opportunities. Fail fast, learn faster.

## Learning Resources

The internet offers endless learning opportunities:

- **Online Courses**: Coursera, Udemy, edX
- **Documentation**: Official docs are often the best resource
- **YouTube**: Free tutorials on virtually everything
- **Books**: Deep knowledge that withstands time
- **Communities**: Reddit, Discord, forums

## Building Learning Habits

Make learning a sustainable practice:

- Schedule dedicated learning time
- Remove distractions
- Take breaks to consolidate knowledge
- Review and reflect regularly
- Celebrate small wins

## The Growth Mindset

Adopt a growth mindset:
- View challenges as opportunities
- Embrace the learning process
- Persist through difficulties
- Learn from criticism
- Find inspiration in others' success

> "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
> — Brian Herbert

Choose to learn. Choose to grow.`,
        tags: ['learning', 'growth', 'education'],
        createdAt: Date.now() - 864000000,
        updatedAt: Date.now() - 864000000
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(sampleArticles));
  }
};