import React, { useState } from 'react';

function FavouritesList({ favourites, onRemove, onClear }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Drag handlers for removing items by dragging OUT
  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("text/plain", `remove:${propertyId}`);
    e.dataTransfer.effectAllowed = "move";
  };

  // Handlers for the remove drop zone
  const handleRemoveZoneDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleRemoveZoneDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleRemoveZoneDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    
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
        <div className="favourites-dropzone">
          <p>Drag properties here or click the heart icon to add favourites.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favourites-container">
      <h3>⭐ Favourites ({favourites.length})</h3>
      
      <div className="favourites-dropzone">
        {favourites.map((fav) => (
          <div 
            key={fav.id} 
            className="favourite-item"
            draggable
            onDragStart={(e) => handleDragStart(e, fav.id)}
          >
            <img 
              src={fav.images[0] || "https://via.placeholder.com/80x60"} 
              alt={fav.shortDescription}
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60'%3E%3Crect width='80' height='60' fill='%231a73e8'/%3E%3Ctext x='40' y='30' font-family='Arial' font-size='10' fill='white' text-anchor='middle'%3EImage%3C/text%3E%3C/svg%3E";
              }}
            />
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

      {/* DRAG TO REMOVE ZONE */}
      <div 
        className={`remove-drop-zone ${isDraggingOver ? 'drag-over-remove' : ''}`}
        onDragOver={handleRemoveZoneDragOver}
        onDragLeave={handleRemoveZoneDragLeave}
        onDrop={handleRemoveZoneDrop}
      >
        🗑️ Drag items here to remove
      </div>

      <button onClick={onClear} className="clear-favourites-btn">
        Clear All Favourites
      </button>
    </div>
  );
}

export default FavouritesList;