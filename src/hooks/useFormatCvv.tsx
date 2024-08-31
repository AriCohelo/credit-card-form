// import { useState, useRef } from 'react';
// import { useForm } from 'react-hook-form';

// export function useFormatCvc() {
//   const { setValue } = useForm();
//   const [cardCvc, setCardCvc] = useState<string>('');
//   const submitButtonRef = useRef<HTMLButtonElement>(null);

//   const handleCvcFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedValue = e.target.value.replace(/\D/g, '').slice(0, 3);
//     if (formattedValue.length >= 5 && submitButtonRef.current) {
//       submitButtonRef.current.focus();
//     }
//     setCardCvc(formattedValue);
//     setValue('cardCvc', formattedValue);
//     if (formattedValue.length >= 3 && submitButtonRef.current) {
//       submitButtonRef.current.focus();
//     }
//   };

//   return { cardCvc, handleCvcFormat, submitButtonRef };
// }

//ESTE es el ultimo codigo bueno
import { useState, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface useFormatCvvProps {
  setValue: UseFormSetValue<any>;
}

export function useFormatCvv({ setValue }: useFormatCvvProps) {
  const [cardCvv, setCardCvv] = useState<string>('');
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleCvvFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardCvv(formattedValue);
    setValue('cardCvv', formattedValue);
    if (formattedValue.length >= 3 && submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  };

  return {
    cardCvv,
    handleCvvFormat,
    submitButtonRef,
  };
}
