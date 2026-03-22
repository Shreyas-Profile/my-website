import achievements from '../data/qualifications.json';

const Achievements = () => {
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
