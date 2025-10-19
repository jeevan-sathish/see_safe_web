const express = require("express");
const cors = require("cors");
const { SerialPort, ReadlineParser } = require("serialport");

const app = express();
app.use(cors());

// Change COM3 to your Arduino port (check in Arduino IDE > Tools > Port)
const port = new SerialPort({ path: "COM4", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

let lastValue = "No data yet";

parser.on("data", (data) => {
  console.log("Distance from Arduino:", data);
  lastValue = data;
});

// API endpoint
app.get("/data", (req, res) => {
  res.json({ distance: lastValue });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
