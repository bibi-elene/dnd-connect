export const apiRoutes = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    me: '/api/auth/me',
  },
  characters: {
    all: '/api/characters',
    userCharacters: '/api/characters/me',
    character: (id: number) => `/api/characters/${id}`,
  },
  dashboard: {
    stats: '/api/dashboard/stats',
  },
};
