import React from 'react'
import Tarefa from './Tarefa'

function ListaTarefas({ tarefas, onToggleConcluida, onToggleSelect, selectedIds }) {
  if (!tarefas || tarefas.length === 0) return null

  return (
    <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'8px'}}>
      {tarefas.map(t => (
        <Tarefa
          key={t.id}
          tarefa={t}
          onToggleConcluida={onToggleConcluida}
          onToggleSelect={onToggleSelect}
          selecionada={selectedIds.includes(t.id)}
        />
      ))}
    </ul>
  )
}

export default ListaTarefas
