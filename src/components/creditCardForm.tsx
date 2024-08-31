import React from 'react';
import {
  FormControl,
  Input,
  FormLabel,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';
import { DevTool } from '@hookform/devtools';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import { useFormatNumber } from '../hooks/useFormatNumber';
// import { useFormatName } from '../hooks/useFormatName';
// import { useFormatDate } from '../hooks/useFormatDate';
// import { useFormatCvv } from '../hooks/useFormatCvv';

import { useValidateNumber } from '../hooks/useValidateNumber';
// import { useValidateDate } from '../hooks/useValidateDate';
// import { useValidateCvv } from '../hooks/useValidateCvv';

interface FormValues {
  cardNumber: string;
}

const CreditCardForm: React.FC = () => {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
  } = useFormContext<FormValues>();

  // const { handleNameFormat } = useFormatName({ setValue });
  // const { handleNumberFormat, cardNameRef } = useFormatNumber();
  // const { handleDateFormat, cardCvvRef } = useFormatDate();
  // const { handleCvvFormat, submitButtonRef } = useFormatCvv({ setValue });
  const { handleValidateNumber } = useValidateNumber();
  // const { handleValidateDate } = useValidateDate();
  // const { handleValidateCvv } = useValidateCvv({ setError, clearErrors });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data:', data);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl variant="floating" isInvalid={!!errors.cardNumber}>
          <Input
            type="tel"
            id="cardNumber"
            placeholder=""
            {...register('cardNumber', {
              required: 'Card number is required',
              validate: handleValidateNumber,
            })}
          />
          <FormLabel htmlFor="cardNumber" bg="transparent">
            {errors.cardNumber ? errors.cardNumber.message : 'Card Number'}
          </FormLabel>
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
      <DevTool control={control} />
    </Box>
  );
};

export default CreditCardForm;
