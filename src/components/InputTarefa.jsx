import React, { useState } from 'react'

function InputTarefa({ onAdd }) {
  const [texto, setTexto] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(texto)
    setTexto('')
  }

  return (
    <form onSubmit={handleSubmit} style={{display:'flex', gap:'8px', flex:1}}>
      <input
        background='#5e3434ff'
        type="text"
        placeholder="Digite uma nova tarefa"
        value={texto}
        onChange={e => setTexto(e.target.value)}
        style={{flex:1,padding:'10px',border:'1px solid #f3dede',borderRadius:'8px'}}
      />
      <button type="submit" style={{padding:'10px 14px',border:'none',borderRadius:'8px',background:'#7a1212',color:'white',cursor:'pointer',fontWeight:'bold'}}>+</button>
    </form>
  )
}

export default InputTarefa
