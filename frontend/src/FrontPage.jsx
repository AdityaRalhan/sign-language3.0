import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { gsap } from 'gsap';

const FrontPage = () => {
  const frontPageRef = useRef(null); // Reference to the div for GSAP animations

  // GSAP animation setup inside useEffect
  useEffect(() => {
    const gradientAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    gradientAnimation.to(frontPageRef.current, {
      background: 'linear-gradient(135deg, #8e44ad, #3498db)',
      duration: 4,
    }).to(frontPageRef.current, {
      background: 'linear-gradient(135deg, #ff6347, #1e90ff)',
      duration: 4,
    }).to(frontPageRef.current, {
      background: 'linear-gradient(135deg, #ffeb3b, #ff5722)',
      duration: 4,
    });
  }, []);

  return (
    <div
  ref={frontPageRef} // Attach the ref to the div for GSAP
  className="w-full h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 rounded-lg shadow-lg flex items-center justify-center"
>
  <div className="h-full w-full flex flex-col items-center justify-center">
    {/* H1 placed above the button */}
    <h1 className="text-white text-4xl mb-8">Real Time Sign Language Detection</h1>
    <Link to="/Model" className='flex items-center justify-center'>
      <button className="text-white px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-600 transform hover:scale-105 transition-transform duration-300 ease-in-out h-[100px] w-[250px] text-2xl">
        Get started
      </button>
    </Link>
  </div>
</div>

  );
  
  }

export default FrontPage
