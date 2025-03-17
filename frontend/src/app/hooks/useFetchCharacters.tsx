// import axios from 'axios';

// import { useState, useEffect, useMemo } from 'react';
// import { ROLES } from '../utils/constants';
// import { Character, User } from '../utils/types';
// import { apiRoutes } from '../api/apiRoutes';

// export const useFetchCharacters = (user: User | null, limit?: number) => {
//   const [characters, setCharacters] = useState<Character[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCharacters = async () => {
//       try {
//         const baseUrl =
//           user?.role === ROLES.ADMIN
//             ? apiRoutes.characters.all
//             : apiRoutes.characters.userCharacters;

//         const response = await axios.get(baseUrl, {
//           params: limit ? { limit } : undefined,
//           withCredentials: true,
//         });

//         setCharacters(response.data);
//       } catch (err) {
//         setError(`You don't have characters yet`);
//         console.error('Error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchCharacters();
//     }
//   }, [user, limit]);

//   const memoizedData = useMemo(
//     () => ({
//       characters,
//       loading,
//       error,
//     }),
//     [characters, loading, error]
//   );

//   return memoizedData;
// };
