import React, { useRef, useEffect, useState } from "react";
import Styles from "./Carousel.module.css";

export const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useRef(null);

  // 🚀 Consumir la API al montar el componente
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/get-proxjuegos`); 
        const data = await response.json();

        
        if (data.success) {
        setImages(data.data);
        } else { //este else ya no sería necesasrio,pero bue..lo dejo por la dudas
          console.log("El backend respondió pero success = false");
        }

      } catch (error) {
        console.log("Error cargando próximos juegos:", error);
      }
    };

    fetchImages();
  }, []);

  // Auto-play
  useEffect(() => {
    if (images.length === 0) return;

    const element = slides.current;
    element.style.setProperty('--current-slide', currentIndex - 1);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // cambia cada 3 segundos

    return () => clearInterval(interval); // limpia al desmontar
  }, [currentIndex, images.length]); // para reiniciar el contador al cambiar de imagen manualmente
  

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    
    <div className={Styles["carousel-wrapper"]}>
      <div ref={slides} className={Styles["image-container"]}>
        {images.map((juego) => (
          <img
          key={juego.id}
          src={juego.fotoUrl} 
          alt={juego.nombre}
          className={Styles["image"]}
          />

        ))}
      </div>

      <div className={Styles['dots']}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}          
            className={`${Styles['dot']} ${index === currentIndex && Styles['dot-current']}`}>
          </button>
        ))}
      </div>

      <div className={Styles["gradient-left"]}>
        <button onClick={goToPrevious} className={Styles["arrows"]}>
          &lt;
        </button>
      </div>
      <div className={Styles["gradient-right"]}>
        <button onClick={goToNext} className={Styles["arrows"]}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;

