import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from './ImageGallery';

function PropertyDetails({ property, onBack, onAddFavourite }) {
  const handleFavourite = () => {
    onAddFavourite(property);
    alert(`Added "${property.shortDescription}" to favourites!`);
  };

  return (
    <div className="property-details-container">
      <button onClick={onBack} className="back-button">← Back to Results</button>
      
      <div className="property-header">
        <h2>£{property.price.toLocaleString()}</h2>
        <p className="property-type">{property.bedrooms} bed {property.type} • {property.tenure}</p>
        <p className="property-location">📍 {property.location}</p>
        <button onClick={handleFavourite} className="favourite-btn-large">
          ❤️ Add to Favourites
        </button>
      </div>

      <ImageGallery images={property.images} />
      
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map & Location</Tab>
        </TabList>

        <TabPanel>
          <h3>Property Description</h3>
          <p>{property.longDescription}</p>
          <div className="property-specs">
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Tenure:</strong> {property.tenure}</p>
            <p><strong>Added:</strong> {property.added}</p>
            <p><strong>Postcode:</strong> {property.postcode}</p>
          </div>
        </TabPanel>
        
        <TabPanel>
          <h3>Floor Plan</h3>
          <img 
            src="https://via.placeholder.com/600x400/1a73e8/ffffff?text=Floor+Plan" 
            alt="Floor plan" 
            className="floor-plan"
          />
          <p>This property features a spacious layout with {property.bedrooms} bedrooms.</p>
        </TabPanel>
        
        <TabPanel>
          <h3>Map & Location</h3>
          <div className="map-container">
            <iframe
              title="Property location"
              width="100%"
              height="400"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="location-info">
            <strong>Location:</strong> {property.location}
            <br />
            <strong>Postcode Area:</strong> {property.postcode}
          </p>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyDetails;