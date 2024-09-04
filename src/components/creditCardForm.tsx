import { useRef } from 'react';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import {
  FormControl,
  Input,
  FormLabel,
  Box,
  Button,
  Grid,
  GridItem,
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
    <Box display="flex" justifyContent="center" minHeight="100vh">
      <Box width="100%" maxWidth="400px" minWidth="350px">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid gridTemplateColumns="1fr 1fr" p="1rem">
            {/* Card number field */}

            <GridItem p=".7rem" colSpan={2}>
              <FormControl variant="floating">
                <Input
                  type="tel"
                  id="cardNumber"
                  placeholder=""
                  borderRadius="30px"
                  h="50px"
                  border="2px"
                  borderColor={
                    errors.cardNumber ? '#F56565' : 'rgba(161, 161, 161, 0.75)'
                  }
                  _focusVisible={{ borderColor: '#D69E2E' }}
                  {...register('cardNumber', {
                    required: 'Card number is required',
                    onChange: handleFormatNumber,
                    validate: handleValidateNumber,
                  })}
                />
                <FormLabel
                  htmlFor="cardNumber"
                  color={
                    errors.cardNumber ? '#F56565' : 'rgba(161, 161, 161, 0.75)'
                  }
                >
                  {errors.cardNumber
                    ? errors.cardNumber.message
                    : 'Card Number'}
                </FormLabel>
              </FormControl>
            </GridItem>

            {/* Card name field */}

            <GridItem p=".7rem" colSpan={2}>
              <FormControl variant="floating">
                <Input
                  type="text"
                  id="cardName"
                  placeholder=""
                  borderRadius="30px"
                  color="rgba(161, 161, 161, 0.75)"
                  border="2px"
                  h="50px"
                  borderColor={
                    errors.cardName ? '#F56565' : 'rgba(161, 161, 161, 0.75)'
                  }
                  _focusVisible={{ borderColor: '#D69E2E' }}
                  // ref={cardNameRef}
                  {...register('cardName', {
                    required: 'Cardholder name is required',
                    onChange: handleFormatName,
                  })}
                />
                <FormLabel
                  htmlFor="cardName"
                  color={
                    errors.cardName ? '#F56565' : 'rgba(161, 161, 161, 0.75)'
                  }
                >
                  {errors.cardName
                    ? errors.cardName.message
                    : 'Cardholder Name'}
                </FormLabel>
              </FormControl>
            </GridItem>

            {/* Card date field */}

            <GridItem p=".7rem">
              <FormControl variant="floating">
                <Input
                  type="tel"
                  id="cardDate"
                  placeholder=""
                  color="rgba(161, 161, 161, 0.75)"
                  borderRadius="30px"
                  border="2px"
                  h="50px"
                  borderColor={
                    errors.cardDate ? '#F56565' : 'rgba(161, 161, 161, 0.75)'
                  }
                  _focusVisible={{ borderColor: '#D69E2E' }}
                  {...register('cardDate', {
                    required: 'Date is required',
                    onChange: handleFormatDate,
                    validate: handleValidateDate,
                  })}
                />
                <FormLabel
                  htmlFor="cardDate"
                  color={
                    errors.cardDate ? '#F56565' : 'rgba(161, 161, 161, 0.75)'
                  }
                >
                  {errors.cardDate ? errors.cardDate.message : 'Date (MM/YY)'}
                </FormLabel>
              </FormControl>
            </GridItem>

            {/* Card Cvv field */}

            <GridItem p=".7rem">
              <FormControl variant="floating">
                <Input
                  type="tel"
                  id="cardCvv"
                  placeholder=""
                  color="rgba(161, 161, 161, 0.75)"
                  h="50px"
                  borderRadius="30px"
                  border="2px"
                  borderColor={
                    errors.cardCvv ? '#F56565' : 'rgba(161, 161, 161, 0.75)'
                  }
                  _focusVisible={{ borderColor: '#D69E2E' }}
                  {...register('cardCvv', {
                    required: 'CVV is required',
                    onChange: handleFormatCvv,
                    validate: handleValidateCvv,
                  })}
                  onFocus={() => setIsCvvFocused(true)}
                  onBlur={() => setIsCvvFocused(false)}
                  // ref={cardCvvRef}
                />
                <FormLabel
                  htmlFor="cardCvv"
                  color={
                    errors.cardCvv ? '#F56565' : 'rgba(161, 161, 161, 0.75)'
                  }
                >
                  {errors.cardCvv ? errors.cardCvv.message : 'CVV'}
                </FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2} p=".5rem">
              <Button
                width="100%"
                borderRadius="30px"
                type="submit"
                ref={submitButtonRef}
                bg="rgba(161, 161, 161, 0.75)"
              >
                Submit
              </Button>
            </GridItem>
          </Grid>
        </form>
      </Box>
      <DevTool control={control} />
    </Box>
  );
};

export default CreditCardForm;
