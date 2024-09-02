import { useFormContext } from 'react-hook-form';

export function useCardCvv() {
  const { setValue } = useFormContext();
  const handleFormatCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/\D/g, '').slice(0, 3);
    setValue('cardCvv', formattedValue);
  };
  const handleValidateCvv = (value: string) => {
    if (!/^\d{3,4}$/.test(value)) {
      return 'Invalid CVV number';
    }
    return undefined;
  };
  return { handleFormatCvv, handleValidateCvv };
}
