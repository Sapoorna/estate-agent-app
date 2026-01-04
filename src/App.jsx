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
    console.log("Search criteria:", criteria);
    
    let filtered = properties.filter((property) => {
      // Type filter - case insensitive comparison
      if (criteria.type && criteria.type !== "any") {
        if (property.type.toLowerCase() !== criteria.type.toLowerCase()) {
          return false;
        }
      }

      // Price filter
      if (criteria.minPrice && property.price < Number(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) return false;

      // Bedroom filter
      if (criteria.minBeds && property.bedrooms < Number(criteria.minBeds)) return false;
      if (criteria.maxBeds && property.bedrooms > Number(criteria.maxBeds)) return false;

      // Postcode filter
      if (criteria.postcode && criteria.postcode.trim() !== "") {
        if (!property.postcode.toUpperCase().startsWith(criteria.postcode.toUpperCase().trim())) {
          return false;
        }
      }

      // Date filter
      if (criteria.startDate) {
        const propertyDate = new Date(property.added);
        const startDate = new Date(criteria.startDate);
        startDate.setHours(0, 0, 0, 0);
        propertyDate.setHours(0, 0, 0, 0);
        if (propertyDate < startDate) return false;
      }

      if (criteria.endDate) {
        const propertyDate = new Date(property.added);
        const endDate = new Date(criteria.endDate);
        endDate.setHours(23, 59, 59, 999);
        propertyDate.setHours(0, 0, 0, 0);
        if (propertyDate > endDate) return false;
      }

      return true;
    });

    console.log("Filtered results:", filtered.length);
    setResults(filtered);
  }

  function addToFavourites(property) {
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  }

  function removeFromFavourites(id) {
    setFavourites(favourites.filter(fav => fav.id !== id));
  }

  function clearFavourites() {
    setFavourites([]);
  }

  // Handle drop on favourites container
  function handleDropOnFavourites(e) {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      addToFavourites(property);
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🏠 Estate Agent Search</h1>
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
              
              {/* Wrap FavouritesList with drop zone for adding */}
              <div 
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "copy";
                }}
                onDrop={handleDropOnFavourites}
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
                <p>No properties found. Try different filters.</p>
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