"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const categories = [
  "Flower", "Concentrates", "Vapes", "Edibles", "Topicals",
  "Tinctures", "Wellness", "Accessories", "Product Deals",
  "Specialty Cannabinoids", "Pre-Rolls", "Deals"
];

const getRandomPrice = () => (Math.random() * 50 + 10).toFixed(2);

const cannabisImages = [
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
];

function SampleCard({ id, title, onAdd }) {
  const price = getRandomPrice();
  const image = cannabisImages[Math.floor(Math.random() * cannabisImages.length)];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <div className="bg-blue-100 rounded-2xl shadow-md overflow-hidden flex flex-col">
        <img src={image} alt="Cannabis" className="w-full h-[150px] object-cover" />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="text-lg font-semibold text-blue-900 truncate">{title}</div>
          <div className="text-sm text-blue-700 mt-1">THC: 25% | Hybrid</div>
          <div className="text-md font-semibold text-blue-900 mt-2">${price}</div>
          <button onClick={() => onAdd({ id, title, price: parseFloat(price), image })} className="mt-3 bg-blue-600 text-white rounded-md py-1 px-3 hover:bg-blue-700 transition">Add to Cart</button>
        </div>
      </div>
    </motion.div>
  );
}

export default function POSLayout() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const canvasRef = useRef(null);

  const addToCart = (product) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[product.id]) {
        newCart[product.id].quantity += 1;
      } else {
        newCart[product.id] = { ...product, quantity: 1 };
      }
      return newCart;
    });
    setCartOpen(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    draw();
  }, [cartOpen]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 relative">
      <h1 className="text-xl font-bold mb-4 text-blue-900">POS Layout</h1>
      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-800">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3).keys()].map((i) => (
              <SampleCard
                key={`${cat}-${i}`}
                id={`${cat}-${i}`}
                title={`${cat} Product ${i + 1}`}
                onAdd={addToCart}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
