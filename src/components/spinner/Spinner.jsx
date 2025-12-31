import React from 'react'
import Styles from './Spinner.module.css'

export const Spinner = () => {
  return (
    <div className={Styles['spinner-container']}>
        <div className={Styles['spinner']}></div>
    </div>
  )
}

