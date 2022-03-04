import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "react-bootstrap";
import Image from "next/image";

export default function Home() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    fetch("api/readFiles")
      .then((res) => res.json())
      .then((images) => {
        setImages(images);
      });
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((index) => index + 1);
    }, 10000);
    return () => {
      if (timer.current !== null) clearInterval(timer.current);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "rgba(0,0,0, .8)" }}>
      <Carousel fade={true} activeIndex={index}>
        {images.map((imgPath) => (
          <Carousel.Item key={imgPath}>
            <img
              style={{ maxHeight: "100vh", margin: "auto" }}
              className="d-block h-100"
              src={imgPath}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
