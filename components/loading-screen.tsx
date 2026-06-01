"use client"

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const LoadingScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [percent, setPercent] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Speed up percent counter (Reduced interval from 25ms to 12ms)
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 12);

    // Total visibility time reduced by 50% (From 3800ms to 1900ms)
    const fadeTimeout = setTimeout(() => {
      setIsFadingOut(true);
      // Faster exit transition (From 800ms to 400ms)
      setTimeout(() => setShouldRender(false), 400);
    }, 1900);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, []);

  if (!mounted || !shouldRender) return null;

  return (
    <StyledWrapper className={isFadingOut ? 'fade-out' : ''}>
      <div className="center-container">
        {/* Top: Animated Book */}
        <div className="loader-icon">
          <div className="book-shape">
            <ul>
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle: Brand Name */}
        <h1 className="brand-title">CPI</h1>

        {/* Bottom: Progress Section */}
        <div className="progress-section">
          <div className="stats">
            <span className="percent-text">{percent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <p className="tagline">TECHNICAL EXCELLENCE</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #050505;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Faster fade transition */
  transition: opacity 0.4s ease, visibility 0.4s;

  &.fade-out {
    opacity: 0;
    visibility: hidden;
  }

  .center-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }

  /* Animated Book Styles */
  .loader-icon {
    margin-bottom: 30px;
    width: 140px;
    height: 100px;
    perspective: 600px;
  }

  .book-shape {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 10px;
    position: relative;
    box-shadow: 0 15px 35px rgba(29, 78, 216, 0.3);
  }

  .book-shape ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .book-shape ul li {
    position: absolute;
    top: 10px;
    left: 10px;
    transform-origin: 100% 50%;
    /* Speed up book flip from 3s to 1.5s */
    animation: flip 1.5s ease infinite;
    transform: rotateY(180deg);
    opacity: 0;
  }

  .book-shape ul li svg {
    width: 60px;
    height: 80px;
    color: rgba(255, 255, 255, 0.2);
  }

  .book-shape ul li:first-child { transform: rotateY(0deg); opacity: 1; }
  .book-shape ul li:last-child { opacity: 1; }

  @keyframes flip {
    0% { transform: rotateY(180deg); opacity: 0; }
    20% { opacity: 1; }
    50%, 100% { transform: rotateY(0deg); opacity: 0; }
  }

  /* Faster staggered delays */
  .book-shape ul li:nth-child(2) { animation-delay: 0.1s; }
  .book-shape ul li:nth-child(3) { animation-delay: 0.2s; }
  .book-shape ul li:nth-child(4) { animation-delay: 0.3s; }
  .book-shape ul li:nth-child(5) { animation-delay: 0.4s; }

  /* Brand Text */
  .brand-title {
    font-size: 5rem;
    font-weight: 900;
    margin: 0;
    padding: 0;
    line-height: 1;
    letter-spacing: -2px;
    background: linear-gradient(to bottom, #ffffff 30%, #93c5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Progress Section */
  .progress-section {
    width: 100%;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stats {
    margin-bottom: 8px;
  }

  .percent-text {
    font-family: monospace;
    font-size: 1.2rem;
    font-weight: bold;
    color: #3b82f6;
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }

  .progress-track {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    background: #3b82f6;
    box-shadow: 0 0 15px #3b82f6;
    transition: width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .tagline {
    margin-top: 20px;
    font-size: 0.65rem;
    letter-spacing: 0.8em;
    color: #4b5563;
    font-weight: 600;
  }
`;

export default LoadingScreen;