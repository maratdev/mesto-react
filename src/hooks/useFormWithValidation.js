import { useState, useEffect} from 'react';

export default function useFormWithValidation() {
    const [emailError, setEmailError] = useState(false);
    const [formValid, setFormValid] = useState(false);


    function inputHandler(evt){
        const input = evt.target;
        console.log(input.value)

       // setFormValid(input.checkValidity())

        if (!input.checkValidity()) {
            setEmailError(input.validationMessage)
            setFormValid(false)
        }else {
            if(input.value){
                setFormValid(true)
            }
            setEmailError('')
        }

    }

    useEffect(()=>{
       // setFormValid(true)
    }, [])


    return {emailError, formValid, inputHandler };
}
