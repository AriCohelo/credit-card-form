import { UseFormSetError, UseFormClearErrors } from 'react-hook-form';

interface UseValidateCvvProps {
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
}

export function useValidateCvv({ setError, clearErrors }: UseValidateCvvProps) {
  const handleValidateCvv = (value: string): true | string => {
    if (value.length === 0) {
      setError('cardCvv', {
        type: 'manual',
        message: 'CVC number is required',
      });

      return 'CVC number is required';
    }
    if (value.length < 3) {
      setError('cardCvv', {
        type: 'manual',
        message: 'Invalid CVC number',
      });
      return 'Invalid CVC number';
    }
    // setError('cardCvv', { type: 'manual', message: '' });
    clearErrors('cardCvv');

    return true;
  };

  return {
    handleValidateCvv,
  };
}
