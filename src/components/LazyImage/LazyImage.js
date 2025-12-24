import React, { useState, useEffect, useRef } from "react";
import "./LazyImage.css";

/* ============================
   LAZY <img>
============================ */
export const LazyImage = ({
  src,
  alt = "",
  className = "",
  style = {},
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e5e5e5' width='400' height='300'/%3E%3C/svg%3E"
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${className} ${isLoaded ? "loaded" : "loading"}`}
      style={{
        opacity: isLoaded ? 1 : 0.6,
        filter: isLoaded ? "none" : "blur(6px)",
        transition: "opacity 0.4s ease, filter 0.4s ease",
        ...style
      }}
    />
  );
};


/* ============================
   LAZY BACKGROUND DIV
============================ */
export const LazyBackground = ({ 
  imageUrl, 
  children, 
  className = "",
  style = {}
}) => {
  const [loaded, setLoaded] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, [imageUrl]);

  return (
    <div
      ref={boxRef}
      className={`lazy-bg ${className}`}
      style={{
        backgroundImage: loaded ? `url(${imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: loaded ? "transparent" : "#e5e5e5",
        opacity: loaded ? 1 : 0.6,
        transition: "opacity 0.4s ease",
        ...style
      }}
    >
      {children}
    </div>
  );
};
