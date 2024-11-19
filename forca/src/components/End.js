import React from 'react'
import Button from './subComponents/Button'

const End = ({Restart}) => {
  return (
    <div className="container">
      <h2>Game Over</h2>
      <Button text={"Restart"} func={Restart} />
    </div>
  )
}

export default End
