import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useFormatNumber } from './hooks/useFormatNumber.tsx';
import { useFormatName } from './hooks/useFormatName.tsx';
import { useFormatDate } from './hooks/useFormatDate.tsx';
import { useFormatCvc } from './hooks/useFormatCvc.tsx';

import { useValidateNumber } from './hooks/useValidateNumber.tsx';
import { useValidateDate } from './hooks/useValidateDate.tsx';
import { useValidateCvc } from './hooks/useValidateCvc.tsx';

import './app.scss';
import cvcHelp from './assets/cvcHelp.svg';

type FormValues = {
  cardName: string;
  cardNumber: string;
  cardDate: string;
  cardCvc: string;
};

function App() {
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
  const { cardDate, handleDateFormat, cardCvcRef } = useFormatDate();
  const { cardCvc, handleCvcFormat, submitButtonRef } = useFormatCvc({
    setValue,
  });
  const { hanldeValidateNumber } = useValidateNumber();
  const { handleValidateDate } = useValidateDate();
  const { handleValidateCvc } = useValidateCvc({ setError, clearErrors });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <>
      <article className="cardFormAppContainer ">
        <div className="cardViewer"></div>

        {/* 
        Credit Card Form 
        */}

        <form
          className="cardForm container"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              id="cardNumber"
              className={`cardForm__cardNumber form-control ${
                errors.cardNumber ? 'is-invalid' : ''
              }`}
              placeholder="Card number"
              {...register('cardNumber', {
                onChange: handleNumberFormat,
                required: 'Card number is required',
                validate: { hanldeValidateNumber },
              })}
              value={cardNumber}
            />
            <label
              htmlFor="cardNumber"
              className={errors.cardNumber ? 'text-danger' : ''}
            >
              {errors.cardNumber ? errors.cardNumber.message : 'Card Number'}
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              id="cardName"
              className={`cardForm__cardName form-control ${
                errors.cardName ? 'is-invalid' : ''
              }`}
              placeholder="Name"
              {...register('cardName', {
                onChange: handleNameFormat,
                required: 'Cardholder name is required',
              })}
              ref={cardNameRef}
              value={cardName}
            />
            <label
              htmlFor="cardName"
              className={errors.cardName ? 'text-danger' : ''}
            >
              {errors.cardName ? errors.cardName.message : 'Cardholder Name'}
            </label>
          </div>

          <div className="row justify-content-center justify-content-md-start">
            <div className="form-floating mb-3 col">
              <input
                type="tel"
                id="cardDate"
                className={`cardForm__cardDate form-control ${
                  errors.cardDate ? 'is-invalid' : ''
                }`}
                placeholder="MM/YY"
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
              <label
                htmlFor="cardDate"
                className={errors.cardDate ? 'text-danger' : ''}
              >
                {errors.cardDate ? errors.cardDate.message : 'Date (MM/YY)'}
              </label>
            </div>
            <div className="form-floating mb-3 col position-relative">
              <input
                type="tel"
                id="cardCvc"
                className={`cardForm__cardCvc form-control ${
                  errors.cardCvc ? 'is-invalid' : ''
                }`}
                placeholder="CVC"
                {...register('cardCvc', {
                  onChange: handleCvcFormat,
                  required: 'CVC is required',
                  validate: handleValidateCvc,
                })}
                ref={cardCvcRef}
                value={cardCvc}
              />
              <label
                htmlFor="cardCvc"
                className={errors.cardCvc ? 'text-danger' : ''}
              >
                {errors.cardCvc ? errors.cardCvc.message : 'CVC'}
              </label>
              {!errors.cardCvc && (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="cvc-tooltip">
                      The CVC (Card Verification Code) is a 3-digit code usually
                      found on the back of your card.
                    </Tooltip>
                  }
                >
                  <span className="input-group-text position-absolute end-0 top-50 pe-4 translate-middle-y bg-transparent border-0">
                    <img
                      className="cvcHelp"
                      src={cvcHelp}
                      alt="CVC help"
                      width="16"
                      height="16"
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                </OverlayTrigger>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center justify-content-md-start">
            <button className="btn btn-outline-primary" ref={submitButtonRef}>
              Submit
            </button>
          </div>
        </form>
        <DevTool control={control} />
      </article>
    </>
  );
}

export default App;
