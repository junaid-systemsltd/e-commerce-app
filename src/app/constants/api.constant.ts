export const BASE_URL = 'https://api.escuelajs.co/api/v1';

// ADMIN ENDPOINTS
export const GET_ALL_USERS_ENDPOINT = BASE_URL + '/users';

// AUTH ENDPOINTS
export const LOGIN_ENDPOINT = BASE_URL + '/auth/login';
export const PROFILE_ENDPOINT = BASE_URL + '/auth/profile';

// PRODUCTS ENDPOINT
export const GET_ALL_PRODUCTS_ENDPOINT =
  BASE_URL + '/products/?offset=0&limit=10';
