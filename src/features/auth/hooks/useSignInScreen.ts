import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { signIn } from '../../../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const useSignInScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback((data: SignInFormData) => {
    dispatch(signIn(data));
  }, [dispatch]);

  const handleSignUpPress = useCallback(() => {
    navigation.navigate('SignUp' as never);
  }, [navigation]);

  return {
    control,
    errors,
    isSubmitting: loading,
    authError: error,
    handleSubmit: handleSubmit(onSubmit),
    handleSignUpPress,
  };
}; 