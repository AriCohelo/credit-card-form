import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import './_mixins.scss';
import './_variables.scss';
import './_resets.scss';
import './app.scss';

type FormValues = {
  cardName: string;
  cardNumber: string;
  cardDateMM: string;
  cardDateYY: string;
  cardCvc: string;
  cardDate: string;
};

function App() {
  const date = new Date();
  console.log(date.getFullYear());
  const form = useForm<FormValues>();
  const { register, control } = form;
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardDateMM, setCardDateMM] = useState<string>('');
  const [cardDateYY, setCardDateYY] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardDate, setCardDate] = useState<string>('');

  const handleCardDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d/]/g, '');
    if (inputValue.length > 2 && inputValue[2] !== '/') {
      inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
    }
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5);
    }
    setCardDate(inputValue);
  };

  return (
    <>
      <article className="cardFormAppContainer">
        <div className="cardViewer"></div>
        <form className="cardForm">
          <label htmlFor="cardNumber">Number</label>
          <input
            type="text"
            id="cardNumber"
            className="cardForm__cardNumber"
            {...register('cardNumber')}
            placeholder="Card number"
          />
          <label htmlFor="cardName">Cardholder name</label>
          <input
            type="text"
            id="cardName"
            className="cardForm__cardName"
            {...register('cardName')}
            placeholder="Name"
          />
          <div className="cardForm__lowerNumbers">
            <label htmlFor="cardDate">Date (MM/YY)</label>
            <input
              type="text"
              id="cardDate"
              className="cardForm__cardDate"
              value={cardDate}
              placeholder="MM/YY"
              {...(register('cardDate'),
              { onChange: handleCardDateChange, maxLength: 5 })}
            />

            <label htmlFor="cardCvc" className="cardForm__cardCvcLab">
              cvc
            </label>
            <input
              type="tel"
              id="cardCvc"
              className="cardForm__cardCvc"
              {...register('cardCvc')}
              placeholder="CVC"
            />
            <p className="cardForm__what">
              <a href="">What is this?</a>
            </p>
          </div>
        </form>
        <DevTool control={control} />
      </article>
    </>
  );
}

export default App;
