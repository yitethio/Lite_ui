import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  zoom: number;
  h: any;
  destination: any;
  origin: any;
}

const MapComponent: React.FC<MapProps> = ({ zoom, h, origin, destination }) => {
  const mapRefi: any = useRef();

  let center = [9.010947259288999, 38.761515309323606];

  const markerIcon = new L.Icon({
    iconUrl: "/location.svg",
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });
  const originIcon = new L.Icon({
    iconUrl: "/bluelocation.svg",
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });

  let [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onError = (error: any) => {
    alert("Geolocation is not supported");
    setLocation({
      ...location,
      loaded: false,
    });
  };

  const onSuccess = (exactLocation: any) => {
    console.log({
      message: "exactLocation",
      loaded: exactLocation.loaded,
      lat: exactLocation.coords.latitude,
      lng: exactLocation.coords.longitude,
      location,
    });
    setLocation({
      ...location,
      loaded: true,
      coordinates: {
        lat: exactLocation.coords.latitude,
        lng: exactLocation.coords.longitude,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    const trackGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    // Start tracking geolocation every 5 seconds
    const intervalId = setInterval(trackGeolocation, 5000);

    return () => clearInterval(intervalId);
  }, [
    location.loaded,
    location.coordinates.lat,
    location.coordinates.lng,
    navigator.geolocation,
  ]);
  return (
    <>
      <MapContainer
        center={center as any}
        zoom={zoom}
        ref={mapRefi}
        style={{ height: `${h}vh`, width: "100%" }}
      >
        {origin.lat && origin.lon && (
          <Marker icon={originIcon} position={[origin.lat, origin.lon]} />
        )}
        {destination.lat && destination.lon && (
          <Marker
            icon={markerIcon}
            position={[destination.lat, destination.lon]}
          />
        )}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution={osm.maptiler.attribution}
        />
      </MapContainer>
    </>
  );
};

export default MapComponent;
