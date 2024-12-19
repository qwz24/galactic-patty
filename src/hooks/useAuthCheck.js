import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../services/authorizationSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authorization);
  const [isUserLoaded, setUserLoaded] = useState(false);

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
