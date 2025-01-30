/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../services/authorizationSlice';
import Loader from './loader/loader';
import { AppDispatch, RootState } from '../services/store';

type Props = {
  element: ReactElement;
};

export const ProtectedRouteElement: FC<Props> = ({ element }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.authorization);
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
