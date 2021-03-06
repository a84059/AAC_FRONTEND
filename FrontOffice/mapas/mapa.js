let map;
let currentLocationMarker;
let markerPositions = [
  {lat: 41.443736, lng: -8.292710},
];
let directionsService;
let directionsDisplay;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 41.443736, lng: -8.292710},
      zoom: 18
  });

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({map: map});

  addMarkers(markerPositions);
  map.addListener('click', setCurrentLocation);
}

function setCurrentLocation(e) {
  if (!currentLocationMarker) {
    currentLocationMarker = new google.maps.Marker({
      position: e.latLng,
      map: map,
      label: 'Eu'
    });
  } else {
    currentLocationMarker.setPosition(e.latLng);
  }
}

function addMarkers(positions) {
  positions.forEach(position => {
    let marker = new google.maps.Marker({
      position: position,
      map: map
    })
    marker.addListener('click', () => getRoute(position));
  })
}

function getRoute(position) {
  if (!currentLocationMarker) return alert('Clique no mapa indicando a sua posição atual e de seguida na AAC!')
  directionsService.route({
    origin: currentLocationMarker.position,
    destination: position,
    travelMode: 'WALKING'
  }, (result, status) => {
    if (status !== 'OK') return alert(`Error: ${status}`);
    directionsDisplay.setDirections(result);
  });
}
