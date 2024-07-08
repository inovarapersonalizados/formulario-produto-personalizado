import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div>
        <h1>Ops! Página não encontrada</h1>
        <button>
            <a href="https://inovarapersonalizados.com">Voltar para loja virtual</a>
        </button>
        <button>
            <Link to="/">Voltar para formulário de personalização</Link>
        </button>
    </div>
  )
}

export default ErrorPage