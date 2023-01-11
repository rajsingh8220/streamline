import React from 'react'

const GlobalBillings = () => {
    return (
      <div className='block'>
        <div className='flex items-center justify-between columns-2 mb-4'>
          <div className='block w-[50%]'>
            <h2 className='text-text-dark font-Karla text-lg font-bold'>Invoices</h2>
          </div>
          <div className='flex justify-end w-[50%]'>
            <select id="countries" className="min-w-[151px]  border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option defaultValue="Invoice">Invoices</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="block">
          <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase border-b-2 border-blueDark dark:bg-gray-700 dark:text-gray-400 mb-3">
                      <tr>
                          <th scope="col" className="py-2 px-6 pl-0 text-light-dark text-sm tracking-[-.03em] capitalize font-bold font-Karla">
                              Date
                          </th>
                          <th scope="col" className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-bold font-Karla">
                              Invoice Number
                          </th>
                          <th scope="col" className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-bold font-Karla">
                              Type
                          </th>
                          <th scope="col" className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-bold font-Karla">
                              Amount
                          </th>
                          <th scope="col" className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-bold font-Karla">
                              Status
                          </th>
                      </tr>
                  </thead>
                  <tbody className='spaceTbody'>
                      <tr className="bg-white">
                          <th scope="row" className="py-2 px-6 pl-0 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Apple MacBook Pro 17"
                          </th>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Sliver
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Laptop
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              $2999
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                            <span className="bg-[#F8BF2A] text-white text-xs cursor-pointer font-semibold px-2.5 py-1 rounded ">Pending</span>
                          </td>
                      </tr>
                      <tr className="bg-white">
                          <th scope="row" className="py-2 px-6 pl-0 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Microsoft Surface Pro
                          </th>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              White
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Laptop PC
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              $1999
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                            <span className="bg-[#F8BF2A] text-white text-xs cursor-pointer font-semibold px-2.5 py-1 rounded ">Pending</span>
                          </td>
                      </tr>
                      <tr className="bg-white">
                          <th scope="row" className="py-2 px-6 pl-0 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Magic Mouse 2
                          </th>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Black
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Accessories
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              $99
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                            <span className="bg-[#F8BF2A] text-white text-xs cursor-pointer font-semibold px-2.5 py-1 rounded ">Pending</span>
                          </td>
                      </tr>
                      <tr className="bg-white">
                          <th scope="row" className="py-2 px-6 pl-0 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Magic Mouse 2
                          </th>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Black
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Accessories
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              $99
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                            <span className="bg-[#F8BF2A] text-white text-xs cursor-pointer font-semibold px-2.5 py-1 rounded ">Pending</span>
                          </td>
                      </tr>
                      <tr className="bg-white">
                          <th scope="row" className="py-2 px-6 pl-0 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Magic Mouse 2
                          </th>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Black
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              Accessories
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                              $99
                          </td>
                          <td className="py-2 px-6 text-light-dark text-sm tracking-[-.03em] capitalize font-normal font-Karla">
                            <span className="bg-[#F8BF2A] text-white text-xs cursor-pointer font-semibold px-2.5 py-1 rounded ">Pending</span>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>
      </div>
    )
}

export default GlobalBillings