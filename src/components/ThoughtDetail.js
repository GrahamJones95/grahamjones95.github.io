import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import thoughtsData from '../data/thoughts.json';

// Helper function to create URL-friendly slugs
const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

function ThoughtDetail() {
  const { id } = useParams();
  const thought = thoughtsData.find(t => createSlug(t.title) === id);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (thought && thought.contentFile) {
      fetch(thought.contentFile)
        .then(response => response.text())
        .then(text => {
          setContent(text);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading content:', error);
          setContent(thought.content || '');
          setLoading(false);
        });
    } else if (thought) {
      setContent(thought.content || '');
      setLoading(false);
    }
  }, [thought]);

  if (!thought) {
    return <Navigate to="/thoughts" replace />;
  }

  return (
    <section className="section">
      <Link to="/thoughts" className="back-button">
        ← Back to Thoughts
      </Link>
      <div className="detail-view">
        <h2>{thought.title}</h2>
        <p className="date">{thought.date}</p>
        <div className="detail-content">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({node, alt, ...props}) => (
                  <img {...props} alt={alt || ''} className="thought-image" />
                )
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </section>
  );
}

export default ThoughtDetail;
