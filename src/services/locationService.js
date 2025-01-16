import axios from 'axios';

export const getUserLocation = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        const countryCode = response.data.country;
        return countryCode;
    } catch (error) {
        console.error('Error fetching user location:', error);
    }
}
