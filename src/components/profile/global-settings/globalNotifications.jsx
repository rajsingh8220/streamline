import React from 'react'

const GlobalNotifications = () => {
    return (
      <div className='block'>
        <h2 className='mb-5 text-text-dark font-Karla text-lg font-bold'>Financial</h2>
        <div className='block mb-8'>
          <div className="d-block mb-4 relative">
            <input
              type="text"
              name="firstName"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="First Name"
            />
          </div>
          <div className="d-block mb-4 relative">
            <input
              type="text"
              name="lastName"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="Last Name"
            />
          </div>
          <div className="d-block mb-4 relative">
            <input
              type="email"
              name="email"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="Email"
            />
          </div>
          <div className="d-block mb-4 relative">
            <input
              type="text"
              name="telephone"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="Telephone"
            />
          </div>
        </div> 
        <h2 className='mb-5 text-text-dark font-Karla text-lg font-bold'>Technical</h2>
        <div className='block'>
          <div className="d-block mb-4 relative">
            <input
              type="text"
              name="firstName"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="First Name"
            />
          </div>
          <div className="d-block mb-4 relative">
            <input
              type="text"
              name="lastName"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="Last Name"
            />
          </div>
          <div className="d-block mb-4 relative">
            <input
              type="email"
              name="email"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="Email"
            />
          </div>
          <div className="d-block mb-4 relative">
            <input
              type="text"
              name="telephone"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="Telephone"
            />
          </div>
        </div> 
      </div>
    )
}

export default GlobalNotifications