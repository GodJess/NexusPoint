import './MediaFC.css'


const MediaFilesComponent = ({mediaFiles, isCarouselOpen, setIsCarouselOpen, currentImageIndex, setCurrentImageIndex}) => {

    // Открываем карусель с выбранным изображением
    // Закрываем карусель
    const closeCarousel = () => {
      setIsCarouselOpen(false);
      setCurrentImageIndex(null);
      document.body.style.overflow = 'auto'; // Восстанавливаем скролл
    };
  
    // Переход к предыдущему изображению
    const goToPrev = () => {
      setCurrentImageIndex(prev => 
        prev === 0 ? mediaFiles.length - 1 : prev - 1
      );
    };
  
    // Переход к следующему изображению
    const goToNext = () => {
      setCurrentImageIndex(prev => 
        prev === mediaFiles.length - 1 ? 0 : prev + 1
      );
    };
  
    // Обработчик клавиш (ESC, стрелки)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeCarousel();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    
    if (isCarouselOpen) return (

          <div 
            className="carousel-overlay" 
            onClick={closeCarousel}
            onKeyDown={handleKeyDown}
            tabIndex="0">
            <div className="carousel-container" onClick={e => e.stopPropagation()}>
              <button className="carousel-close" onClick={closeCarousel}>
                &times;
              </button>
              
              <div className="carousel-image-wrapper">
                <img 
                  src={mediaFiles[currentImageIndex].photo} 
                  alt={`Media ${currentImageIndex + 1}`}
                />
              </div>
              
              <button className="carousel-nav prev" onClick={goToPrev}>
                &#10094;
              </button>
              <button className="carousel-nav next" onClick={goToNext}>
                &#10095;
              </button>
              
              <div className="carousel-counter">
                {currentImageIndex + 1} / {mediaFiles.length}
              </div>
            </div>
          </div>
    );
  };
  
  export default MediaFilesComponent;