import { useFormContext } from 'react-hook-form';

export function useCardName() {
  const { setValue } = useFormContext();

  const handleFormatName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanValue = inputValue.toUpperCase().replace(/[^A-Z\s]/g, '');
    const limitedValue = cleanValue.slice(0, 35);

    console.log(typeof limitedValue);
    if (limitedValue !== inputValue) {
      setValue('cardName', limitedValue);
    }
  };
  return { handleFormatName };
}
