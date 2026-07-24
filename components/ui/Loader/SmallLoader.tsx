import React from 'react'
import { Oval } from 'react-loader-spinner'

const SmallLoader = () => {
  return (
    <>
        <Oval
            visible={true}
            height="80"
            width="80"
            color="#5c7069"
            secondaryColor="#f0f0f0"
            strokeWidth={3}
            strokeWidthSecondary={3}
            ariaLabel="loading"
        />
    </>
  )
}

export default SmallLoader
