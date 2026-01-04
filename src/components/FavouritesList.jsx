import { useState } from 'react';

function FavouritesList({ favourites = [], onRemove, onClear }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    const propertyId = e.dataTransfer.getData("propertyId");
    console.log("Dropped property ID:", propertyId); // Debug log
    if (propertyId) {
      onRemove(propertyId);
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
            onDragStart={(e) => {
              console.log("Dragging favourite:", fav.id); // Debug log
              e.dataTransfer.setData("propertyId", fav.id);
              e.dataTransfer.effectAllowed = "move";
            }}
            onDragEnd={(e) => {
              console.log("Drag ended"); // Debug log
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
        className="remove-drop-zone"
        style={isDraggingOver ? { 
          borderColor: "#c82333", 
          background: "#ffcccc",
          transform: "scale(1.02)",
          boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)"
        } : {
          border: "3px dashed #dc3545",
          borderRadius: "12px",
          background: "#ffe6e6",
          padding: "1.5rem",
          textAlign: "center",
          fontWeight: "600",
          color: "#dc3545",
          fontSize: "1.1rem",
          margin: "1rem 0",
          transition: "all 0.3s ease",
          cursor: "pointer"
        }}
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