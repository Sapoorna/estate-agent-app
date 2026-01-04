import { useState } from 'react';

function FavouritesList({ favourites = [], onRemove, onClear }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState(null);

  const handleFavDragStart = (e, favId) => {
    console.log("Started dragging favourite:", favId);
    e.dataTransfer.setData("text/plain", favId); // Changed to text/plain
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
          <div 
            key={fav.id} 
            className="favourite-item" 
            draggable="true"
            onDragStart={(e) => handleFavDragStart(e, fav.id)}
            onDragEnd={handleFavDragEnd}
            style={{
              opacity: draggedItemId === fav.id ? 0.5 : 1,
              cursor: 'move'
            }}
          >
            <img 
              src={fav.images[0] || "https://via.placeholder.com/80x60"} 
              alt={fav.shortDescription}
              style={{ width: "80px", height: "60px", borderRadius: "6px", objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <strong>£{fav.price.toLocaleString()}</strong>
              <p style={{ fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
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
        onDragOver={handleRemoveZoneDragOver}
        onDragLeave={handleRemoveZoneDragLeave}
        onDrop={handleRemoveZoneDrop}
        style={{
          minHeight: "100px",
          border: isDraggingOver ? "4px solid #c82333" : "3px dashed #dc3545",
          borderRadius: "12px",
          background: isDraggingOver ? "#ff9999" : "#ffe6e6",
          padding: "2rem",
          textAlign: "center",
          fontWeight: "700",
          color: "#dc3545",
          fontSize: "1.3rem",
          margin: "1.5rem 0",
          transition: "all 0.3s ease",
          transform: isDraggingOver ? "scale(1.05)" : "scale(1)",
          boxShadow: isDraggingOver ? "0 6px 16px rgba(220, 53, 69, 0.4)" : "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        🗑️ DROP HERE TO REMOVE
      </div>

      <button onClick={onClear} className="clear-favourites-btn">
        Clear All Favourites
      </button>
    </div>
  );
}

export default FavouritesList;