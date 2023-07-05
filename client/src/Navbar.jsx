import React, { useRef } from "react";

export default function Navbar({
  previousElement,
  nextElement,
  currentIndex,
  totalElements,
  onFolderChange,
}) {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <nav className="navbar">
      <button
        className="nav-button"
        id="nav-prev-button"
        onClick={previousElement}
        disabled={currentIndex === 0}
      >
        &#60;
      </button>
      <button
        className="nav-button"
        id="nav-next-button"
        onClick={nextElement}
        disabled={currentIndex === totalElements - 1}
      >
        &#62;
      </button>
      <button
        className="nav-button"
        id="nav-fold-button"
        onClick={handleButtonClick}
      >
        &#x1F4C1;
      </button>
      <input
        ref={fileInputRef}
        id="folder-input"
        type="file"
        directory=""
        webkitdirectory=""
        accept="image/*"
        onChange={onFolderChange}
        style={{ display: "none" }}
      />
    </nav>
  );
}
