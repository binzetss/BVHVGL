import React, { useState, useEffect, useRef } from "react";
import "./LazyImage.css";

// Component cho <img> tags thông thường
export const LazyImage = ({ 
  src, 
  alt = "", 
  className = "", 
  style = {},
  onLoad,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e5e5e5' width='400' height='300'/%3E%3C/svg%3E"
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageSrc === placeholder) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Load trước 100px
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, imageSrc, placeholder]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
      onLoad={handleLoad}
      style={{
        transition: 'opacity 0.4s ease, filter 0.4s ease',
        opacity: isLoaded ? 1 : 0.7,
        filter: isLoaded ? 'none' : 'blur(5px)',
        ...style
      }}
    />
  );
};

// Component cho background images
export const LazyBackground = ({ 
  imageUrl, 
  children, 
  className = "",
  style = {}
}) => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const divRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !bgLoaded) {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => setBgLoaded(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: "150px",
        threshold: 0.01
      }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [imageUrl, bgLoaded]);

  return (
    <div
      ref={divRef}
      className={`lazy-bg ${className}`}
      style={{
        backgroundImage: bgLoaded ? `url(${imageUrl})` : 'none',
        backgroundColor: bgLoaded ? 'transparent' : '#e5e5e5',
        transition: 'background-color 0.5s ease, opacity 0.5s ease',
        opacity: bgLoaded ? 1 : 0.8,
        ...style
      }}
    >
      {children}
    </div>
  );
};