import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import projectsData from '../data/projects.json';

// Helper function to create URL-friendly slugs
const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find(p => createSlug(p.title) === id);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project && project.contentFile) {
      fetch(project.contentFile)
        .then(response => response.text())
        .then(text => {
          setContent(text);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading content:', error);
          setContent(project.description);
          setLoading(false);
        });
    } else if (project) {
      setContent(project.description);
      setLoading(false);
    }
  }, [project]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <section className="section">
      <Link to="/projects" className="back-button">
        ← Back to Projects
      </Link>
      <div className="detail-view">
        <h2>{project.title}</h2>
        <p className="date">{project.date}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
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
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              View Project →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
