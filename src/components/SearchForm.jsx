import { useState } from "react";
import { Combobox, NumberPicker, DatePicker } from "react-widgets";
import "react-widgets/styles.css";

function SearchForm({ onSearch }) {
  const [type, setType] = useState("any");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minBeds, setMinBeds] = useState(null);
  const [maxBeds, setMaxBeds] = useState(null);
  const [postcode, setPostcode] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const propertyTypes = [
    { value: "any", label: "Any Type" },
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" }
  ];

  const postcodeAreas = ["", "BR1", "BR5", "BR6", "NW1", "KT1", "CR0", "IG1"];

  function handleSubmit(e) {
    e.preventDefault();
    
    onSearch({
      type,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      postcode,
      startDate,
      endDate
    });
  }

  function resetForm() {
    setType("any");
    setMinPrice(null);
    setMaxPrice(null);
    setMinBeds(null);
    setMaxBeds(null);
    setPostcode("");
    setStartDate(null);
    setEndDate(null);
    onSearch({});
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <h2>🔍 Search Properties</h2>

      <div className="form-group">
        <label>Property Type</label>
        <Combobox
          data={propertyTypes}
          valueField="value"
          textField="label"
          value={type}
          onChange={setType}
          placeholder="Select property type"
        />
      </div>

      <div className="form-group">
        <label>Postcode Area</label>
        <Combobox
          data={postcodeAreas}
          value={postcode}
          onChange={setPostcode}
          placeholder="e.g., BR1"
          filter="contains"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Min Price (£)</label>
          <NumberPicker
            value={minPrice}
            onChange={setMinPrice}
            min={0}
            placeholder="Any"
          />
        </div>

        <div className="form-group">
          <label>Max Price (£)</label>
          <NumberPicker
            value={maxPrice}
            onChange={setMaxPrice}
            min={0}
            placeholder="Any"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Min Bedrooms</label>
          <NumberPicker
            value={minBeds}
            onChange={setMinBeds}
            min={0}
            max={10}
            placeholder="Any"
          />
        </div>

        <div className="form-group">
          <label>Max Bedrooms</label>
          <NumberPicker
            value={maxBeds}
            onChange={setMaxBeds}
            min={0}
            max={10}
            placeholder="Any"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Added After</label>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            placeholder="Any date"
            max={new Date()}
          />
        </div>

        <div className="form-group">
          <label>Added Before</label>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            placeholder="Any date"
            max={new Date()}
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