const Achievements = () => {
  const achievements = [
    {
      icon: 'fas fa-graduation-cap',
      title: 'Academic Excellence',
      description: 'Maintaining high grades in mathematics, physics, and computer science courses',
    },
    {
      icon: 'fas fa-code',
      title: 'Programming Certifications',
      description: 'Completed online courses in Python and web development',
    },
    {
      icon: 'fas fa-trophy',
      title: 'Coding Competitions',
      description: 'Participated in local and online programming contests',
    },
    {
      icon: 'fas fa-project-diagram',
      title: 'Project Portfolio',
      description: 'Built multiple web applications, coding projects and AI models',
    },
  ];

  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <h2 className="section-title">Qualifications</h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">
                <i className={achievement.icon}></i>
              </div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

