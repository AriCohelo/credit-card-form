import { UseFormSetError, UseFormClearErrors } from 'react-hook-form';

interface UseValidateCvcProps {
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
}

export function useValidateCvc({ setError, clearErrors }: UseValidateCvcProps) {
  const handleValidateCvc = (value: string): true | string => {
    if (value.length === 0) {
      setError('cardCvc', {
        type: 'manual',
        message: 'CVC number is required',
      });

      return 'CVC number is required';
    }
    if (value.length < 3) {
      setError('cardCvc', {
        type: 'manual',
        message: 'Invalid CVC number',
      });
      return 'Invalid CVC number';
    }
    // setError('cardCvc', { type: 'manual', message: '' });
    clearErrors('cardCvc');

    return true;
  };

  return {
    handleValidateCvc,
  };
}
