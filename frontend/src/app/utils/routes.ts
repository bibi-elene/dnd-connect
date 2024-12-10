export const routes = {
  home: '/',
  dashboard: '/dashboard',
  login: '/auth/login',
  register: '/auth/register',
  characters: '/characters',
  character: (id: number) => `/characters/${id}`,
  characterCreate: '/characters/create',
};
