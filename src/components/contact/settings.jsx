import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TagsInput } from 'react-tag-input-component';
import Avtar from "./../../assets/images/avtar1.png";

const ContactSettingTab = () => {
  
  const [selectedTag, setSelectedTag] = useState([]);
  const [saveNewTag, setSaveNewTag] = useState([]);

  // const handleSetNewTag = (e) => {
  //   console.log(e.target);
  //   setsaveNewTag(e.target.value);
  //   console.log(e.target.value);
  // }
  const handleSetTag = () => {
    setSelectedTag(saveNewTag)
  }

  return (
    <div className="block">
      <div className='flex columns-2 justify-between'>
        <div className='block'>
          <div className='block w-full'>
            <div className='block mb-8'>
                <h2 className="text-text-dark font-Karla text-[20px] font-bold">
                  Lead Source Settings
                </h2>
                <p className="font-Karla text-base text-light-dark">Adjust the dropdown options for the "Lead Source” field</p>
            </div>
            <div className='block mb-4'>
                <div className="block w-[70%]">
                  <ul>
                    <li className='h-[67px] border border-light-border rounded-lg px-4 py-3 flex items-center justify-between'>
                      <button type="button" className='cursor-pointer border-0'><box-icon name='menu' class="fill-light-gray w-[20px]"></box-icon></button>
                      <span className='border border-input-border rounded h-[35px] w-full font-[13px] mx-2 px-3 py-2 flex items-center'>Webinar</span>
                      <button type="button" className='cursor-pointer border-0'><box-icon name='x-circle' class="fill-light-gray w-[20px]"></box-icon></button>
                    </li>
                    <li className='h-[67px] border border-light-border rounded-lg px-4 py-3 flex items-center justify-between'>
                      <button type="button" className='cursor-pointer border-0'><box-icon name='menu' class="fill-light-gray w-[20px]"></box-icon></button>
                      <span className='border border-input-border rounded h-[35px] w-full font-[13px] mx-2 px-3 py-2 flex items-center'>Email</span>
                      <button type="button" className='cursor-pointer border-0'><box-icon name='x-circle' class="fill-light-gray w-[20px]"></box-icon></button>
                    </li>
                    <li className='h-[67px] border border-light-border rounded-lg px-4 py-3 flex items-center justify-between'>
                      <button type="button" className='cursor-pointer border-0'><box-icon name='menu' class="fill-light-gray w-[20px]"></box-icon></button>
                      <span className='border border-input-border rounded h-[35px] w-full font-[13px] mx-2 px-3 py-2 flex items-center'>Phone</span>
                      <button type="button" className='cursor-pointer border-0'><box-icon name='x-circle' class="fill-light-gray w-[20px]"></box-icon></button>
                    </li>
                    <li className='h-[67px] border border-light-border rounded-lg px-4 py-3 flex items-center justify-between'>
                      <button type="button" className='cursor-pointer border-0'><box-icon name='menu' class="fill-light-gray w-[20px]"></box-icon></button>
                      <span className='border border-input-border rounded h-[35px] w-full font-[13px] mx-2 px-3 py-2 flex items-center'>Referral</span>
                      <button type="button" className='cursor-pointer border-0'><box-icon name='x-circle' class="fill-light-gray w-[20px]"></box-icon></button>
                    </li>
                  </ul>
                </div>
            </div>
            <div className='block'>
              <div className="flex justify-start mb-10">
                <button
                  type="button"
                  className="rounded-md text-sm h-[39px] font-bold bg-white tracking-[-.03em] border-primary text-primary border py-2 px-5 font-Karla"
                >
                  Add Option
                </button>
              </div>
            </div>
          </div>
          <div className='block w-full'>
            <div className='block mb-4'>
                <h2 className="text-text-dark font-Karla text-[20px] font-bold">
                Contact Tags
                </h2>
                <p className="font-Karla text-base text-light-dark">Adjust the Deal statuses according to your company's workflow</p>
            </div>
            <div className='flex w-full columns-2 pb-8'>
              <TagsInput
                value={selectedTag}
                onChange={setSaveNewTag}
                name="contactTags"
                placeholder="Enter a tag and hit enter"
              />
              <button
                type="button"
                onClick={handleSetTag}
                className="rounded-md ml-3 min-w-[94px] text-sm h-[39px] font-bold bg-white tracking-[-.03em] border-primary text-primary border py-2 px-3 font-Karla"
              >
                Create Tag
              </button>
            </div>
          </div>
        </div>
        <div className='block w-[35%]'>
            <div className="flex items-center space-x-4">
                <div className='block w-[90px] h-[90px]'>
                    <img src={Avtar} alt="avtar" className='rounded-full w-[90px] h-[90px]' />
                </div>
                <div className='block'>
                    <button type='button' className='rounded text-[11px] font-Karla text-white bg-active h-5 tracking-[-0.03em] pt-0.5 font-bold px-2.5'>Active</button>
                    <h4 className='font-bold text-base'>Manager</h4>
                    <p className='font-normal text-base text-light-dark'>Jan Jones <Link to="/" className='text-primary' underline>Modify</Link></p>
                </div>  
            </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSettingTab