import { useEffect, useState } from 'react';
import { getUser } from '../services/apiServices';

const useCurrentUser = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data.user_info);
        setUserId(data.id);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  console.log("user",user)
  return { user, userId, loading };
};

export default useCurrentUser;
