# Markdown Content System

This system allows you to write your content in Markdown files for easy editing and version control.

## Directory Structure

```
src/
  content/
    projects/
      project-1.md
      project-2.md
    thoughts/
      2025-12-31-first-thought.md
      2025-12-30-second-thought.md
```

## Installation

Install the required packages:

```bash
npm install react-markdown remark-gfm gray-matter
```

## Markdown File Format

### For Projects (projects/*.md)

```markdown
---
title: My Awesome Project
date: 2025-12-31
tags: [react, javascript, web]
---

# My Awesome Project

This is a detailed description of my project.

## Features

- Feature 1
- Feature 2

## Technologies Used

- React
- Node.js
```

### For Thoughts (thoughts/*.md)

```markdown
---
title: My First Thought
date: 2025-12-31
excerpt: A brief summary of this thought
---

# My First Thought

Your full thought content goes here with **markdown** formatting.

You can include:
- Lists
- Code blocks
- Links
- Images
```

## Implementation

### 1. Create Content Loader Utility (src/utils/contentLoader.js)

```javascript
import matter from 'gray-matter';

// This function would load markdown files
// In a real implementation, you'd use webpack's raw-loader or similar
export const loadMarkdownFiles = (context) => {
  const files = [];
  context.keys().forEach((key) => {
    const content = context(key);
    const { data, content: markdownContent } = matter(content);
    files.push({
      ...data,
      content: markdownContent,
      slug: key.replace('./', '').replace('.md', ''),
    });
  });
  return files.sort((a, b) => new Date(b.date) - new Date(a.date));
};
```

### 2. Update Projects Component to Load from Markdown

```javascript
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load markdown files using webpack's require.context
    const context = require.context('../content/projects', false, /\.md$/);
    const loadedProjects = loadMarkdownFiles(context);
    setProjects(loadedProjects);
  }, []);

  return (
    <section className="section">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## Alternative: Simple JSON Approach (No Build Config Needed)

If you want to avoid webpack configuration, use JSON files:

### Create data files:

**src/data/projects.json**
```json
[
  {
    "id": 1,
    "title": "Project 1",
    "description": "Description here",
    "tags": ["react", "web"],
    "date": "2025-12-31"
  }
]
```

**src/data/thoughts.json**
```json
[
  {
    "id": 1,
    "title": "First Thought",
    "date": "2025-12-31",
    "content": "Your thought content here..."
  }
]
```

Then import directly:
```javascript
import projectsData from '../data/projects.json';
import thoughtsData from '../data/thoughts.json';
```

## Recommended Approach: Use a Public Folder

1. Create folders:
   - `public/content/projects/`
   - `public/content/thoughts/`

2. Create an index file:
   - `public/content/projects/index.json`
   - `public/content/thoughts/index.json`

3. Fetch content at runtime:

```javascript
useEffect(() => {
  fetch('/content/projects/index.json')
    .then(res => res.json())
    .then(async (index) => {
      const projectPromises = index.map(slug => 
        fetch(\`/content/projects/\${slug}.md\`)
          .then(res => res.text())
      );
      const contents = await Promise.all(projectPromises);
      // Parse and set state
    });
}, []);
```

This approach is simpler and doesn't require build configuration changes.
