import React from "react";
import { Carousel } from "antd";
import styles from "../styles/customCarousel.module.css";

interface CarouselItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

interface CustomCarouselProps {
  heading: string;
  items: CarouselItem[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ heading, items }) => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.heading}>{heading}</h2>

      <Carousel className={styles.styledCarousel} {...carouselSettings}>
        {items.map((item) => (
          <div key={item.id} className={styles.carouselItemWrapper}>
            <div className={styles.card}>

              <div className={`${styles.cardFace} ${styles.cardFront}`}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={styles.cardImage}
                />
              </div>

              <div className={`${styles.cardFace} ${styles.cardBack}`}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardContent}>{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
