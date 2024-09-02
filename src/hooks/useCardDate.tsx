import { useFormContext } from 'react-hook-form';

export function useCardDate() {
  const { setValue } = useFormContext();

  const handleFormatDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleanValue = e.target.value.replace(/[^\d/]/g, '');

    cleanValue =
      cleanValue.length > 2 && cleanValue[2] !== '/'
        ? `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`
        : cleanValue;

    const formattedValue = cleanValue.slice(0, 5);
    setValue('cardDate', formattedValue);
  };
  const handleValidateDate = (cardDate: string) => {
    const [mm, yy] = cardDate.split('/');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const expMonth = parseInt(mm, 10);
    const expYear = parseInt(`20${yy}`, 10);

    if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
      return 'Invalid Date';
    }
    if (expYear > currentYear) return true;
    if (expYear === currentYear && expMonth >= currentMonth) return true;

    return 'Invalid Date';
  };

  return { handleFormatDate, handleValidateDate };
}
