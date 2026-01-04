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
        // Change the onError function
        onError={(e) => {
          e.target.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%231a73e8'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EProperty Image%3C/text%3E%3C/svg%3E";
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
