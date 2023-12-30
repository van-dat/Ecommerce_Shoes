import clsx from 'clsx'
import React from 'react'

const Selected = ({label ,  options = [],register ,errors , id, validate, style, fullWidth, defaultValue }) => {
  return (
    <div className='flex flex-col gap-2'>
      {label && <label htmlFor='id' >{label}</label>}
      <select  id={id}  {...register(id, validate)}  className={clsx('form-select', fullWidth && 'w-full', style)}>
          <option placeholder={defaultValue} value={defaultValue}>{defaultValue}</option>
          {options?.map((item, index) => (
                <option key={index}  value={item?.code}>{item?.value}</option>
              ))}
      </select>
      {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
    </div>
  )
}

export default Selected
