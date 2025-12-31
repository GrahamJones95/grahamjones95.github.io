import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';

// Helper function to create URL-friendly slugs
const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

function Projects() {
  return (
    <section className="section">
      <h2>Projects</h2>
      <div className="project-grid">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card">
            <Link to={`/projects/${createSlug(project.title)}`} className="no-underline">
              <h3 className="clickable-title">
                {project.title}
              </h3>
            </Link>
            <p>{project.description}</p>
            {project.tags && project.tags.length > 0 && (
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
