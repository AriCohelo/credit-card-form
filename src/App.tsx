import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useFormatNumber } from './hooks/useFormatNumber.tsx';
import { useFormatName } from './hooks/useFormatName.tsx';
import { useFormatDate } from './hooks/useFormatDate.tsx';
import { useFormatCvv } from './hooks/useFormatCvv.tsx';

import { useValidateNumber } from './hooks/useValidateNumber.tsx';
import { useValidateDate } from './hooks/useValidateDate.tsx';
import { useValidateCvv } from './hooks/useValidateCvv.tsx';

import './app.scss';
import CreditCardViewer from './components/creditCardViewer.tsx';
import CreditCardForm from './components/creditCardForm.tsx';

interface FormValues {
  cardName: string;
  cardNumber: string;
  cardDate: string;
  cardCvv: string;
}
function App() {
  const [isCvvFocused, setIsCvvFocused] = useState(false);
  const { setValue } = useForm<FormValues>();
  const { cardName } = useFormatName({ setValue });
  const { cardNumber } = useFormatNumber();
  const { cardDate } = useFormatDate();
  const { cardCvv } = useFormatCvv({ setValue });

  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <CreditCardViewer
          cardNumber={cardNumber}
          cardName={cardName}
          cardDate={cardDate}
          cardCvv={cardCvv}
          isCvvFocused={isCvvFocused}
          setIsCvvFocused={setIsCvvFocused}
        />
        <CreditCardForm />
      </FormProvider>
      {/* <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Flex align="center" justify="center" direction="column">
            <Box p="1rem" maxW="500px">
              <FormControl variant="floating">
                <Input
                  type="tel"
                  id="cardNumber"
                  placeholder=""
                  {...register('cardNumber', {
                    onChange: handleNumberFormat,
                    required: 'Card number is required',
                    validate: { handleValidateNumber },
                  })}
                  value={cardNumber}
                />
                <FormLabel htmlFor="cardNumber" bg="transparent">
                  {errors.cardNumber
                    ? errors.cardNumber.message
                    : 'Card Number'}
                </FormLabel>
              </FormControl>
            </Box>
            <Box p="1rem" maxW="500px">
              <FormControl variant="floating">
                <Input
                  type="tel"
                  id="cardName"
                  placeholder=""
                  {...register('cardName', {
                    onChange: handleNameFormat,
                    required: 'Cardholder name is required',
                  })}
                  ref={cardNameRef}
                  value={cardName}
                />
                <FormLabel htmlFor="cardName" bg="tomato">
                  {errors.cardName
                    ? errors.cardName.message
                    : 'Cardholder Name'}
                </FormLabel>
              </FormControl>
            </Box>
            <Box p="1rem" maxW="500px">
              <FormControl variant="floating">
                <Input
                  type="tel"
                  id="cardDate"
                  placeholder=""
                  {...register('cardDate', {
                    onChange: handleDateFormat,
                    maxLength: {
                      value: 5,
                      message: 'Date format should be MM/YY',
                    },
                    validate: handleValidateDate,
                    required: 'Date is required',
                  })}
                  value={cardDate}
                />
                <FormLabel htmlFor="cardDate">
                  {errors.cardDate ? errors.cardDate.message : 'Date (MM/YY)'}
                </FormLabel>
              </FormControl>
            </Box>
            <Box p="1rem" maxW="500px">
              <FormControl variant="floating">
                <Input
                  type="tel"
                  id="cardCvv"
                  placeholder=""
                  {...register('cardCvv', {
                    onChange: handleCvvFormat,
                    required: 'CVV is required',
                    validate: handleValidateCvv,
                  })}
                  ref={cardCvvRef}
                  value={cardCvv}
                  onFocus={() => setIsCvvFocused(true)}
                  onBlur={() => setIsCvvFocused(false)}
                />
                <FormLabel htmlFor="cardCvv">
                  {errors.cardCvv ? errors.cardCvv.message : 'CVV'}
                </FormLabel>
              </FormControl>
            </Box>
            <Button type="submit" ref={submitButtonRef}>
              Submit
            </Button>
          </Flex>
        </form> */}
    </>
  );
}

export default App;
