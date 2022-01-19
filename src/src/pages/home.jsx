import React from 'react'

const HomePage = () => {
    const style = {
        background:"red",
        height:"100%"
    }
    console.log("[Homepage]Connected")

    return(
        <>
            <div style={style}>
                Hello, Home Page
            </div>
        </>
    )
}

export default HomePage