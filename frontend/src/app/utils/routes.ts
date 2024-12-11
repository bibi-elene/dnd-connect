export const routes = {
  home: '/',
  dashboard: '/dashboard',
  login: '/auth/login',
  register: '/auth/register',
  characters: '/characters',
  character: (id: number) => `/characters/${id}`,
  user: (id: number) => `/users/${id}`,
  users: '/users',
  characterCreate: '/characters/create',
};
