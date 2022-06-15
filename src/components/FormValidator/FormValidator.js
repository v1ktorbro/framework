import React from 'react';

export const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = React.useState({state: true, errorMessage: 'The field cannot be empty'});
  const [minLengthError, setMinLengthError] = React.useState({state: false, errorMessage: `Min length ${validations['minLength']} symbols`});
  const [maxLengthError, setMaxLengthError] = React.useState({state: false, errorMessage: `Max length ${validations['maxLength']} symbols`});
  const [onlyNumberError, setOnlyNumberError] = React.useState({state: false, errorMessage: 'Enter only numbers'});
  const regExOnlyNumber = /^([0-9]*)$/;
  const [onlyLetterError, setOnlyLetterError] = React.useState({state: false, message: 'Enter only letters'});
  const regExOnlyLetter = /^([a-zа-яё]*[\s]{0,1}[a-zа-яё]*[\s]{0,1}[a-zа-яё]*)$/ig;
  const [inputValid, setInputValid] = React.useState(false);

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError({...minLengthError, state: true}) : setMinLengthError({...minLengthError, state: false});
          break;
        case 'maxLength':
          value.length > validations[validation] ? setMaxLengthError({...maxLengthError, state: true}) : setMaxLengthError({...maxLengthError, state: false});
          break;
        case 'isEmpty':
          value ? setIsEmpty({...isEmpty, state: false}) : setIsEmpty({...isEmpty, state: true});
          break;
        case 'onlyNumber':
          regExOnlyNumber.test(value) ? setOnlyNumberError({...onlyNumberError, state: false}) : setOnlyNumberError({...onlyNumberError, state: true});
          break;
        case 'onlyLetter':
          regExOnlyLetter.test(value.toLowerCase()) ? setOnlyLetterError({...onlyLetterError, state: false}) : setOnlyLetterError({...onlyLetterError, state: true});
          break;
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (isEmpty.state || minLengthError.state || onlyLetterError.state || maxLengthError.state || onlyNumberError.state) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, onlyLetterError, onlyNumberError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    onlyLetterError,
    onlyNumberError,
    inputValid,
  };
};

export const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue);
  const [isBlur, setIsBlur] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  // передаем в valid результат выполнения ф-и useValidation
  const valid = useValidation(value, validations);

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const onFocus = (evt) => {
    setIsFocus(true);
  };

  const onBlur = (evt) => {
    setIsBlur(true);
  };

  const onReset = () => {
    setValue('');
    setIsBlur(false);
    setIsFocus(false);
  };

  return {
    value,
    onChange,
    onBlur,
    isBlur,
    onFocus,
    isFocus,
    onReset,
    ...valid,
  };
};