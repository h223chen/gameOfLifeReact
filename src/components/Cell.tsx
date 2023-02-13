import React from 'react'

function Cell(props: any) {
  const styles = {
    container: {
      height: '1rem',
      width: '1rem',
      border: '1px solid white'
    }
  }

  return (
    <div style={{
      ...styles.container,
      background: props.value === 1 ? 'white' : 'grey'
      }}>
      
    </div>
  )
}

export default Cell