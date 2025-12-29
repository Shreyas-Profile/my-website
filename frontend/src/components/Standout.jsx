const Standout = () => {
  const standoutItems = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Young Perspective',
      description:
        'Being 14 years old gives me a unique, fresh perspective on technology and problem-solving',
    },
    {
      icon: 'fas fa-rocket',
      title: 'Rapid Learning',
      description: 'I have a natural ability to quickly grasp new concepts and technologies',
    },
    {
      icon: 'fas fa-users',
      title: 'Community Focus',
      description: 'I believe in sharing knowledge and contributing to the developer community',
    },
    {
      icon: 'fas fa-brain',
      title: 'Innovative Thinking',
      description: 'I approach problems with creativity and look for unique solutions',
    },
  ];

  return (
    <section id="standout" className="standout">
      <div className="container">
        <h2 className="section-title">What Makes Me Stand Out</h2>
        <div className="standout-content">
          <div className="standout-grid">
            {standoutItems.map((item, index) => (
              <div key={index} className="standout-item">
                <div className="standout-icon">
                  <i className={item.icon}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Standout;

