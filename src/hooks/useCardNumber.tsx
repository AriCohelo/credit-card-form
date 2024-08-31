import { useFormContext } from 'react-hook-form';
import { useRef } from 'react';

export function useCardNumber() {
  const { setValue } = useFormContext();
  const cardNameRef = useRef<HTMLInputElement>(null);

  const handleFormatNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanValue = inputValue.replace(/\D/g, '');
    const formattedValue = cleanValue
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();

    if (formattedValue !== inputValue) {
      setValue('cardNumber', formattedValue);
    }
    if (formattedValue.length >= 19 && cardNameRef.current) {
      cardNameRef.current.focus();
    }
  };

  const handleValidateNumber = (cardNumber: string) => {
    if (cardNumber.replace(/\s/g, '').length < 16) {
      return 'Invalid card number';
    }
  };

  return { handleFormatNumber, handleValidateNumber };
}
