import React, { useState} from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";
import * as parksData from '../../assets/skateboard.json'
import mapStyle from './mapStyle'

function Map() {
  const [selectedPark, setSelectedPark] = useState(null)
  return(
    <GoogleMap 
    defaultCenter={{lat:45.421532, lng:-75.697189}} 
    defaultZoom={10}
    defaultOptions={{styles:mapStyle}}>

      {parksData.features.map(park =>(
      <Marker  
      key={park.properties.PARK_ID}  
      position={{
        lat: park.geometry.coordinates[1], 
        lng:park.geometry.coordinates[0]
      }}
      onClick={()=>{
        setSelectedPark(park);
      }}
      icon={{
        url:"/skateboard.svg", scaledSize: new window.google.maps.Size(25, 25)
      }}
      />
      ))}
      
      {selectedPark && (
        <InfoWindow 
          position={{
            lat:selectedPark.geometry.coordinates[1], lng:selectedPark.geometry.coordinates[0]
          }}
          onCloseClick={()=>setSelectedPark(null)}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export function Skateboard(props) {

  return (
    <div style={{width:"100vw", height:"100vh"}} >
      <WrappedMap  
     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
     loadingElement={<div style={{ height: `100%` }} />}
     containerElement={<div style={{ height: `100%` }} />}
     mapElement={<div style={{ height: `100%` }} />} />
    </div>
  );
}