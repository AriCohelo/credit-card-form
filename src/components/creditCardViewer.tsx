import cardChipSilver from '../assets/card-chip-silver.png';
import mcSymbol from '../assets/mc_symbol.svg';
import { useFormContext } from 'react-hook-form';

type CreditCardViewerProps = {
  cardNumber: string;
  cardName: string;
  cardDate: string;
  cardCvv: string;
  isCvvFocused: boolean;
  setIsCvvFocused: (isFocused: boolean) => void;
};

const CreditCardViewer: React.FC<CreditCardViewerProps> = ({
  // cardNumber,
  // cardName,
  // cardDate,
  // cardCvv,
  isCvvFocused,
  setIsCvvFocused,
}) => {
  const { watch } = useFormContext();
  const cardNumber = watch('cardNumber');
  const cardName = watch('cardName');

  return (
    <div className="cardViewer m-3 d-flex justify-content-center align-items-center">
      <div className="card">
        <div className={`card__inner ${isCvvFocused ? 'rotate' : ''}`}>
          <div className="card__inner__front">
            <p className="card__inner__front-company">Fake Bank</p>
            <p className="card__inner__front-slogan">We need your money</p>
            <img
              className="card__inner__front-chip"
              src={cardChipSilver}
              alt="chip"
            />
            <div className="card__inner__front-numName">
              <p className="card__inner__front-number">
                {cardNumber || '0000 0000 0000 0000'}
              </p>
              <p className="card__inner__front-name">
                {cardName || 'JOHN APPLESEED'}
              </p>
            </div>
            <p className="card__inner__front-thru">
              valid
              <br />
              thru
            </p>
            {/* <p className="card__inner__front-date">{cardDate || 'MM/YY'}</p> */}
            <img
              src={mcSymbol}
              alt="mcSymbol"
              className="card__inner__front-mcSymbol"
            />
          </div>
          <div className="card__inner__back">
            {/* <p>{cardCvv || '123'}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardViewer;
