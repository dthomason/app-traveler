import axios from 'axios';
import Config from 'react-native-config';

export const unsplash = axios.create({
  headers: {
    Authorization: `Client-ID ${Config.UNSPLASH_ACCESS_KEY}`,
  },
});
