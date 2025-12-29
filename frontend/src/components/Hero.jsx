const Hero = () => {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Shreyas</span>
          </h1>
          <p className="hero-subtitle">Young Developer & Student</p>
          <p className="hero-description">
            Passionate about coding and AI, learning, and building amazing things
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary" onClick={(e) => handleSmoothScroll(e, '#about')}>
              Learn More
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={(e) => handleSmoothScroll(e, '#contact')}>
              Get In Touch
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-placeholder">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

