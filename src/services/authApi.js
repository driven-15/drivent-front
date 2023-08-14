import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}

export async function gitHubSignIn(code) {
  const response = await api.post('/auth/login/github', { code });
  return response.data;
}
//
