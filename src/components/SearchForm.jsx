import { useState } from "react";
import { DropdownList, NumberPicker, DateTimePicker } from "react-widgets";
import "react-widgets/styles.css";

function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    type: "any",
    postcode: "",
    minPrice: null,
    maxPrice: null,
    minBeds: null,
    maxBeds: null,
    startDate: null,
    endDate: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleReset = () => {
    const resetData = {
      type: "any",
      postcode: "",
      minPrice: null,
      maxPrice: null,
      minBeds: null,
      maxBeds: null,
      startDate: null,
      endDate: null,
    };
    setFormData(resetData);
    onSearch(resetData);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>🔍 Search Properties</h2>

      <div className="form-group">
        <label>Property Type</label>
        <select
          className="styled-input"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="any">Any Type</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="Bungalow">Bungalow</option>
        </select>
      </div>

      <div className="form-group">
        <label>Postcode Area</label>
        <input
          type="text"
          className="styled-input"
          placeholder="e.g., BR1, NW1, KT1"
          value={formData.postcode}
          onChange={(e) =>
            setFormData({ ...formData, postcode: e.target.value })
          }
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Min Price (£)</label>
          <NumberPicker
            value={formData.minPrice}
            onChange={(value) => setFormData({ ...formData, minPrice: value })}
            placeholder="Any"
            min={0}
            step={10000}
          />
        </div>
        <div className="form-group">
          <label>Max Price (£)</label>
          <NumberPicker
            value={formData.maxPrice}
            onChange={(value) => setFormData({ ...formData, maxPrice: value })}
            placeholder="Any"
            min={0}
            step={10000}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Min Beds</label>
          <NumberPicker
            value={formData.minBeds}
            onChange={(value) => setFormData({ ...formData, minBeds: value })}
            placeholder="Any"
            min={0}
            max={10}
          />
        </div>
        <div className="form-group">
          <label>Max Beds</label>
          <NumberPicker
            value={formData.maxBeds}
            onChange={(value) => setFormData({ ...formData, maxBeds: value })}
            placeholder="Any"
            min={0}
            max={10}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>From Date</label>
          <DateTimePicker
            value={formData.startDate}
            onChange={(value) => setFormData({ ...formData, startDate: value })}
            placeholder="Select start date"
            includeTime={false}
          />
        </div>
        <div className="form-group">
          <label>To Date</label>
          <DateTimePicker
            value={formData.endDate}
            onChange={(value) => setFormData({ ...formData, endDate: value })}
            placeholder="Select end date"
            includeTime={false}
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          Search Properties
        </button>
        <button type="button" className="btn-secondary" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </form>
  );
}

export default SearchForm;