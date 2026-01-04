import { useState } from 'react';

function FavouritesList({ favourites = [], onRemove, onClear }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState(null);

  const handleFavDragStart = (e, favId) => {
    console.log("Started dragging favourite:", favId);
    e.dataTransfer.setData("text/plain", favId);
    e.dataTransfer.effectAllowed = "move";
    setDraggedItemId(favId);
  };

  const handleFavDragEnd = () => {
    console.log("Drag ended");
    setDraggedItemId(null);
  };

  const handleRemoveZoneDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setIsDraggingOver(true);
    console.log("Dragging over remove zone");
  };

  const handleRemoveZoneDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    console.log("Left remove zone");
  };

  const handleRemoveZoneDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Dropped on remove zone!");
    
    const propertyId = e.dataTransfer.getData("text/plain");
    console.log("Property ID from drop:", propertyId);
    
    setIsDraggingOver(false);
    setDraggedItemId(null);
    
    if (propertyId) {
      console.log("Calling onRemove with:", propertyId);
      onRemove(propertyId);
    } else {
      console.log("No property ID found!");
    }
  };

  if (!favourites || favourites.length === 0) {
    return (
      <div className="favourites-container">
        <h3> Favourites</h3>
        <div className="favourites-dropzone">
          <p>Drag properties here or click to add favourites.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favourites-container">
      <h3> Favourites ({favourites.length})</h3>
      
      <div className="favourites-dropzone">
        {favourites.map((fav) => (
          <div 
            key={fav.id} 
            className={`favourite-item ${draggedItemId === fav.id ? 'dragging' : ''}`}
            draggable="true"
            onDragStart={(e) => handleFavDragStart(e, fav.id)}
            onDragEnd={handleFavDragEnd}
          >
            <img 
              src={fav.images[0] || "https://via.placeholder.com/80x60"} 
              alt={fav.shortDescription}
              className="favourite-item-image"
            />
            <div className="favourite-item-details">
              <strong>£{fav.price.toLocaleString()}</strong>
              <p className="favourite-item-description">
                {fav.shortDescription}
              </p>
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

      <div 
        className={`remove-drop-zone ${isDraggingOver ? 'drag-over-remove' : ''}`}
        onDragOver={handleRemoveZoneDragOver}
        onDragLeave={handleRemoveZoneDragLeave}
        onDrop={handleRemoveZoneDrop}
      >
         DROP HERE TO REMOVE
      </div>

      <button onClick={onClear} className="clear-favourites-btn">
        Clear All Favourites
      </button>
    </div>
  );
}

export default FavouritesList;