import { useState } from 'react';

function PropertyCard({ property, onSelect, onDragAdd }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", property.id);
    e.dataTransfer.effectAllowed = "copy";
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="property-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={isDragging ? { opacity: 0.5, cursor: 'grabbing' } : { cursor: 'grab' }}
    >
      <img 
        src={property.images[0] || "https://via.placeholder.com/350x250"} 
        alt={property.shortDescription}
        className="property-image"
        onClick={() => onSelect(property)}
        style={{ cursor: 'pointer' }}
      />
      
      <div className="property-info">
        <h3 onClick={() => onSelect(property)} style={{ cursor: 'pointer' }}>
          £{property.price.toLocaleString()}
        </h3>
        
        <p className="property-description">{property.shortDescription}</p>
        
        <p className="property-specs">
          🛏️ {property.bedrooms} bed • {property.type} • {property.tenure}
        </p>
        
        <p className="property-location">
          {property.location}
        </p>
        
        <p className="property-date">
          Added: {new Date(property.added).toLocaleDateString('en-GB')}
        </p>
        
        <button 
          className="favourite-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDragAdd(property);
          }}
        >
          Add to Favourites
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;