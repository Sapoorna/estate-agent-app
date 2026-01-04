import { useState } from 'react';

function FavouritesList({ favourites, onRemove, onClear }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const propertyId = e.dataTransfer.getData("propertyId");
    if (propertyId) onRemove(propertyId);
  };

  if (favourites.length === 0) {
    return (
      <div className="favourites-container">
        <h3>⭐ Favourites</h3>
        <div className="favourites-dropzone">
          <p>Drag properties here or click ❤️ to add favourites.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favourites-container">
      <h3>⭐ Favourites ({favourites.length})</h3>
      
      <div className="favourites-dropzone">
        {favourites.map((fav) => (
          <div key={fav.id} className="favourite-item" draggable onDragStart={(e) => e.dataTransfer.setData("propertyId", fav.id)}>
            <img 
              src={fav.images[0] || "https://via.placeholder.com/80x60"} 
              alt={fav.shortDescription}
              style={{ width: "80px", height: "60px", borderRadius: "6px" }}
            />
            <div>
              <strong>£{fav.price.toLocaleString()}</strong>
              <p style={{ fontSize: "0.9rem" }}>{fav.shortDescription}</p>
            </div>
            <button onClick={() => onRemove(fav.id)} className="remove-btn">
              ×
            </button>
          </div>
        ))}
      </div>

      <div 
        className="favourites-dropzone"
        style={isDraggingOver ? { borderColor: "red", background: "#ffe6e6" } : {}}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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