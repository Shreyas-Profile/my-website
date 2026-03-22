import socialLinks from '../data/social.json';

const Social = () => {
  return (
    <section id="social" className="social">
      <div className="container">
        <h2 className="section-title">Follow Me</h2>
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link ${link.className}`}
            >
              <i className={link.icon}></i>
              <span>{link.text}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;
