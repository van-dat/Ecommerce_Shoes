import React, { useEffect, useState } from 'react'
import icons from '../../../ultils/icon'
import * as apis from '../../../apis'


const { BsFillTrashFill, HiOutlinePencilSquare } = icons

const Table = () => {



  const [dataTable, setDataTable] = useState(null);
  const deleteTable = () => {

  }

  const editTable = () => {

  }

  const fetchData = async () => {
    const response = await apis.apiGetAllUser()
    if (response.success) setDataTable(response.user)
  }



  useEffect(() => {
    fetchData()
  }, []);

  console.log(dataTable)
  return (
    <>
      <div className="w-full overflow-hidden">
        <table className="table-auto w-full ">
          <tr className="bg-gray-2 text-left ">
            <th className="min-w-[50px]  px-4 font-medium text-black ">STT</th>
            <th className="min-w-[150px]  px-4 font-medium text-black ">Email</th>
            <th className=" px-4 font-medium text-black ">Tên</th>
            <th className=" px-4 font-medium text-black ">Value to give alert</th>
            <th className=" px-4 font-medium text-black ">Alert type</th>
            <th className=" px-4 font-medium text-black ">Actions</th>
          </tr>

            {dataTable?.map((item, index) => (
              <tr className="content-center">
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{index+1}</td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className='s'>
                    {item.email}
                  </span>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span>
                    {item.firstname + item.lastname}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">ssss</td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span>
                    dsadas
                  </span>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className="actions flex grid-cols-2 gap-4">
                    <BsFillTrashFill
                      className="delete-btn cursor-pointer"
                      onClick={() => deleteTable()} />

                    <HiOutlinePencilSquare
                      className="edit-btn cursor-pointer"
                      onClick={() => editTable()} />

                  </span>
                </td>
              </tr>
            ))}
        </table>
      </div>


    </>
  )
}

export default Table
