// let simulationRunning = true;
// let simulationInterval;

// // Initialize
// document.addEventListener("DOMContentLoaded", function () {
//   initializeSimulation();

//   // Add subtle hover effect to cards
//   const cards = document.querySelectorAll(".card");
//   cards.forEach((card) => {
//     card.addEventListener("mouseenter", () => {
//       card.style.transform = "translateY(-5px)";
//       card.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4)";
//     });
//     card.addEventListener("mouseleave", () => {
//       card.style.transform = "translateY(0)";
//       card.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
//     });
//   });

//   // Start simulation automatically
//   startSimulation();
// });

// // Simulation functions
// function initializeSimulation() {
//   // Add event listeners to simulation controls
//   document
//     .getElementById("pauseSim")
//     .addEventListener("click", toggleSimulation);
//   document
//     .getElementById("resetSim")
//     .addEventListener("click", resetSimulation);
//   document
//     .getElementById("scenarioSelect")
//     .addEventListener("change", changeScenario);
//   document.getElementById("simSpeed").addEventListener("input", updateSimSpeed);
// }

// function startSimulation() {
//   simulationRunning = true;
//   document.getElementById("pauseSim").innerHTML =
//     '<i class="bi bi-pause-fill"></i> Pause';

//   // Animate IoT elements
//   const iotElements = document.querySelectorAll(".iot-element");
//   iotElements.forEach((el) => {
//     el.style.animation = "pulse 2s infinite";
//   });

//   // Start a simulation interval for changing values
//   simulationInterval = setInterval(() => {
//     updateSensorValues();
//   }, 3000);
// }

// function pauseSimulation() {
//   simulationRunning = false;
//   document.getElementById("pauseSim").innerHTML =
//     '<i class="bi bi-play-fill"></i> Resume';

//   // Stop animations
//   const iotElements = document.querySelectorAll(".iot-element");
//   iotElements.forEach((el) => {
//     el.style.animation = "none";
//   });

//   clearInterval(simulationInterval);
// }

// function toggleSimulation() {
//   if (simulationRunning) {
//     pauseSimulation();
//   } else {
//     startSimulation();
//   }
// }

// function resetSimulation() {
//   // Reset to default values
//   document.getElementById("scenarioSelect").selectedIndex = 0;
//   document.getElementById("simSpeed").value = 5;

//   // Reset sensor values
//   const sensorRows = document.querySelectorAll("table tbody tr");
//   sensorRows.forEach((row, index) => {
//     const statusCell = row.querySelector("td:nth-child(2) span");
//     statusCell.className = "badge bg-success";
//     statusCell.textContent = "Normal";
//   });

//   // Reset specific sensor values
//   const sensorValues = ["342°C", "840 kg/h", "11.3 psi", "0.82 in/s"];

//   sensorRows.forEach((row, index) => {
//     if (index < sensorValues.length) {
//       row.querySelector("td:nth-child(3) span").textContent =
//         sensorValues[index];
//     }
//   });

//   // If simulation is running, restart it
//   if (simulationRunning) {
//     pauseSimulation();
//     startSimulation();
//   }
// }

// function changeScenario() {
//   const scenario = document.getElementById("scenarioSelect").value;
//   const sensorRows = document.querySelectorAll("table tbody tr");

//   // Change sensor values based on scenario
//   switch (scenario) {
//     case "Engine Sensor Alert":
//       // First row is engine temp
//       sensorRows[0].querySelector("td:nth-child(2) span").className =
//         "badge bg-danger";
//       sensorRows[0].querySelector("td:nth-child(2) span").textContent = "Alert";
//       sensorRows[0].querySelector("td:nth-child(3) span").textContent = "389°C";
//       break;
//     case "Weather Deviation":
//       // Change vibration sensor
//       sensorRows[3].querySelector("td:nth-child(2) span").className =
//         "badge bg-warning";
//       sensorRows[3].querySelector("td:nth-child(2) span").textContent =
//         "Warning";
//       sensorRows[3].querySelector("td:nth-child(3) span").textContent =
//         "1.24 in/s";
//       break;
//     case "Optimized Fuel Usage":
//       // Change fuel flow
//       sensorRows[1].querySelector("td:nth-child(2) span").className =
//         "badge bg-info";
//       sensorRows[1].querySelector("td:nth-child(2) span").textContent =
//         "Optimized";
//       sensorRows[1].querySelector("td:nth-child(3) span").textContent =
//         "780 kg/h";
//       break;
//     default:
//       // Reset to normal
//       sensorRows.forEach((row, index) => {
//         const statusCell = row.querySelector("td:nth-child(2) span");
//         statusCell.className = "badge bg-success";
//         statusCell.textContent = "Normal";
//       });

//       // Reset specific sensor values
//       const normalValues = ["342°C", "840 kg/h", "11.3 psi", "0.82 in/s"];

//       sensorRows.forEach((row, index) => {
//         if (index < normalValues.length) {
//           row.querySelector("td:nth-child(3) span").textContent =
//             normalValues[index];
//         }
//       });
//       break;
//   }
// }

// function updateSimSpeed() {
//   const speed = document.getElementById("simSpeed").value;
//   clearInterval(simulationInterval);

//   if (simulationRunning) {
//     // Adjust interval based on speed (lower number = faster updates)
//     const interval = 5000 - speed * 400;
//     simulationInterval = setInterval(() => {
//       updateSensorValues();
//     }, interval);
//   }
// }

// function updateSensorValues() {
//   const sensorRows = document.querySelectorAll("table tbody tr");
//   const scenarioType = document.getElementById("scenarioSelect").value;

//   // Only slightly modify values if not in a specific scenario
//   if (scenarioType === "Normal Flight Conditions") {
//     sensorRows.forEach((row) => {
//       const valueCell = row.querySelector("td:nth-child(3) span");
//       const currentValue = valueCell.textContent;

//       // Extract number and unit
//       const match = currentValue.match(/(\d+\.?\d*)(.+)/);
//       if (match) {
//         let value = parseFloat(match[1]);
//         const unit = match[2];

//         // Random small fluctuation (±2%)
//         const fluctuation = value * (Math.random() * 0.04 - 0.02);
//         value = (value + fluctuation).toFixed(1);

//         // Update the value
//         valueCell.textContent = value + unit;
//       }
//     });
//   } else {
//     // For specific scenarios, make more dramatic changes
//     // For instance, if we're in Engine Sensor Alert, increase engine temp
//     if (scenarioType === "Engine Sensor Alert") {
//       const engineTempCell = sensorRows[0].querySelector(
//         "td:nth-child(3) span"
//       );
//       const currentTemp = parseFloat(engineTempCell.textContent);
//       const newTemp = (currentTemp + (Math.random() * 2 - 0.5)).toFixed(1);
//       engineTempCell.textContent = newTemp + "°C";

//       // If temp goes too high, change status to critical
//       if (newTemp > 395) {
//         const statusCell = sensorRows[0].querySelector("td:nth-child(2) span");
//         statusCell.className = "badge bg-danger";
//         statusCell.textContent = "Critical";
//       }
//     }

//     // Similar logic for other scenarios
//     if (scenarioType === "Weather Deviation") {
//       const vibrationCell = sensorRows[3].querySelector("td:nth-child(3) span");
//       const currentVib = parseFloat(vibrationCell.textContent);
//       // More erratic vibration in bad weather
//       const newVib = (currentVib + (Math.random() * 0.3 - 0.1)).toFixed(2);
//       vibrationCell.textContent = newVib + " in/s";
//     }

//     if (scenarioType === "Optimized Fuel Usage") {
//       const fuelCell = sensorRows[1].querySelector("td:nth-child(3) span");
//       const currentFuel = parseFloat(fuelCell.textContent);
//       // Gradually reduce fuel consumption in optimization mode
//       const newFuel = (currentFuel - Math.random() * 1.5).toFixed(1);
//       // Don't let it go too low
//       fuelCell.textContent = (newFuel < 750 ? 750 : newFuel) + " kg/h";
//     }
//   }

//   // Occasionally update other visual elements in the simulation
//   updateDataVisualizations();
// }

// function updateDataVisualizations() {
//   // Flash the data visualization containers to show activity
//   const dataVizContainers = document.querySelectorAll(".data-viz");
//   dataVizContainers.forEach((container) => {
//     container.style.borderColor = "var(--neon-purple)";
//     setTimeout(() => {
//       container.style.borderColor = "var(--neon-blue)";
//     }, 300);
//   });

//   // Add a timestamp to show when data was last updated
//   const now = new Date();
//   const timeString = now.toLocaleTimeString();

//   // Add or update a timestamp element if it exists
//   let timestamp = document.querySelector(".timestamp");
//   if (!timestamp) {
//     timestamp = document.createElement("div");
//     timestamp.className = "timestamp text-end mt-3";
//     document.querySelector(".simulation-container").appendChild(timestamp);
//   }
//   timestamp.innerHTML = `<small>Last updated: ${timeString}</small>`;
// }

// // Fullscreen function
// function toggleFullscreen() {
//   const simContainer = document.querySelector(".simulation-container");

//   if (!document.fullscreenElement) {
//     if (simContainer.requestFullscreen) {
//       simContainer.requestFullscreen();
//     } else if (simContainer.mozRequestFullScreen) {
//       /* Firefox */
//       simContainer.mozRequestFullScreen();
//     } else if (simContainer.webkitRequestFullscreen) {
//       /* Chrome, Safari and Opera */
//       simContainer.webkitRequestFullscreen();
//     } else if (simContainer.msRequestFullscreen) {
//       /* IE/Edge */
//       simContainer.msRequestFullscreen();
//     }
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.mozCancelFullScreen) {
//       /* Firefox */
//       document.mozCancelFullScreen();
//     } else if (document.webkitExitFullscreen) {
//       /* Chrome, Safari and Opera */
//       document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) {
//       /* IE/Edge */
//       document.msExitFullscreen();
//     }
//   }
// }

// // Export simulation data function
// function exportSimulationData() {
//   // Get current sensor data
//   const sensorData = [];
//   const sensorRows = document.querySelectorAll("table tbody tr");

//   sensorRows.forEach((row) => {
//     const sensorName = row.querySelector("td:nth-child(1)").textContent;
//     const status = row.querySelector("td:nth-child(2) span").textContent;
//     const value = row.querySelector("td:nth-child(3) span").textContent;

//     sensorData.push({
//       sensor: sensorName,
//       status: status,
//       value: value,
//       timestamp: new Date().toISOString(),
//     });
//   });

//   // Create a JSON string
//   const dataStr = JSON.stringify(sensorData, null, 2);

//   // Create a blob and download link
//   const blob = new Blob([dataStr], { type: "application/json" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "iot_simulation_data.json";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }
