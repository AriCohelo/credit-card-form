export function useValidateNumber() {
  const handleValidateNumber = (cardNumber: string) => {
    if (cardNumber.length < 16) return 'Invalid card number';
  };
  return { handleValidateNumber };
}
