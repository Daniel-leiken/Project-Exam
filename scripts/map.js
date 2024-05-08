const mapContainer = document.getElementById('map');

try {
  // Initialize and add the map
  var map = L.map('map').setView([59.9139, 10.7522], 13); // Oslo coordinates and zoom level

  // Add OpenStreetMap tiles to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(map);
} catch (error) {
  console.error('Error initializing map:', error);
  displayMapErrorMessage();
}

function displayMapErrorMessage() {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = 'An error occurred while loading the map. Please try again later.';
  errorMessage.classList.add('error-message');
  mapContainer.appendChild(errorMessage);
}
