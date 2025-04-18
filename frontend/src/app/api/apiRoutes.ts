export const apiRoutes = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
  },
  characters: {
    all: '/api/characters',
    userCharacters: '/api/characters/me',
    character: (id: number) => `/api/characters/${id}`,
  },
  users: {
    all: '/api/users',
    user: (id: number) => `/api/users/${id}`,
    me: '/api/users/me',
  },
};
