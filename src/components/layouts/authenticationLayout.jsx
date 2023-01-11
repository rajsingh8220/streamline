import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './../../assets/images/logo/logo.svg'
import LoginBanner from './../../assets/images/login-banner.svg'

const AuthenticationLayout = (props) => {
    return (
        <div className={ props.bgWhite ? 'bg-white w-full h-full min-h-screen' : 'bg-default-bg w-full h-full min-h-screen'}>
            <div className='container flex flex-col justify-between mx-auto h-full min-h-screen xs:px-0 sm:px-6 md:px-24'>
                <div className='logo py-4 pb-14'>
                    <img className="inline cursor-pointer" src={Logo} alt="streamline logo" />
                </div>
                {
                    props.rightPortionHide ? <>{props.children}</> :
                        <div className='md:columns-2 md:flex items-center h-max'>
                            {props.children}
                            {
                                props?.step !== 3 && <div className='m-auto md:flex-1 xs:my-8 block max-w-[50%]'>
                                    <img className="w-full aspect-square min-w-[300px] max-w-[50%] m-auto" src={LoginBanner} alt="login banner" />
                                    {props.registerListPoints}
                                </div>
                            }
                        </div>
                }
                <div className='md:flex justify-between  pt-10 w-full pb-11'>
                    <ul className='flex items-center xs:justify-center xs:pb-4 md:pb-0'>
                        <li className='text-light-gray mr-8 text-sm tracking-[-.03em] font-medium font-Karla'>©2022 Streamline</li>
                        <li><Link to="/terms-privacy" className='text-light-gray tracking-[-.03em] font-medium text-sm font-Karla'>Terms & Privacy</Link></li>
                    </ul>
                    <ul className='flex items-center xs:justify-center space-x-6'> 
                        <li><Link to="/" className='text-light-gray'><box-icon type='logo' name='facebook' class="fill-light-gray"></box-icon></Link></li>
                        <li><Link to="/" className='text-light-gray'><box-icon type='logo' name='instagram' class="fill-light-gray"></box-icon></Link></li>
                        <li><Link to="/" className='text-light-gray'><box-icon type='logo'name='twitter' class="fill-light-gray"></box-icon></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AuthenticationLayout