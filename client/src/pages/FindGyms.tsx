import  { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { apiUrl } from "../utils"
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';

type iposition = [number, number]

interface GymFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    name?: string;
    [key: string]: any;
  };
}

function FindGyms() {
    const [position, setPosition] = useState<iposition | null>(null)
    const [gyms, setGyms] = useState<GymFeature[] | []>([])
   
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try{
    const lat = pos.coords.latitude
                const long = pos.coords.longitude
                setPosition([lat,long])

                const res = await axios.get(apiUrl+'gym', {
                        params:{lat, long}
                });
                console.log('The data has been fetched,',res.data);
                setGyms(res.data.features || []);
                } catch(error){
                    console.log('There was an error in fetching the backend data', error);
                }
            
            }
        )
    }, [])

  return (
     <div className='bg-black text-white p-5'>
        <Link to="/home">
        <IoArrowBackOutline className="text-red-500 hover:text-red-700 text-2xl" />
      </Link>
      <h1 className="text-center p-2 text-3xl">Nearby Gyms</h1>
      {position && (
        <MapContainer center={position} zoom={14} style={{ height: '90vh' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>

          {gyms.map((gym, index) => (
            <Marker
              key={index}
              position={[
                gym.geometry.coordinates[1],
                gym.geometry.coordinates[0]
              ]}
              icon={L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [25, 25]
              })}
            >
              <Popup>{gym.properties.name || 'Gym'}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}

export default FindGyms