import api from './api';

export async function bookingRoom(body, token) {
  try {
    const response = await api.post('/booking', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;  
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getBooking(token) {
  try {
    const response = await api.get('/booking', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;  
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function updateBooking(body, bookingId, token) {
  try {
    const response = await api.put(`/booking/${bookingId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;  
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
