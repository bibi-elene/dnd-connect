export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
  },
  characters: {
    all: '/characters',
    userCharacters: '/characters/me',
    character: (id: number) => `/characters/${id}`,
    create: '/characters',
  },
  users: {
    all: '/users',
    user: (id: number) => `/users/${id}`,
    me: '/users/me',
  },
};
