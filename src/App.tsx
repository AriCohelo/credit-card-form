import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { useFormatNumber } from './hooks/useFormatNumber.tsx';
import { useFormatName } from './hooks/useFormatName.tsx';
import { useFormatDate } from './hooks/useFormatDate.tsx';
import { useFormatCvv } from './hooks/useFormatCvv.tsx';

import { useValidateNumber } from './hooks/useValidateNumber.tsx';
import { useValidateDate } from './hooks/useValidateDate.tsx';
import { useValidateCvv } from './hooks/useValidateCvv.tsx';

import './app.scss';
import { useTheme } from './hooks/useTheme.tsx';
import CreditCardViewer from './components/creditCardViewer.tsx';
// import CreditCardForm from './components/creditCardForm.tsx';

import {
  ChakraProvider,
  FormControl,
  Input,
  FormLabel,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';

type FormValues = {
  cardName: string;
  cardNumber: string;
  cardDate: string;
  cardCvv: string;
};

function App() {
  const theme = useTheme();
  const [isCvvFocused, setIsCvvFocused] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormValues>();
  const { errors } = formState;
  const { cardName, handleNameFormat } = useFormatName({ setValue });
  const { cardNumber, handleNumberFormat, cardNameRef } = useFormatNumber();
  const { cardDate, handleDateFormat, cardCvvRef } = useFormatDate();
  const { cardCvv, handleCvvFormat, submitButtonRef } = useFormatCvv({
    setValue,
  });
  const { handleValidateNumber } = useValidateNumber();
  const { handleValidateDate } = useValidateDate();
  const { handleValidateCvv } = useValidateCvv({ setError, clearErrors });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <>
      <ChakraProvider theme={theme}>
        <CreditCardViewer
          cardNumber={cardNumber}
          cardName={cardName}
          cardDate={cardDate}
          cardCvv={cardCvv}
          isCvvFocused={isCvvFocused}
          setIsCvvFocused={setIsCvvFocused}
        />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
        </form>
        <DevTool control={control} />
      </ChakraProvider>
    </>
  );
}

export default App;
