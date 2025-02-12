import '../../index.css';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import IngredientPage from '../../pages/ingredient/ingredient';
import ProfilePage from '../../pages/profile-settings/profile-settings';
import { ProtectedRouteElement } from '../protected-route';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import Modal from '../modals/modal';
import { closeModal, openModal } from '../../services/modalSlice';
import AppHeader from '../app-header/app-header';
import { useAppDispatch } from '../../services/store';
import FeedPage from '../../pages/feed/feed';
import OrderCard from '../order-card/order-card';
import OrderHistoryPage from '../../pages/order-history-page/order-history-page';

function App() {
  const modalType = localStorage.getItem('modalType');
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    if (modalType === 'ingredient') {
      dispatch(openModal(modalType));
    }
    if (modalType === 'feedOrder') {
      dispatch(openModal(modalType));
    }
  }, [dispatch, modalType]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.background ?? location}>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route
          path='/profile'
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRouteElement element={<OrderHistoryPage />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<OrderCard isModal={false} />}
        />

        <Route path='/ingredients/' element={<IngredientPage />}>
          <Route
            path=':id'
            element={
              <IngredientDetails isModal={false} onClose={handleCloseModal} />
            }
          />
        </Route>

        <Route path='/feed' element={<FeedPage />} />
        <Route path='/feed/:number' element={<OrderCard isModal={false} />} />
      </Routes>

      {location.state?.background ? (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              modalType === 'feedOrder' && (
                <Modal onClose={handleCloseModal}>
                  <OrderCard />
                </Modal>
              )
            }
          />
        </Routes>
      ) : null}

      {location.state?.background ? (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              modalType === 'feedOrder' && (
                <Modal onClose={handleCloseModal}>
                  <OrderCard />
                </Modal>
              )
            }
          />
        </Routes>
      ) : null}

      {location.state?.background ? (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              modalType === 'ingredient' && (
                <Modal onClose={handleCloseModal}>
                  <IngredientDetails onClose={handleCloseModal} />
                </Modal>
              )
            }
          />
        </Routes>
      ) : null}
    </>
  );
}

export default App;
