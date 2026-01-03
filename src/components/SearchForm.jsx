import { useState } from "react";
import { Combobox, NumberPicker, DatePicker } from "react-widgets";
import "react-widgets/styles.css";

function SearchForm({ onSearch }) {
  const [type, setType] = useState("any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [postcode, setPostcode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSearch({
      type,
      minPrice: minPrice ? parseInt(minPrice) : null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
      minBeds: minBeds ? parseInt(minBeds) : null,
      maxBeds: maxBeds ? parseInt(maxBeds) : null,
      postcode,
      startDate,
      endDate,
    });
  }

  function resetForm() {
    setType("any");
    setMinPrice("");
    setMaxPrice("");
    setMinBeds("");
    setMaxBeds("");
    setPostcode("");
    setStartDate("");
    setEndDate("");
    onSearch({});
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <h2>Search Properties</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Property Type</label>
          <Combobox
            data={["any", "House", "Flat"]}
            value={type}
            onChange={setType}
            placeholder="Select type"
          />
        </div>

        <div className="form-group">
          <label>Postcode Area</label>
          <Combobox
            data={["", "BR1", "BR5", "BR6", "NW1", "KT1", "CR0", "IG1"]}
            value={postcode}
            onChange={setPostcode}
            placeholder="e.g., BR1"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Min Price (£)</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Any"
            min="0"
            className="styled-input"
          />
        </div>

        <div className="form-group">
          <label>Max Price (£)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Any"
            min="0"
            className="styled-input"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Min Bedrooms</label>
          <input
            type="number"
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value)}
            placeholder="Any"
            min="0"
            max="10"
            className="styled-input"
          />
        </div>

        <div className="form-group">
          <label>Max Bedrooms</label>
          <input
            type="number"
            value={maxBeds}
            onChange={(e) => setMaxBeds(e.target.value)}
            placeholder="Any"
            min="0"
            max="10"
            className="styled-input"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Added After</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="styled-input"
          />
        </div>

        <div className="form-group">
          <label>Added Before</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="styled-input"
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          Search Properties
        </button>
        <button type="button" onClick={resetForm} className="btn-secondary">
          Clear Filters
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
