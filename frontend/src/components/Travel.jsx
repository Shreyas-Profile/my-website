const Travel = () => {
  const travelItems = [
    {
      icon: 'fas fa-map-marker-alt',
      title: "Places I've Visited",
      description: 'Iceland and Turkey',
    },
    {
      icon: 'fas fa-plane',
      title: 'Dream Destinations',
      description: 'USA, Italy and Spain',
    },
    {
      icon: 'fas fa-camera',
      title: 'Travel Experiences',
      description: 'Memorable moments from my journeys',
    },
  ];

  return (
    <section id="travel" className="travel">
      <div className="container">
        <h2 className="section-title">Travel</h2>
        <div className="travel-content">
          <div className="travel-text">
            <p>
              Traveling has always been an important part of my life, helping me gain new perspectives and
              experiences.
            </p>
          </div>
          <div className="travel-grid">
            {travelItems.map((item, index) => (
              <div key={index} className="travel-card">
                <div className="travel-placeholder">
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

export default Travel;

