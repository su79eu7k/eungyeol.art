import { useMemo } from 'react'
import { createPortal } from 'react-dom'

function Portal (props) {
  const container = useMemo(() => document.getElementById(props.container), [props.container])

  return createPortal(props.children, container)
}

export default Portal