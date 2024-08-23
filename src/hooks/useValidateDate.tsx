export function useValidateDate() {
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
  return { handleValidateDate };
}
