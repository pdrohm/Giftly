import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { signUp } from '../../../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const useSignUpScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = useCallback((data: SignUpFormData) => {
    dispatch(signUp({
      email: data.email,
      password: data.password,
    }));
  }, [dispatch]);

  const handleSignInPress = useCallback(() => {
    navigation.navigate('SignIn' as never);
  }, [navigation]);

  return {
    control,
    errors,
    isSubmitting: loading,
    authError: error,
    handleSubmit: handleSubmit(onSubmit),
    handleSignInPress,
  };
}; 