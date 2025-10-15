import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import InputTarefa from './components/InputTarefa'
import ListaTarefas from './components/ListaTarefas'

const STORAGE_KEY = 'tarefas_vinho_v4'

function App() {
  const [tarefas, setTarefas] = useState([])
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try { setTarefas(JSON.parse(raw)) } catch (e) { console.error(e) }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas))
  }, [tarefas])

  function adicionarTarefa(texto) {
    if (!texto || !texto.trim()) return
    const nova = {
      id: Date.now().toString(),
      texto: texto.trim(),
      concluida: false
    }
    setTarefas(prev => [nova, ...prev])
  }

  function alternarConcluida(id) {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t))
    setSelectedIds(prev => prev.filter(x => x !== id))
  }

  function toggleSelect(id) {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function removerSelecionadas() {
    if (selectedIds.length === 0) return
    setTarefas(prev => prev.filter(t => !selectedIds.includes(t.id)))
    setSelectedIds([])
  }

  const tarefasConcluidas = tarefas.filter(t => t.concluida)
  const tarefasPendentes = tarefas.filter(t => !t.concluida)

  const total = tarefas.length
  const concluidas = tarefasConcluidas.length

  const appContainer = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '0 16px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #4b0000, #1a0000)',
  }

  const mainCard = {
    background: 'rgba(2, 0, 0, 0.1)',
    padding: '16px',
    borderRadius: '8px',
  
  }

  const acoesSuperior = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    justifyContent: 'space-between',
    background: '#f7f0f0ff',
    padding: '10px',
    borderRadius: '8px',
  }

  const btnLixeira = {
    padding: '10px 14px',
    border: 'none',
    borderRadius: '8px',
    background: '#5f1111ff',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    height: '42px',
  }

  const rodape = {
    textAlign: 'center',
    padding: '12px 0',
    fontSize: '0.9rem',
    color: '#faf7f7ff',
    borderTop: '1px solid #ccc',
    marginTop: '20px',
  }

  const secaoConcluidas = {
    marginTop: '20px',
    borderTop: '1px solid #f30909ff',
    paddingTop: '12px',
  }
  

  return (
    <div style={appContainer}>
      <Header total={total} concluidas={concluidas} />
      <main style={mainCard}>
        <div style={acoesSuperior} >
          <InputTarefa onAdd={adicionarTarefa} />
          <button style={btnLixeira} onClick={removerSelecionadas} title="Remover selecionadas">
            🗑️
          </button>
        </div>

        <ListaTarefas
          tarefas={tarefasPendentes}
          onToggleConcluida={alternarConcluida}
          onToggleSelect={toggleSelect}
          selectedIds={selectedIds}
        />

        {tarefasConcluidas.length > 0 && (
          <div style={secaoConcluidas}>
            <h3>Tarefas Concluídas</h3>
            <ListaTarefas
              tarefas={tarefasConcluidas}
              onToggleConcluida={alternarConcluida}
              onToggleSelect={toggleSelect}
              selectedIds={selectedIds}
            />
            {tarefasConcluidas.length > 1 && (
              <div style={{marginTop:'12px', textAlign:'right'}}>
                <button style={btnLixeira} onClick={() => setTarefas(prev => prev.filter(t => !t.concluida))}>
                 Remover todas concluídas
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer style={rodape}>
        <small>Total: {total}  Concluídas: {concluidas}</small>
      </footer>
    </div>
  )
}

export default App
