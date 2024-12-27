import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../services/authorizationSlice';
import Loader from './loader/loader';
import PropTypes from 'prop-types';

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.authorization);
  const location = useLocation();

  const [isUserLoaded, setUserLoaded] = useState(false);

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

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};
