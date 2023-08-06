import api from './api';

export async function payTicket(body, token) {
  try {
    const response = await api.post('/payments/process', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;  
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
