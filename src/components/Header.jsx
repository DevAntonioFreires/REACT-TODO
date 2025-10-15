import React from 'react'

function Header({ total, concluidas }) {
  return (
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px',color:'#fff4f4'}}>
      <h1 style={{margin:0,fontSize:'1.6rem'}}>Lista de Tarefas</h1>
      <div>{concluidas} / {total} concluídas</div>
    </header>
  )
}

export default Header
