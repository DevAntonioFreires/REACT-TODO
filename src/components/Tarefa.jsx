import React from 'react'
import App from '../App'

function Tarefa({ tarefa, onToggleConcluida, onToggleSelect, selecionada }) {
  return (
    <li style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px',background:selecionada ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',borderRadius:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
        <input type="checkbox" checked={selecionada} onChange={() => onToggleSelect(tarefa.id)} style={{width:'18px',height:'18px'}}/>
        <span style={{cursor:'pointer', textDecoration: tarefa.concluida ? 'line-through' : 'none'}} onClick={() => onToggleConcluida(tarefa.id)}>
          {tarefa.texto}
        </span>
      </div>
    </li>
  )
}

export default Tarefa
