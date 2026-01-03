function PropertyCard({ property, onSelect, onDragAdd }) {
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", property.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleClick = () => {
    onSelect(property);
  };

  const handleFavouriteClick = (e) => {
    e.stopPropagation(); // Don't trigger the card click
    onDragAdd(property);
  };

  return (
    <div
      className="property-card"
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
    >
      <img
        src={property.images[0] || "https://via.placeholder.com/400x300"}
        alt={property.shortDescription}
        className="property-image"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x300";
        }}
      />

      <div className="property-info">
        <h3>£{property.price.toLocaleString()}</h3>
        <p className="property-description">{property.shortDescription}</p>
        <p className="property-specs">
          {property.bedrooms} bed {property.type} • {property.tenure}
        </p>
        <p className="property-location">{property.location}</p>
        <p className="property-date">Added: {property.added}</p>
        
        <button 
          className="favourite-btn"
          onClick={handleFavouriteClick}
          aria-label="Add to favourites"
        >
          ❤️ Add to Favourites
        </button>
        
        <p className="drag-hint">👆 Drag me to favourites</p>
      </div>
    </div>
  );
}

export default PropertyCard;