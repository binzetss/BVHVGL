/**
 * TetBanner.js - Banner chúc mừng năm mới
 * Hiệu ứng: Background full width chạy vào, chữ ở giữa, đứng 10s, mờ dần biến mất
 * Vòng lặp vô tận
 */

import { useState, useEffect } from 'react';
import './TetBanner.css';

// ============ ĐIỀU CHỈNH THỜI GIAN Ở ĐÂY ============
const CONFIG = {
  slideInDuration: 2000,   // 2 giây chạy vào
  stayDuration: 10000,     // 10 giây đứng giữa
  fadeOutDuration: 2000,   // 2 giây mờ dần
  hideDuration: 20000,     // 20 giây nghỉ trước khi lặp lại
};
// ====================================================

const TetBanner = () => {
  const [phase, setPhase] = useState('slideIn');
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let timer1, timer2, timer3, timer4;

    timer1 = setTimeout(() => {
      setPhase('stay');
    }, CONFIG.slideInDuration);

    timer2 = setTimeout(() => {
      setPhase('fadeOut');
    }, CONFIG.slideInDuration + CONFIG.stayDuration);

    timer3 = setTimeout(() => {
      setPhase('hidden');
    }, CONFIG.slideInDuration + CONFIG.stayDuration + CONFIG.fadeOutDuration);

    timer4 = setTimeout(() => {
      setPhase('slideIn');
      setCycle(c => c + 1);
    }, CONFIG.slideInDuration + CONFIG.stayDuration + CONFIG.fadeOutDuration + CONFIG.hideDuration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [cycle]);

  if (phase === 'hidden') return null;

  return (
    <div className={`tet-banner-wrapper phase-${phase}`} key={cycle}>
      {/* Background full width */}
      <div className="tet-banner-bg"></div>

      {/* Chữ ở giữa */}
      <div className="tet-banner-text">
        <span className="tet-icon">🏮</span>
        <div className="tet-content">
          <div className="tet-main-line">
            CHÚC MỪNG NĂM MỚI <span className="tet-year">2026</span>
          </div>
          <div className="tet-sub-line">
            AN KHANG THỊNH VƯỢNG - VẠN SỰ NHƯ Ý
          </div>
        </div>
        <span className="tet-icon">🏮</span>
      </div>
    </div>
  );
};

export default TetBanner;
