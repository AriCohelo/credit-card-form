export function useValidateNumber() {
  const hanldeValidateNumber = (cardNumber: string) => {
    if (cardNumber.length < 16) return 'Invalid card number';
  };
  return { hanldeValidateNumber };
}
