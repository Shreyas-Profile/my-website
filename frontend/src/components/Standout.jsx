import standoutItems from '../data/standout.json';

const Standout = () => {
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
