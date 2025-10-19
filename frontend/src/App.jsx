import React, { useEffect, useState } from "react";
import useDistanceStore from "./store/useDistanceStore";

import Block from "./Loaders/Block";
import Threedots from "./Loaders/ThreeDots";

function App() {
  const { distances, addDistance, setSelectedDistance, selectedDistance } =
    useDistanceStore();
    
  const [view, setView] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/data")
        .then((res) => res.text())
        .then((text) => {
          const match = text.match(/(\d+)/);
          if (match) {
            const value = Number(match[1]);

            // Update Zustand store
            addDistance(value);
            setSelectedDistance(value);

            // Update button view
            if (value > 50) setView(false);
            else setView(true);
          }
        })
        .catch((err) => console.error(err));
    };

    fetchData(); 
    const interval = setInterval(fetchData, 1000); 
    return () => clearInterval(interval);
  }, [addDistance, setSelectedDistance]);

  return (
    <div className="p-4">
      <h1 className="text-green-500 text-2xl mb-4">
        Current Value: {selectedDistance}
      </h1>

      <button
        disabled={view}
        className={`w-[200px] h-[60px] bg-green-500 text-white font-bold rounded ${
          view ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
        }`}
      >
        Move
      </button>

      <div className="mt-4">
        <h2 className="text-xl">All Distances:</h2>
        <ul>
          {distances.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
      
    <Block/>
    <Threedots/>
    </div>
  );
}

export default App;
