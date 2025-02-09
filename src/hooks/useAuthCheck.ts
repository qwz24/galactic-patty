import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/authorizationSlice';
import { useAppDispatch, useAppSelector } from '../services/store';

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.authorization);
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const init = async () => {
    await dispatch(fetchUserProfile());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, [dispatch]);

  return { user, isUserLoaded };
};

export default useAuthCheck;
