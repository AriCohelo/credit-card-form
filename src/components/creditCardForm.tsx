import { useRef, useState } from 'react';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import {
  FormControl,
  Input,
  FormLabel,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';

import { useCardNumber } from '../hooks/useCardNumber';
import { useCardName } from '../hooks/useCardName';
import { useCardDate } from '../hooks/useCardDate';
import { useCardCvv } from '../hooks/useCardCvv';

interface FormValues {
  cardName: string;
  cardNumber: string;
  cardDate: string;
  cardCvv: string;
}
interface CreditCardFormProps {
  setIsCvvFocused: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreditCardForm: React.FC<CreditCardFormProps> = ({ setIsCvvFocused }) => {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
  } = useFormContext<FormValues>();
  // const cardNameRef = useRef<HTMLInputElement>(null);
  // const cardCvvRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const { handleValidateNumber, handleFormatNumber } = useCardNumber();
  const { handleFormatName } = useCardName();
  const { handleFormatDate, handleValidateDate } = useCardDate();
  const { handleFormatCvv, handleValidateCvv } = useCardCvv();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data:', data);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Flex align="center" justify="center" direction="column">
          <Box p="1rem" maxW="500px">
            <FormControl variant="floating">
              <Input
                type="tel"
                id="cardNumber"
                placeholder=""
                {...register('cardNumber', {
                  required: 'Card number is required',
                  onChange: handleFormatNumber,
                  validate: handleValidateNumber,
                })}
              />
              <FormLabel htmlFor="cardNumber" bg="transparent">
                {errors.cardNumber ? errors.cardNumber.message : 'Card Number'}
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
                  required: 'Cardholder name is required',
                  onChange: handleFormatName,
                })}
                // ref={cardNameRef}
              />
              <FormLabel htmlFor="cardName" bg="tomato">
                {errors.cardName ? errors.cardName.message : 'Cardholder Name'}
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
                  required: 'Date is required',
                  onChange: handleFormatDate,
                  validate: handleValidateDate,
                })}
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
                  required: 'CVV is required',
                  onChange: handleFormatCvv,
                  validate: handleValidateCvv,
                })}
                onFocus={() => setIsCvvFocused(true)}
                onBlur={() => setIsCvvFocused(false)}
                // ref={cardCvvRef}
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
    </Box>
  );
};

export default CreditCardForm;
