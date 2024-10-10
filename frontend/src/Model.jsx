import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

function Model() {
  const [prediction, setPrediction] = useState('');
  const labels = ['A', 'B', 'L'];
  const bgRef = useRef(null);
  const titleRef = useRef(null);

  const fetchPrediction = async () => {
    try {
      const response = await fetch('http://localhost:8080/get_prediction');
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchPrediction, 1000);

    if (bgRef.current) {
      bgRef.current.style.background = 'linear-gradient(135deg, #001f3f, #003366, #004080)';
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current.children, { opacity: 0, y: -30 });
      gsap.to(titleRef.current.children, {
        duration: 1,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bgRef}
      className="w-full h-screen flex items-center justify-center"
    >
      <div className="text-center max-w-3xl mx-auto bg-white bg-opacity-40 backdrop-blur-md p-6 rounded-lg shadow-lg h-[95%] w-[50%]">
        <h1 ref={titleRef} className="text-3xl font-bold mb-8 mt-8">
          <span>Real-Time </span>
          <span className="text-purple-400 shadow-purple-500">Sign </span>
          <span className="text-indigo-400 shadow-indigo-500">Language </span>
          <span>Detection</span>
        </h1>
        <div className="relative w-full pb-[56.25%] mb-8">
          <img
            src="http://localhost:8080/video_feed"
            alt="Video feed"
            className="absolute top-0 left-0 w-full h-full object-contain border border-black"
          />
        </div>
        <h2 className="text-xl font-semibold mb-4">Prediction: {prediction}</h2>
        <div>
          <p className="mb-4">Model is trained on the following labels:</p>
          <ul className="flex justify-center space-x-4">
            {labels.map((label) => (
              <li
                key={label}
                className={`inline-block px-4 py-2 rounded-lg ${
                  prediction === label ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Model;
