import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ExoticOrchid from "../assets/ExoticOrchid.jpeg";
import PremiumSection from "../assets/PremiumSection.jpeg";
import SpecialOffer from "../assets/Special Offer.jpeg";
import PhalaenopsisOrchid from "../assets/PhalaenopsisOrchid.jpg";
import CattleyaOrchid from "../assets/CattleyaOrchid.jpg";
import DendrobiumOrchid from "../assets/Dendrobium Orchid.jpeg";
import "../styles/Home.css";

const slides = [
  {
    url: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg",
    title: "Exquisite Orchid Collection",
    description:
      "Discover our curated selection of rare and prestigious orchids, each handpicked for their extraordinary beauty and elegance.",
  },
  {
    url: "https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg",
    title: "Luxury Orchid Arrangements",
    description:
      "Elevate your space with our bespoke orchid arrangements, crafted with meticulous attention to detail and artistic vision.",
  },
  {
    url: "https://images.pexels.com/photos/931158/pexels-photo-931158.jpeg",
    title: "Exclusive Collections",
    description:
      "Experience our limited-edition orchid collections, featuring the most sought-after varieties from renowned cultivators.",
  },
];

const featuredItems = [
  {
    title: "Royal Phalaenopsis",
    description:
      "Our signature moth orchid, cultivated to perfection. Each bloom exemplifies pure sophistication and timeless grace.",
    image: "https://images.pexels.com/photos/4273440/pexels-photo-4273440.jpeg",
  },
  {
    title: "Imperial Cattleya",
    description:
      "The crown jewel of our collection, featuring opulent blooms with intense fragrance and rich, vibrant hues.",
    image: "https://images.pexels.com/photos/4273437/pexels-photo-4273437.jpeg",
  },
  {
    title: "Noble Dendrobium",
    description:
      "A masterpiece of nature, featuring cascading flowers that create an ethereal waterfall of elegant beauty.",
    image: "https://images.pexels.com/photos/4273438/pexels-photo-4273438.jpeg",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="slider-container">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="slide"
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1,
              }}
              transition={{ duration: 0.5 }}
              style={{ display: currentSlide === index ? "block" : "none" }}
            >
              <img src={slide.url} alt={slide.title} className="slide-image" />
              <div className="slide-overlay">
                <motion.div
                  className="slide-content"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <motion.button
                    className="btn-shop-now"
                    onClick={() => navigate("/shop")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Shop Now
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Featured Collections
        </motion.h2>
        <div className="featured-grid">
          {featuredItems.map((item, index) => (
            <motion.div
              key={index}
              className="featured-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <motion.button
                  className="btn-buy-now"
                  onClick={() => navigate("/shop")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
