import { useState } from "react";

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="image-gallery">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className="image-gallery">
      <div className="main-image-container">
        <img
          src={images[selectedImage] || "https://via.placeholder.com/800x500"}
          alt={`Property view ${selectedImage + 1}`}
          className="main-image"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%231a73e8'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EProperty Image%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      <div className="thumbnail-container">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumbnail ${index === selectedImage ? "active" : ""}`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={img || "https://via.placeholder.com/100x75"}
              alt={`Thumbnail ${index + 1}`}
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%231a73e8'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EProperty Image%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
