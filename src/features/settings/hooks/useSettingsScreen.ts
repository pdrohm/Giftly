import { useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { signOut } from '../../../store/slices/authSlice';

export const useSettingsScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const appVersion = '1.0.0';

  return {
    user,
    appVersion,
    handleSignOut,
  };
}; 