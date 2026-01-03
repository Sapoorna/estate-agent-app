import React from 'react';

function FavouritesList({ favourites, onRemove, onClear }) {
  if (favourites.length === 0) {
    return (
      <div className="favourites-container">
        <h3>⭐ Favourites</h3>
        <p>Drag properties here or click the heart icon to add favourites.</p>
      </div>
    );
  }

  return (
    <div className="favourites-container">
      <h3>⭐ Favourites ({favourites.length})</h3>
      <div className="favourites-dropzone">
        {favourites.map((fav) => (
          <div key={fav.id} className="favourite-item">
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
    </div>
  );
}

export default FavouritesList;