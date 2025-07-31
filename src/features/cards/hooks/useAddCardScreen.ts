import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addCard } from '../../../store/slices/cardsSlice';
import { useNavigation } from '@react-navigation/native';

const addCardSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  amount: z.string().min(1, 'Amount is required').refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, 'Amount must be a positive number'),
  expirationDate: z.string().min(1, 'Expiration date is required').refine((val) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!dateRegex.test(val)) {
      return false;
    }
    
    const [month, day, year] = val.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return date >= today;
  }, 'Please enter a valid future date in MM/DD/YYYY format'),
});

type AddCardFormData = z.infer<typeof addCardSchema>;

export const useAddCardScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddCardFormData>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      brand: '',
      amount: '',
      expirationDate: '',
    },
  });

  const onSubmit = useCallback((data: AddCardFormData) => {
    const cardData = {
      brand: data.brand,
      amount: parseFloat(data.amount),
      expirationDate: data.expirationDate,
    };

    dispatch(addCard(cardData));
    reset();
    navigation.goBack();
  }, [dispatch, reset, navigation]);

  return {
    control,
    errors,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
  };
}; 