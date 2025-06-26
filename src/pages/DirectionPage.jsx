import React, { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  Polyline,
} from '@react-google-maps/api';
import { motion } from 'framer-motion';

const containerStyle = {
  width: '100%',
  height: '480px',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const polylineOptions = {
  strokeColor: '#5a3ea1',
  strokeOpacity: 0.9,
  strokeWeight: 7,
  icons: [
    {
      icon: {
        path: window.google?.maps?.SymbolPath?.FORWARD_CLOSED_ARROW || 'M 0,-1 0,1',
        scale: 5,
        strokeColor: '#5a3ea1',
        strokeWeight: 3,
        fillColor: '#5a3ea1',
        fillOpacity: 1,
      },
      offset: '0',
      repeat: '50px',
    },
  ],
  clickable: false,
  zIndex: 1,
};

function DirectionPage() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [request, setRequest] = useState(null);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setErrorMsg('Access to location denied.');
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Call directions on origin or destination change
  useEffect(() => {
    if (!origin || !destination) {
      setDirectionsResponse(null);
      return;
    }

    // Setup directions request for DirectionsService component
    setRequest({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: 'BEST_GUESS',
      },
    });
  }, [origin, destination]);

  // Periodically update current position
  useEffect(() => {
    if (!navigator.geolocation) return;

    intervalRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          setErrorMsg('Failed to update location.');
        },
        { enableHighAccuracy: true }
      );
    }, 10_000); // Update every 10 seconds

    return () => clearInterval(intervalRef.current);
  }, []);

  const onDirectionsCallback = (res) => {
    if (res !== null && res.status === 'OK') {
      setDirectionsResponse(res);
    } else if (res !== null) {
      setErrorMsg('Failed to fetch directions.');
      setDirectionsResponse(null);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 max-w-screen-lg mx-auto text-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-900">
        Real-time Directions
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8"
      >
        <input
          type="text"
          placeholder="Enter origin address or place"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="rounded-lg p-3 border border-indigo-300 focus:outline-indigo-400 focus:ring-2 transition text-lg"
          aria-label="Origin input"
        />

        <input
          type="text"
          placeholder="Enter destination address or place"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="rounded-lg p-3 border border-indigo-300 focus:outline-indigo-400 focus:ring-2 transition text-lg"
          aria-label="Destination input"
        />
      </form>

      {errorMsg && (
        <p className="text-center text-red-600 font-semibold mb-4" role="alert">
          {errorMsg}
        </p>
      )}

      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition || defaultCenter}
          zoom={currentPosition ? 14 : 10}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {/* User position marker */}
          {currentPosition && (
            <Marker
              position={currentPosition}
              label={{
                text: 'You',
                color: 'white',
                fontWeight: 'bold',
              }}
              icon={{
                path: window.google?.maps?.SymbolPath.CIRCLE,
                fillOpacity: 1,
                fillColor: '#6f42c1',
                strokeOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2,
                scale: 8,
              }}
            />
          )}

          {/* Directions Service for requesting directions */}
          {request && (
            <DirectionsService
              options={request}
              callback={onDirectionsCallback}
            />
          )}

          {/* Directions Renderer to display route */}
          {directionsResponse && (
            <>
              <DirectionsRenderer directions={directionsResponse} />
              {/* Polyline with arrows for enhanced directions visualization */}
              <Polyline
                path={directionsResponse.routes[0].overview_path}
                options={polylineOptions}
              />
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </motion.div>
  );
}

export default DirectionPage;