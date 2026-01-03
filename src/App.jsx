import { useState } from "react";
import properties from "./data/properties.json";
import SearchForm from "./components/SearchForm.jsx";
import PropertyCard from "./components/PropertyCard.jsx";
import PropertyDetails from "./components/PropertyDetails.jsx";
import FavouritesList from "./components/FavouritesList.jsx"; // ADD THIS
import "./App.css";

function App() {
  const [results, setResults] = useState(properties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favourites, setFavourites] = useState([]);

  function handleSearch(criteria) {
    let filtered = properties.filter((property) => {
      if (criteria.type && criteria.type !== "any" && property.type !== criteria.type) {
        return false;
      }

      if (criteria.minPrice && property.price < criteria.minPrice) {
        return false;
      }

      if (criteria.maxPrice && property.price > criteria.maxPrice) {
        return false;
      }

      if (criteria.minBeds && property.bedrooms < criteria.minBeds) {
        return false;
      }

      if (criteria.maxBeds && property.bedrooms > criteria.maxBeds) {
        return false;
      }

      if (criteria.postcode && !property.postcode.startsWith(criteria.postcode)) {
        return false;
      }

      // Date filtering
      const propertyDate = new Date(property.added);
      
      if (criteria.startDate) {
        const startDate = new Date(criteria.startDate);
        if (propertyDate < startDate) return false;
      }
      
      if (criteria.endDate) {
        const endDate = new Date(criteria.endDate);
        if (propertyDate > endDate) return false;
      }

      return true;
    });

    setResults(filtered);
  }

  function addToFavourites(property) {
    const exists = favourites.find((fav) => fav.id === property.id);
    if (!exists) {
      setFavourites([...favourites, property]);
      alert(`Added "${property.shortDescription}" to favourites!`);
    }
  }

  function removeFromFavourites(id) {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  }

  function clearFavourites() {
    setFavourites([]);
  }

  // Simple drag and drop
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("text/plain");
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      addToFavourites(property);
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
                onDragOver={handleDragOver}
                onDrop={handleDrop}
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