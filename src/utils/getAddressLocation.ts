import axios from 'axios';
import { LocationObjectCoords } from 'expo-location';

export async function getAddressLocation({ latitude, longitude }: LocationObjectCoords) {
  try {
    const response = await axios
    .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);

    return response.data;
  } catch (error) {
    console.error('Erro ao recuperar geolocalização:', error);
    return null;
  }
};
