import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const [distance, setDistance] = useState([]);
  const [val,setValue] = useState(0);
  const [color,setColor] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/data")
        .then((res) => res.text())
        .then((text) => {
          const match = text.match(/(\d+)/); // extract numeric value
          if (match) {
            const value = Number(match[1]);
            setDistance((prev) => [...prev, value]);
            setValue(value);
          }
        })
        .catch((err) => console.error(err));
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert distance array → chart-friendly format
  const chartData = distance.map((val, index) => ({
    time: index + 1, // x-axis = seconds
    distance: val,   // y-axis = sensor value
  }));

  useEffect(()=>{
    if(val<20) setColor(true);
    else setColor(false);

  },[val])

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Arduino Ultrasonic Sensor - Live Distance</h1>
      
      <h2>Current Distance: {val} cm</h2>
     <div
  style={{
    width: "100%",
    height: "10vh",
    backgroundColor: color ? "black" : "white",
  }}
>
  <h1 style={
    {
      color:color?"white":"black"
    }
  }>this is dynamic</h1>
</div>

      <LineChart
        width={700}
        height={350}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          label={{ value: "Time (s)", position: "insideBottom", offset: -5 }}
        />
        <YAxis label={{ value: "Distance (cm)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="distance"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 5, fill: "#8884d8" }} // show points
          isAnimationActive={false} // avoids animation lag in real-time
        />
      </LineChart>
    </div>
  );
}

export default App;
