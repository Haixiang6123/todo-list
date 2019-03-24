import {useState, useEffect, FunctionComponent} from 'react'
import * as React from "react";

interface IProps {
  timer: number
  onFinish: () => void
}

let timerId: number = -1

const Counter: FunctionComponent<IProps> = (props) => {
  const [counter, setCounter] = useState(props.timer)

  const min = Math.floor(counter / 1000 / 60)
  const second = Math.floor(counter / 1000 % 60)
  const time = `${min}: ${second < 10 ? `0${second}`: second}`

  useEffect(() => {
    document.title = `${time} - todo-list`

    timerId = window.setInterval(() => {
      if (counter <= 0) {
        props.onFinish()
        window.clearInterval(timerId)
      }
      setCounter(counter - 1000)
    }, 1000)

    return () => {
      window.clearInterval(timerId)
    }
  })

  return ( <div> <div> {time} </div> </div> )
}

export default Counter
