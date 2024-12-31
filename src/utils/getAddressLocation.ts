import axios from 'axios';

type Props = {
  latitude: number;
  longitude: number;
};

export async function getAddressLocation({ latitude, longitude }: Props) {
  try {
    const response = await axios
    .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);

    return response.data;
  } catch (error) {
    console.error('Erro ao recuperar geolocalização:', error);
    return null;
  }
};
