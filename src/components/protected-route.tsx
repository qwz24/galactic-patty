import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement, useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/authorizationSlice';
import Loader from './loader/loader';
import { useAppDispatch, useAppSelector } from '../services/store';

type Props = {
  element: ReactElement;
};

export const ProtectedRouteElement: FC<Props> = ({ element }) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => state.authorization);
  const location = useLocation();

  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const init = async () => {
    await dispatch(fetchUserProfile());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return <Loader />;
  }

  return user ? (
    element
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} replace />
  );
};
