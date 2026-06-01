"use client"

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-[60px] h-[34px]" />; // Placeholder

  const isDark = theme === 'dark';

  return (
    <StyledWrapper>
      <label className="switch">
        <input 
          id="input" 
          type="checkbox" 
          checked={isDark}
          onChange={() => setTheme(isDark ? 'light' : 'dark')} 
        />
        <div className="slider round">
          <div className="sun-moon">
            {/* MOON DOTS (Visible in Dark Mode) */}
            <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            
            {/* LIGHT RAYS (Glow effect) */}
            <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            
            {/* CLOUDS */}
            <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
            <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100"><circle cx={50} cy={50} r={50} /></svg>
          </div>
          <div className="stars">
            {/* STARS (Visible in Dark Mode) */}
            {[1, 2, 3, 4].map((num) => (
              <svg key={num} id={`star-${num}`} className="star" viewBox="0 0 20 20">
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
              </svg>
            ))}
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    transform: scale(0.85); /* Slightly shrunken to fit better in Navbar */
  }

  .switch #input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2196f3;
    transition: 0.4s;
    z-index: 0;
    overflow: hidden;
  }

  .sun-moon {
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #ffeb3b;
    transition: 0.4s;
    z-index: 2;
  }

  #input:checked + .slider {
    background-color: #1a1a1a;
  }

  #input:checked + .slider .sun-moon {
    transform: translateX(26px);
    background-color: #f5f5f5;
  }

  .moon-dot {
    opacity: 0;
    transition: 0.4s;
    fill: #cbd5e1;
    position: absolute;
  }

  #input:checked + .slider .sun-moon .moon-dot {
    opacity: 1;
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round .sun-moon {
    border-radius: 50%;
  }

  /* Dot positions */
  #moon-dot-1 { width: 6px; height: 6px; top: 3px; left: 10px; }
  #moon-dot-2 { width: 10px; height: 10px; top: 10px; left: 2px; }
  #moon-dot-3 { width: 3px; height: 3px; top: 18px; left: 16px; }

  /* Ray effects */
  .light-ray {
    position: absolute;
    fill: white;
    opacity: 0.1;
    z-index: -1;
  }
  #light-ray-1 { width: 43px; height: 43px; left: -8px; top: -8px; }
  #light-ray-2 { width: 55px; height: 55px; left: -14px; top: -14px; }
  #light-ray-3 { width: 60px; height: 60px; left: -18px; top: -18px; }

  /* Cloud Animations */
  .cloud-light, .cloud-dark {
    position: absolute;
    animation: cloud-move 6s infinite ease-in-out;
  }
  .cloud-light { fill: #fff; }
  .cloud-dark { fill: #cbd5e1; animation-delay: 1s; }

  #cloud-1 { left: 30px; top: 15px; width: 40px; }
  #cloud-2 { left: 44px; top: 10px; width: 20px; }
  #cloud-3 { left: 18px; top: 24px; width: 30px; }
  #cloud-4 { left: 36px; top: 18px; width: 40px; }
  #cloud-5 { left: 48px; top: 14px; width: 20px; }
  #cloud-6 { left: 22px; top: 26px; width: 30px; }

  @keyframes cloud-move {
    0%, 100% { transform: translateX(0px); }
    50% { transform: translateX(5px); }
  }

  /* Stars */
  .stars {
    transform: translateY(-32px);
    opacity: 0;
    transition: 0.4s;
  }

  .star {
    fill: #fff;
    position: absolute;
    animation: star-twinkle 2s infinite ease-in-out;
  }

  #input:checked + .slider .stars {
    transform: translateY(0);
    opacity: 1;
  }

  #star-1 { width: 15px; top: 4px; left: 6px; animation-delay: 0.3s; }
  #star-2 { width: 5px; top: 18px; left: 8px; }
  #star-3 { width: 10px; top: 22px; left: 14px; animation-delay: 0.6s; }
  #star-4 { width: 14px; top: 2px; left: 22px; animation-delay: 1.3s; }

  @keyframes star-twinkle {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(0.7); opacity: 0.5; }
  }

  @keyframes rotate-center {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  }
`;

export default ThemeToggle;