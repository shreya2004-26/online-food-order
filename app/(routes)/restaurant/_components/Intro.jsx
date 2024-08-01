import Image from 'next/image'
import React from 'react'

function Intro({ restaurant }) {
    console.log("restaurant banner is ", restaurant?.banner)
    return (
        <div>
            <div>
                <Image src={restaurant?.banner?.url}
                    width={1000}
                    height={300}
                    className='w-full h-[220px] object-cover rounded-xl' />
            </div>
        </div>
    )
}

export default Intro