import * as React from 'react'

interface IProps {
  history: any
}

class Component extends React.Component<IProps> {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className="Index">
        Index
      </div>
    )
  }
}

export default Component