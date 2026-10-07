import React,{useId} from 'react'

const Select = ({
    options,
    lable,
    className,
    ref,
    ...props
}) => {
    const id=useId()


  return (
    <div className='w-full'>Select</div>
  )
}

export default Select