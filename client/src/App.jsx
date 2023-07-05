import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function App() {
  const [images, setImages] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filesFromBackend, setFilesFromBackend] = useState(true); // Different type of src attribute according to front-end or back-end
  const [docTitle, setDocTitle] = useState("Image Viewer");

  // Image displayer
  const previousElement = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const nextElement = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && currentIndex > 0) {
        previousElement();
      } else if (
        event.key === "ArrowRight" &&
        currentIndex < images.length - 1
      ) {
        nextElement();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, images]);

  // Fetch images from server
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-default-images")
      .then((res) => res.json())
      .then((data) => setImages(data.result));
    setFilesFromBackend(true);
  }, []);

  // Fetch images from user folder
  const handleFolderChange = (event) => {
    const files = event.target.files;
    setFilesFromBackend(false);

    let imageList = [];
    const reader = new FileReader();

    const loadNextImage = (index) => {
      if (index >= files.length) {
        // All images loaded
        const imageArray = Array.from(imageList);
        setImages(imageArray);
        setCurrentIndex(0);
        setDocTitle(files[0].webkitRelativePath.split("/")[0]);
        return;
      }

      const file = files[index];
      reader.onload = (e) => {
        imageList.push(e.target.result);
        loadNextImage(index + 1);
      };

      reader.readAsDataURL(file);
    };

    loadNextImage(0);
  };

  // Get number of elements to display
  let numberOfElements;
  if (images === undefined) numberOfElements = 0;
  else numberOfElements = Object.keys(images).length;

  // Render all images and displays the first one
  function renderImages() {
    document.title = docTitle;
    if (filesFromBackend) {
      return images.map((value, index) => (
        <img
          className="display-image"
          style={{
            display: index === currentIndex ? "block" : "none",
            height: window.innerHeight - 20,
          }}
          id={"image-" + index}
          src={`data:image/webp;base64,${value}`}
          key={"image-" + index}
        />
      ));
    } else {
      return images.map((value, index) => (
        <img
          className="display-image"
          style={{
            display: index === currentIndex ? "block" : "none",
            height: window.innerHeight - 20,
          }}
          id={"image-" + index}
          src={value}
          key={"image-" + index}
        />
      ));
    }
  }

  return (
    <div className="display-page">
      <div className="display-images">
        {typeof images === "undefined" ? <h1>Loading...</h1> : renderImages()}
      </div>
      <Navbar
        previousElement={previousElement}
        nextElement={nextElement}
        currentIndex={currentIndex}
        totalElements={numberOfElements}
        onFolderChange={handleFolderChange}
      />
    </div>
  );
}
