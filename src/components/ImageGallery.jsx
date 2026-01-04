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
              "https://placehold.co/800x500/1a73e8/ffffff?text=Property+View";
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
                  "https://placehold.co/800x500/1a73e8/ffffff?text=Property+View";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
