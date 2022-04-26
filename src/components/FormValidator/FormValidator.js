import React from 'react';

export const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [minLengthError, setMinLengthError] = React.useState(false);
  const [onlyLetterError, setOnlyLetterError] = React.useState({state: false, message: 'Необходимо вводить только буквы'});
  const regExOnlyLetter = /^([a-zа-яё]*[\s]{0,1}[a-zа-яё]*[\s]{0,1}[a-zа-яё]*)$/ig;
  const [inputValid, setInputValid] = React.useState(false);

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'onlyLetter':
          regExOnlyLetter.test(value.toLowerCase()) ? setOnlyLetterError({...onlyLetterError, state: false}) : setOnlyLetterError({...onlyLetterError, state: true});
          break;
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (isEmpty || minLengthError || onlyLetterError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, onlyLetterError]);

  return {
    isEmpty,
    minLengthError,
    onlyLetterError,
    inputValid,
  };
};

export const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue);
  const [isBlur, setIsBlur] = React.useState(false);
  // передаем в valid результат выполнения ф-и useValidation
  const valid = useValidation(value, validations);

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const onBlur = (evt) => {
    setIsBlur(true);
  }

  return {
    value,
    onChange,
    onBlur,
    isBlur,
    ...valid,
  };
};