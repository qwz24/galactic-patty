/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../services/authorizationSlice';
import { AppDispatch, RootState } from '../services/store';

const useAuthCheck = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authorization);
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
