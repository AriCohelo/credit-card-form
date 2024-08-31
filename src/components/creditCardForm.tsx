import React from 'react';
import {
  FormControl,
  Input,
  FormLabel,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { DevTool } from '@hookform/devtools';
import { useFormContext, SubmitHandler } from 'react-hook-form';

import { useCardNumber } from '../hooks/useCardNumber';
import { useCardName } from '../hooks/useCardName';

interface FormValues {
  cardName: string;
  cardNumber: string;
  cardDate: string;
  cardCvv: string;
}
const CreditCardForm: React.FC = () => {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    setValue,
  } = useFormContext<FormValues>();
  const cardNameRef = useRef<HTMLInputElement>(null);
  const cardCvvRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // const { handleNameFormat } = useFormatName({ setValue });
  // const { handleNumberFormat, cardNameRef } = useFormatNumber();
  // const { handleDateFormat, cardCvvRef } = useFormatDate();
  // const { handleCvvFormat, submitButtonRef } = useFormatCvv({ setValue });
  // const { handleValidateNumber } = useValidateNumber();
  // const { handleValidateDate } = useValidateDate();
  // const { handleValidateCvv } = useValidateCvv({ setError, clearErrors });

  const { handleValidateNumber, handleFormatNumber } = useCardNumber();
  const { handleFormatName } = useCardName();
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
                  onChange: handleFormatNumber,
                  required: 'Card number is required',
                  validate: handleValidateNumber,
                })}
              />
              <FormLabel htmlFor="cardNumber" bg="transparent">
                {errors.cardNumber ? errors.cardNumber.message : 'Card Number'}
              </FormLabel>
            </FormControl>
          </Box>
          <Box p="1rem" maxW="500px">
            <FormControl variant="floating" isInvalid={!!errors.cardNumber}>
              <Input
                type="tel"
                id="cardName"
                placeholder=""
                {...register('cardName', {
                  onChange: handleFormatName,
                  required: 'Cardholder name is required',
                })}
                // ref={cardNameRef} //when i add this line handleFormatName stops updating the actual field but logs formatted, how to add a ref properly?
              />
              <FormLabel htmlFor="cardName" bg="tomato">
                {errors.cardName ? errors.cardName.message : 'Cardholder Name'}
              </FormLabel>
            </FormControl>
          </Box>
          {/* <Box p="1rem" maxW="500px">º
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
                onFocus={() => setIsCvvFocused(true)}
                onBlur={() => setIsCvvFocused(false)}
              />
              <FormLabel htmlFor="cardCvv">
                {errors.cardCvv ? errors.cardCvv.message : 'CVV'}
              </FormLabel>
            </FormControl>
          </Box> */}
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
