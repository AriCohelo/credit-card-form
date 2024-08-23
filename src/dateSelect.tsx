<form action="">
  <label htmlFor="cardDateMM" className="cardForm__cardDateLab">
    Expiration date
  </label>
  <select
    id="cardDateMM"
    className="cardForm__cardDateMM"
    // {...register('cardDateMM')}
  >
    <option>Month</option>
    {[...Array(12)].map((_, i) => (
      <option key={i} value={String(i + 1).padStart(2, '0')}>
        {String(i + 1).padStart(2, '0')}
      </option>
    ))}
  </select>
  <select
    id="cardDateYY"
    className="cardForm__cardDateYY"
    // {...register('cardDateYY')}
  >
    <option>Year</option>
    {[...Array(30)].map((_, i) => {
      const year = new Date().getFullYear() + i;
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    })}
  </select>
</form>;
