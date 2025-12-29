const Social = () => {
  const socialLinks = [
    {
      href: 'https://www.youtube.com/@CentralCanvas-qn8jx',
      icon: 'fab fa-youtube',
      text: 'YouTube Channel',
      className: 'youtube',
    },
    {
      href: 'https://github.com/Pakki6/Shreyas',
      icon: 'fab fa-github',
      text: 'GitHub Profile',
      className: 'github',
    },
    {
      href: 'https://huggingface.co/Baobab123',
      icon: 'fas fa-robot',
      text: 'Hugging Face',
      className: 'huggingface',
    },
  ];

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

