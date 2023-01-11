import React, { useState } from 'react'
import DashboardHeader from '../dashboard/header'
import Sidebar from '../dashboard/sidebar'

const DashboardLayout = (props) => {

  const [expendSidebar, setExpendSidebar] = useState(false);

  const handleToggleSidebar = () => setExpendSidebar(!expendSidebar)

  return (
    <div className='block'>
        <div className='block'>
          <DashboardHeader expendSidebar={expendSidebar} handleToggleSidebar={handleToggleSidebar} />
          <Sidebar expendSidebar={expendSidebar} />
        </div>
        <div className={expendSidebar ? 'block bg-light-bg absolute min-h-[calc(100%-64px)] md:left-[70px] xs:left-0 top-16 xs:w-full md:w-[calc(100%-70px)]' : 'block bg-light-bg absolute min-h-[calc(100%-64px)] md:left-52 xs:left-0 top-16 xs:w-full md:w-[calc(100%-208px)]'}>
            <div className='block h-full py-6 px-5'>
              {props.children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout