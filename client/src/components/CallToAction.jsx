import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Are You an <b>Alumna</b>?
            </h2>
            <p className='text-gray-500 my-2'>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none' >
            <p><i>"Join our alumnae network and make a difference! Whether it’s sharing career advice, memories, or success stories, your voice matters."</i></p>
                </Button>
            </p>
            
        </div>
        <div className="p-7 flex-1">
            <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        </div>
    </div>
  )
}