// import { useState } from 'react';
// import { useForm } from 'react-hook-form';

// export function useFormatName() {
//   const { setValue } = useForm();
//   const [cardName, setCardName] = useState<string>('');

//   const handleNameFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedValue = e.target.value.toUpperCase();
//     setCardName(formattedValue);
//     setValue('cardName', formattedValue);
//   };
//   return { cardName, handleNameFormat };
// }

//este es el ultimo codigo bueno

// import { useState } from 'react';
// import { UseFormSetValue } from 'react-hook-form';

// interface useFormatNameProps {
//   setValue: UseFormSetValue<any>;
// }

// export function useFormatName({ setValue }: useFormatNameProps) {
//   const [cardName, setCardName] = useState<string>('');

//   const handleNameFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formattedValue = e.target.value.toUpperCase();
//     setCardName(formattedValue);
//     setValue('cardName', formattedValue);
//   };

//   return {
//     cardName,
//     handleNameFormat,
//   };
// }

import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface UseFormatNameProps {
  setValue: UseFormSetValue<any>;
}

export function useFormatName({ setValue }: UseFormatNameProps) {
  const [cardName, setCardName] = useState<string>('');

  const handleNameFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase();
    const isValid = /^[A-Z\s]*$/.test(inputValue) && inputValue.length <= 40;

    if (isValid) {
      setCardName(inputValue);
      setValue('cardName', inputValue);
    }
  };

  return {
    cardName,
    handleNameFormat,
  };
}
