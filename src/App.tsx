import { useForm, FormProvider } from 'react-hook-form';

import CreditCardViewer from './components/creditCardViewer.tsx';
import CreditCardForm from './components/creditCardForm.tsx';
import { useState } from 'react';

function App() {
  const methods = useForm();
  const [isCvvFocused, setIsCvvFocused] = useState(false);
  return (
    <>
      <FormProvider {...methods}>
        <CreditCardViewer isCvvFocused={isCvvFocused} />
        <CreditCardForm setIsCvvFocused={setIsCvvFocused} />
      </FormProvider>
    </>
  );
}

export default App;
