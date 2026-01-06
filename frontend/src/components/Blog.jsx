import { useState, useEffect } from 'react';
import achievementsData from '../data/achievements.json';

const Blog = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    setAchievements(achievementsData);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="blog">
      <div className="container">
        <h2 className="section-title">Achievements</h2>
        <div className="blog-content">
          {achievements.length > 0 && (
            <div className="projects-grid">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="project-card">
                  {achievement.image && (
                    <div className="project-image-container">
                      <img 
                        src={achievement.image} 
                        alt={achievement.title}
                        className="project-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="project-content">
                    <h3 className="project-title">{achievement.title}</h3>
                    <p className="project-description">{achievement.description}</p>
                    {achievement.technologies && achievement.technologies.length > 0 && (
                      <div className="project-technologies">
                        {achievement.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="project-footer">
                      {achievement.date && (
                        <span className="project-date">{formatDate(achievement.date)}</span>
                      )}
                      {achievement.link && (
                        <a 
                          href={achievement.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          View Achievement <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
