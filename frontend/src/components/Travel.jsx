import travelData from '../data/travel.json';

const Travel = () => {
  return (
    <section id="travel" className="travel">
      <div className="container">
        <h2 className="section-title">Travel</h2>
        <div className="travel-content">
          <div className="travel-text">
            <p>{travelData.intro}</p>
          </div>
          <div className="travel-grid">
            {travelData.items.map((item, index) => (
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
