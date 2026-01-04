import React from 'react';

function FavouritesList({ favourites, onRemove, onClear }) {
  // Drag handlers for removing items by dragging OUT
  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("text/plain", `remove:${propertyId}`);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data.startsWith("remove:")) {
      const propertyId = data.replace("remove:", "");
      onRemove(propertyId);
    }
  };

  if (favourites.length === 0) {
    return (
      <div className="favourites-container">
        <h3>⭐ Favourites</h3>
        <div 
          className="favourites-dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>Drag properties here or click the heart icon to add favourites.</p>
          <p>Drag items out of this area to remove them.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="favourites-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3>⭐ Favourites ({favourites.length})</h3>
      <div className="favourites-dropzone">
        {favourites.map((fav) => (
          <div 
            key={fav.id} 
            className="favourite-item"
            draggable
            onDragStart={(e) => handleDragStart(e, fav.id)}
          >
            <img src={fav.images[0] || "https://via.placeholder.com/80x60"} alt={fav.shortDescription} />
            <div>
              <strong>£{fav.price.toLocaleString()}</strong>
              <p>{fav.shortDescription}</p>
              <p>{fav.location}</p>
            </div>
            <button 
              onClick={() => onRemove(fav.id)} 
              className="remove-btn"
              aria-label="Remove from favourites"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button onClick={onClear} className="clear-favourites-btn">
        Clear All Favourites
      </button>
      <p style={{marginTop: '10px', fontSize: '0.9rem', color: '#666', textAlign: 'center'}}>
        💡 Drag items out of this box to remove them
      </p>
    </div>
  );
}

export default FavouritesList;