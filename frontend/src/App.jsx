import React, { useEffect, useState } from 'react';

function App() {
  const [prediction, setPrediction] = useState('');

  // Function to fetch the latest prediction from Flask
  const fetchPrediction = async () => {
    try {
      const response = await fetch('http://localhost:8080/get_prediction');
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  // Call fetchPrediction periodically (e.g., every 1 second)
  useEffect(() => {
    const interval = setInterval(fetchPrediction, 1000);  // Fetch every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Real-Time Sign Language Detection</h1>

      {/* Video feed from Flask */}
      <div>
        <img
          src="http://localhost:8080/video_feed"
          alt="Video feed"
          style={{ width: '80%', border: '1px solid black' }}
        />
      </div>

      {/* Display the latest prediction */}
      <h2>Prediction: {prediction}</h2>
    </div>
  );
}

export default App;
