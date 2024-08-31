import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

export function useFormatNumber() {
  const { setValue } = useForm();
  const [cardNumber, setCardNumber] = useState<string>('');
  const cardNameRef = useRef<HTMLInputElement>(null);

  const handleNumberFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanValue = inputValue.replace(/\D/g, '');
    const formattedValue = cleanValue
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
    setCardNumber(formattedValue);
    setValue('cardNumber', formattedValue);
    if (formattedValue.length >= 19 && cardNameRef.current) {
      cardNameRef.current.focus();
    }
  };

  return { cardNumber, handleNumberFormat, cardNameRef };
}
