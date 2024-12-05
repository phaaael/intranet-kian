import React from "react"

type Request = {
  nome: string
  url: string
}

export default function Requests() {
  const requests: Request[] = [
    { nome: "Cadastro de Fornecedor", url: "http://app.pipefy.com/public/form/eVlagwKS" },
    { nome: "Cadastro de Clientes", url: "https://main.d1sxsagtl05vgc.amplifyapp.com/novo-formulario" },
    { nome: "Entrada de Clientes", url: "https://forms.office.com/r/kU06MCd1mG" },
    { nome: "Financeiro", url: "http://app.pipefy.com/public/form/uvh6h89I" },
    { nome: "UniKian", url: "https://app.pipefy.com/public/form/BfhwjqqT" },
    { nome: "Brindes e MPDV", url: "https://externokian.com/pedido-brinde" },
    { nome: "Solicitação Facilities", url: "https://forms.office.com/r/N9J0sg6smU" },
    { nome: "Registro de Ocorrência", url: "https://forms.office.com/pages/responsepage.aspx?id=gdzp39yiAEqL96eBmH6YEeMcxVc9a8RPkQLBCM3-supUMVROSzZIMFRPNlBPT0hQQU1aS0VBWlNPQy4u" },
    { nome: "Pipefy", url: "https://app.pipefy.com/portals/portalrca" },
  ]

  return (
    <div className="flex flex-col bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Requisições</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((req, index) => (
          <a
            key={index}
            href={req.url}
            target="_blank"
            className="bg-white text-gray-800 py-4 px-6 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200 transition duration-200 text-center"
          >
            {req.nome}
          </a>
        ))}
      </div>
    </div>
  )
}
