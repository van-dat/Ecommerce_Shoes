import React, { useState, useEffect } from 'react'
import InputForm from './components/InputForm'
import { useForm } from 'react-hook-form'
import * as apis from '../../apis'
import notImage from './image/notimage.jpg'
import moment from 'moment'
import icons from '../../ultils/icon'
import { Pagination } from '../../components'

const { LuClipboardEdit, PiShoppingCartThin ,BiSearch} = icons
const ManageProduct = () => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const [counts, setCounts] = useState();

  const [dataProduct, setDataProduct] = useState();

  const [page, setPage] = useState(1);

  const fetchData = async (params) => {
    const response = await apis.apiProducts(params)
    if (response.success) {
      setCounts(response.counts)
      setDataProduct(response.product)
    }
    console.log(dataProduct)
  }
  const handleSearch = (data) => {
    if (data.q == '') {
      fetchData()
    }
    fetchData({ title: data.q })
  }


  useEffect(() => {
    fetchData({ page })
  }, [page]);

  console.log(dataProduct)
  return (
    <div className='flex flex-col '>
      <div className='p-4 mb-4 flex justify-between items-center  text-2xl font-semibold bg-white rounded-md'>
        <h6 className=' m-0 text-2xl text-[#333] uppercase'>Manage Product</h6>
      </div>
      <div className='flex flex-col bg-white p-4 '>
        <div className='flex relative  justify-end  items-center  mb-4'>
          <form onSubmit={handleSubmit(handleSearch)} className='w-[40%]'>
            <InputForm
              id={'q'}
              placeholder='Search product by title'
              register={register}
              errors={errors}
              fullWidth
            />
          </form>
          <div className='absolute inset-y-0 right-0 flex items-center px-4 text-[#333] '><BiSearch size={23}/></div>
        </div>
        <table className="table-auto w-full border-t ">
          <thead>
            <tr >
              <th className='text-center py-4 '>STT</th>
              <th className='text-center py-4 '>Title</th>
              <th className='text-center py-4 '>Image</th>
              <th className='text-center py-4 '>Price</th>
              <th className='text-center py-4 '>Category</th>
              <th className='text-center py-4 '>Quantity</th>
              <th className='text-center py-4 '>Sold</th>
              <th className='text-center py-4 '>size</th>
              {/* <th className='text-center py-4 '>description</th> */}
              <th className='text-center py-4 '>UpdatedAt</th>
              <th className='text-center py-4 '>Action</th>


            </tr>
          </thead>
          <tbody>
            {dataProduct?.map((item, idx) => (
              <tr key={item._id} className='border-y'>
                <td className='text-center '>{idx + 1}</td>
                <td className='text-center '>{item.title}</td>
                <td className='text-center flex items-center justify-center  '>
                  {item.thumbnail.length > 0 && <img src={item.thumbnail} alt="image" className='w-[100px] h-[100px] object-contain' />}
                  {item.thumbnail.length < 1 && <img src={notImage} alt="image" className='w-[100px] h-[100px] object-contain' />}

                </td>
                <td className='text-center '>{item.price}</td>
                <td className='text-center '>{item.category?.title}</td>
                <td className='text-center '>{item.quantity}</td>
                <td className='text-center '>{item.sold}</td>
                {/* <td className='text-center '><div innerHTML = {item.description}></div></td> */}
                <td className='text-center '>{item.size}</td>

                <td className='text-center '>{moment(item.updatedAt).format('DD-MM-YYYY')}</td>
                <td>
                  <div className='flex justify-center items-center'>
                    <LuClipboardEdit />
                  </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {dataProduct?.length < 1 &&
          <div className="flex border-t py-4 w-full items-center justify-center flex-col border-b mt-3 pb-4 text-main">
            <PiShoppingCartThin size={60} />
            <span >Hiện chưa có sản phẩm</span>
          </div>}
        <div className='flex  items-end justify-end my-4'>
          {dataProduct?.length > 1 &&
            <Pagination totalPage={counts}
              setPage={setPage} />}
        </div>
      </div>
    </div>
  )
}

export default ManageProduct
