import React from 'react'

const Stacktitle = ({title}) => {
  return (
    <div>
         <div className=" border-b pd-2">
            <h1 className=" font-semibold text-zinc-800 text-center">
              {title}
            </h1>
          </div>
    </div>
  )
}

export default Stacktitle;