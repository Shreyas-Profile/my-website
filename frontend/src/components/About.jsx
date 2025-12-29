const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a 14-year-old student with a passion for technology and programming. Currently learning web
              development, AI, and exploring various programming languages.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, working on personal projects, or
              learning about the latest developments in AI and software engineering.
            </p>
            <p>
              I believe in continuous learning and love sharing my journey through my YouTube channel and
              open-source contributions.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <h3>14</h3>
              <p>Years Old</p>
            </div>
            <div className="stat">
              <h3>3+</h3>
              <p>Programming Languages</p>
            </div>
            <div className="stat">
              <h3>10+</h3>
              <p>Projects Completed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

