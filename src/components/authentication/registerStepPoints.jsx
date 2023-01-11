import React from 'react'

const RegisterStepPoints = () => {
  return (
    <div className='d-block mt-4 pl-[25%] m-auto'>
        <h4 className='text-2xl mb-2 font-Karla font-medium text-blueDark'>Your free plan includes</h4>
        <ul>
            <li className='text-light-dark flex font-Karla font-normal tracking-[-.03em] text-base mb-1.5'><box-icon name='check-circle' class="fill-primary mr-2"></box-icon> Company and Member Management </li>
            <li className='text-light-dark flex font-Karla font-normal tracking-[-.03em] text-base mb-1.5'><box-icon name='check-circle' class="fill-primary mr-2"></box-icon> Service, Roles and Permission Settings</li>
            <li className='text-light-dark flex font-Karla font-normal tracking-[-.03em] text-base mb-1.5'><box-icon name='check-circle' class="fill-primary mr-2"></box-icon> Property Management Service</li>
            <li className='text-light-dark flex font-Karla font-normal tracking-[-.03em] text-base'><box-icon name='check-circle' class="fill-primary mr-2"></box-icon> Deals Management Service</li>
        </ul>
    </div> 
  )
}

export default RegisterStepPoints