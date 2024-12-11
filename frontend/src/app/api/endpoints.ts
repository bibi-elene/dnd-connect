export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    me: '/auth/me',
  },
  characters: {
    all: '/characters',
    userCharacters: '/characters/me',
    character: (id: string) => `/characters/${id}`,
    create: '/characters',
  },
};
