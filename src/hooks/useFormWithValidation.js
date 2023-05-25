import { useState, useCallback } from 'react';

export default function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (evt) => {
        const input = evt.target;
        console.log(input.validity)

        const { value, name } = input;
        setValues({ ...values, [name]: value }); // универсальный обработчик полей
        setErrors({ ...errors, [name]: input.validationMessage }); // ошибок
        setIsValid(input.closest('form').checkValidity()); // проверка валидности

        // if(!input.validity.valid){
        //     setIsValid(false)
        // }
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => { // это метод для сброса формы, полей, ошибок
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {handleChange, resetForm, errors, isValid };
}