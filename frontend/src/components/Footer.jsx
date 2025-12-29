const Footer = () => {
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
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2025 Shreyas Pavuluri. All rights reserved.</p>
          <div className="footer-links">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>
              Home
            </a>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>
              About
            </a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

