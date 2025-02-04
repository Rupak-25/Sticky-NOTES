

const Btn = (prop) => {
  return (
    <button onClick={prop.click} className='hover:bg-gray-100 w-8 h-8 flex justify-center items-center'>
        {prop.icon}
    </button>
  )
}

export default Btn
