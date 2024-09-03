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
    <Box p="0 14rem">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid gridTemplateColumns="1fr 1fr">
          <GridItem p=".7rem" maxW="500px" colSpan={2}>
            <FormControl variant="floating">
              <Input
                type="tel"
                id="cardNumber"
                placeholder=""
                borderRadius="30px"
                h="50px"
                color="gray"
                {...register('cardNumber', {
                  required: 'Card number is required',
                  onChange: handleFormatNumber,
                  validate: handleValidateNumber,
                })}
              />
              <FormLabel htmlFor="cardNumber" color="rgba(161, 161, 161, 0.75)">
                {errors.cardNumber ? errors.cardNumber.message : 'Card Number'}
              </FormLabel>
            </FormControl>
          </GridItem>
          <GridItem p=".7rem" maxW="500px" colSpan={2}>
            <FormControl variant="floating">
              <Input
                type="text"
                id="cardName"
                placeholder=""
                borderRadius="30px"
                h="50px"
                // ref={cardNameRef}
                {...register('cardName', {
                  required: 'Cardholder name is required',
                  onChange: handleFormatName,
                })}
              />
              <FormLabel htmlFor="cardName" color="rgba(161, 161, 161, 0.75)">
                {errors.cardName ? errors.cardName.message : 'Cardholder Name'}
              </FormLabel>
            </FormControl>
          </GridItem>
          <GridItem p=".7rem" maxW="500px">
            <FormControl variant="floating">
              <Input
                type="tel"
                id="cardDate"
                placeholder=""
                borderRadius="30px"
                h="50px"
                {...register('cardDate', {
                  required: 'Date is required',
                  onChange: handleFormatDate,
                  validate: handleValidateDate,
                })}
              />
              <FormLabel htmlFor="cardDate" color="rgba(161, 161, 161, 0.75)">
                {errors.cardDate ? errors.cardDate.message : 'Date (MM/YY)'}
              </FormLabel>
            </FormControl>
          </GridItem>
          <GridItem p=".7rem" maxW="500px">
            <FormControl variant="floating">
              <Input
                type="tel"
                id="cardCvv"
                placeholder=""
                borderRadius="30px"
                h="50px"
                {...register('cardCvv', {
                  required: 'CVV is required',
                  onChange: handleFormatCvv,
                  validate: handleValidateCvv,
                })}
                onFocus={() => setIsCvvFocused(true)}
                onBlur={() => setIsCvvFocused(false)}
                // ref={cardCvvRef}
              />
              <FormLabel htmlFor="cardCvv" color="rgba(161, 161, 161, 0.75)">
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
            >
              Submit
            </Button>
          </GridItem>
        </Grid>
      </form>
      <DevTool control={control} />
    </Box>
  );
};

export default CreditCardForm;
