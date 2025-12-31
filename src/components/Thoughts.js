import React from 'react';
import { Link } from 'react-router-dom';
import thoughtsData from '../data/thoughts.json';

// Helper function to create URL-friendly slugs
const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

function Thoughts() {
  return (
    <section className="section">
      <h2>Thoughts</h2>
      <div className="thoughts-list">
        {thoughtsData.map((thought) => (
          <article key={thought.id} className="thought-card">
            <Link to={`/thoughts/${createSlug(thought.title)}`} className="no-underline">
              <h3 className="clickable-title">
                {thought.title}
              </h3>
            </Link>
            <p className="date">{thought.date}</p>
            {thought.excerpt && <p className="excerpt"><em>{thought.excerpt}</em></p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Thoughts;
