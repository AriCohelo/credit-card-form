import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

export function useFormatDate() {
  const { setValue } = useForm();
  const [cardDate, setCardDate] = useState<string>('');
  const cardCvvRef = useRef<HTMLInputElement>(null);

  const handleDateFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleanValue = e.target.value.replace(/[^\d/]/g, '');

    cleanValue =
      cleanValue.length > 2 && cleanValue[2] !== '/'
        ? `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`
        : cleanValue;

    const formattedValue = cleanValue.slice(0, 5);
    setCardDate(formattedValue);
    setValue('cardDate', formattedValue);
    if (formattedValue.length >= 5 && cardCvvRef.current) {
      cardCvvRef.current.focus();
    }
  };

  return { cardDate, handleDateFormat, cardCvvRef };
}
