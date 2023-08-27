import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Marker } from "@googlemaps/adv-markers-utils";

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <CircularProgress />;
    case Status.FAILURE:
      return <Close />;
  }
};

function MyMapComponent() {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
  // const [map, setMap] = useState(null);
  // const [allLaunchPads, setallLaunchPads] = useState([])
  const getAllLaunchPads = async (map) => {
    const res = await fetch('https://api.spacexdata.com/v3/launchpads')
    const resultLaunchPads = await res.json()
    console.log("launchpads loaded!!");
    // setallLaunchPads(resultLaunchPads)
    initMarkers(map,resultLaunchPads)
  }

  const markers = [];
  
  const ref = useRef();

  function initMarkers(map,launchpads) {
    // var launchpads = allLaunchPads;
    var bounds = new google.maps.LatLngBounds()
    launchpads.forEach((launchpad) => {
      var location = launchpad.location;
      const marker = new Marker({
        position: { lat: location.latitude, lng: location.longitude },
        title: location.name,
        map,
      });
      bounds.extend({ lat: location.latitude, lng: location.longitude })
      markers.push(marker);
    });
    map.fitBounds(bounds)
    console.log("markers initialized");
  }
  // useEffect(() => {
  //   if (map && allLaunchPads.length) {
  //     console.log("initializing markers");
  //     // initMarkers();
  //   }
  // }, [allLaunchPads]);

  useEffect(() => {
    async function init() {
      const { Map } = await google.maps.importLibrary("maps");
      await google.maps.importLibrary("marker");
      var mapEl = document.querySelector('#map')
      var map = new Map(mapEl, {
        center,
        zoom,
        mapId:import.meta.env.VITE_MAP_ID
      });
      // setMap(map); 
      console.log("mapEl -- ",mapEl);
      await getAllLaunchPads(map);
    }
    init()
    // setupMarkers()
  },[]);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
}

export const LaunchesMap = ({ data }) => (
  <Wrapper apiKey={import.meta.env.VITE_MAP_API_KEY} render={render}>
    <MyMapComponent data={data} />
  </Wrapper>
);
