/**
 * TetEffect.js - Hiệu ứng hoa đào hoa mai rơi nhẹ nhàng - Tết 2026
 * Để tắt: comment import và <TetEffect /> trong App.js
 */

import { useEffect, useState } from 'react';
import './TetEffect.css';

import hoaDaoImg from '../../assets/hoadao.png';
import hoaMaiImg from '../../assets/hoamai.png';

const CONFIG = {
  soLuongHoa: 10,     
  sizeMin: 20,         
  sizeMax: 30,            
  tocDoMin: 25,           
  tocDoMax: 40,            
};
// ==========================================

const TetEffect = () => {
  const [flowers, setFlowers] = useState([]);

  const createFlower = (id) => {
    const isHoaDao = Math.random() > 0.5;
    return {
      id,
      src: isHoaDao ? hoaDaoImg : hoaMaiImg,
      left: Math.random() * 100,
      size: CONFIG.sizeMin + Math.random() * (CONFIG.sizeMax - CONFIG.sizeMin),
      duration: CONFIG.tocDoMin + Math.random() * (CONFIG.tocDoMax - CONFIG.tocDoMin),
      delay: Math.random() * -20,
      sway: 8 + Math.random() * 15,
      opacity: 0.8 + Math.random() * 0.2,
    };
  };

  useEffect(() => {
    const initialFlowers = Array.from({ length: CONFIG.soLuongHoa }, (_, i) => createFlower(i));
    setFlowers(initialFlowers);

    const interval = setInterval(() => {
      setFlowers(prev => {
        const newFlowers = [...prev];
        const randomIndex = Math.floor(Math.random() * newFlowers.length);
        newFlowers[randomIndex] = createFlower(Date.now() + randomIndex);
        return newFlowers;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tet-container">
      {flowers.map((flower) => (
        <img
          key={flower.id}
          src={flower.src}
          alt=""
          className="tet-flower"
          style={{
            left: `${flower.left}%`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            maxWidth: `${flower.size}px`,
            maxHeight: `${flower.size}px`,
            opacity: flower.opacity,
            animationDuration: `${flower.duration}s`,
            animationDelay: `${flower.delay}s`,
            '--sway': `${flower.sway}px`,
          }}
        />
      ))}
    </div>
  );
};

export default TetEffect;
