import React, { useState } from 'react'
import 'boxicons';
import CreateAccount from '../../components/authentication/register/createAccount';
import VerifyEmail from '../../components/authentication/register/verifyEmail';



const Register = () => {
    const [step, setStep] = useState(1)

    return (
        <>
            {step === 1 && <CreateAccount setStep={setStep} /> }
            {step === 2 && <VerifyEmail /> }
        </>
    )
}

export default Register