import { useState } from "react";
import properties from "./data/properties.json";
import SearchForm from "./components/SearchForm.jsx";
import PropertyCard from "./components/PropertyCard.jsx";
import PropertyDetails from "./components/PropertyDetails.jsx";
import FavouritesList from "./components/FavouritesList.jsx";
import "./App.css";

function App() {
  const [results, setResults] = useState(properties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favourites, setFavourites] = useState([]);

  function handleSearch(criteria) {
    console.log("Search criteria:", criteria); // Debug log
    
    let filtered = properties.filter((property) => {
      // Type filter - case insensitive comparison
      if (criteria.type && criteria.type !== "any") {
        if (property.type.toLowerCase() !== criteria.type.toLowerCase()) {
          return false;
        }
      }

      // Price filters
      if (criteria.minPrice && property.price < criteria.minPrice) {
        return false;
      }

      if (criteria.maxPrice && property.price > criteria.maxPrice) {
        return false;
      }

      // Bedroom filters
      if (criteria.minBeds && property.bedrooms < criteria.minBeds) {
        return false;
      }

      if (criteria.maxBeds && property.bedrooms > criteria.maxBeds) {
        return false;
      }

      // Postcode filter - case insensitive
      if (criteria.postcode && criteria.postcode.trim() !== "") {
        if (!property.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase().trim())) {
          return false;
        }
      }

      // Date filtering
      if (criteria.startDate || criteria.endDate) {
        const propertyDate = new Date(property.added);

        if (criteria.startDate) {
          const startDate = new Date(criteria.startDate);
          if (propertyDate < startDate) return false;
        }

        if (criteria.endDate) {
          const endDate = new Date(criteria.endDate);
          if (propertyDate > endDate) return false;
        }
      }

      return true;
    });

    console.log("Filtered results:", filtered.length); // Debug log
    setResults(filtered);
  }

  function addToFavourites(property) {
    const exists = favourites.find((fav) => fav.id === property.id);
    if (!exists) {
      setFavourites([...favourites, property]);
  }

  function removeFromFavourites(id) {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  }

  function clearFavourites() {
    if (window.confirm("Are you sure you want to clear all favourites?")) {
      setFavourites([]);
    }
  }

  // Drag handler for favourites drop zone
  function handleFavouritesDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleFavouritesDrop(e) {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("text/plain");
    
    // Only add if it's NOT a remove action
    if (!propertyId.startsWith("remove:")) {
      const property = properties.find((p) => p.id === propertyId);
      if (property) {
        addToFavourites(property);
      }
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🏠 RightMove Clone</h1>
      </header>

      <main className="app-main">
        {selectedProperty ? (
          <PropertyDetails
            property={selectedProperty}
            onBack={() => setSelectedProperty(null)}
            onAddFavourite={addToFavourites}
          />
        ) : (
          <div className="search-container">
            <div className="left-panel">
              <SearchForm onSearch={handleSearch} />

              <div 
                onDragOver={handleFavouritesDragOver} 
                onDrop={handleFavouritesDrop}
              >
                <FavouritesList
                  favourites={favourites}
                  onRemove={removeFromFavourites}
                  onClear={clearFavourites}
                />
              </div>
            </div>

            <div className="right-panel">
              <h2>Search Results ({results.length} properties)</h2>

              {results.length === 0 ? (
                <div className="no-results">
                  <p>No properties found matching your criteria.</p>
                  <p>Try adjusting your search filters.</p>
                </div>
              ) : (
                <div className="results-grid">
                  {results.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={setSelectedProperty}
                      onDragAdd={addToFavourites}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;