import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from './services/api';
import { FaEdit } from "react-icons/fa";
import { FiTrash } from 'react-icons/fi';

interface PedidoProps {
  id: string;
  cliente: string;
  status: string;
  descricao: string;
  valorTotal: number;
  dataEntrega: string;
}
export default function GetPedidos() {
  const [pedidos, setPedidos] = useState<PedidoProps[]>([])

  useEffect(() => {
    loadPedidos()
  }, [])

  async function loadPedidos() {
    const response = await api.get('/pedidos')
    setPedidos(response.data)
  }

  async function deletePedido(id: string) {
    try {
      if (window.confirm('Deseja realmente excluir este pedido?')) {
        await api.delete("/pedido",
          {
            params: { id: id }
          }
        )

        loadPedidos()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full min-h-screen flex bg-orange-800 justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white text-center mb-10">Pedidos</h1>
        <div className="flex justify-between mb-10">
            <div className="flex flex-col w-80 mr-1">
              <Link to="/" className="bg-gray-500 cursor-pointer w-full p-2 rounded font-medium text-center">Voltar</Link>
            </div>
            <div className="flex flex-col w-80 ml-1">
              <Link to="/pedidos" className="bg-green-500 cursor-pointer w-full p-2 rounded font-medium text-center">Novo pedido</Link>
            </div>
        </div>

        {pedidos.map((pedido) => {
          return (
            <article key={pedido.id} className='w-full rounded bg-white p-2 relative hover:scale-105 duration-200 mb-10'>
              <p><span className='font-medium'>Cliente:</span> {pedido.cliente}</p>
              <p><span className='font-medium'>Status:</span> {pedido.status}</p>
              <p><span className='font-medium'>Pedido:</span> {pedido.descricao}</p>
              <p><span className='font-medium'>Valor:</span> {pedido.valorTotal}</p>
              <p><span className='font-medium'>Data de entrega:</span> {new Date(pedido.dataEntrega).toLocaleString("pt-BR")}</p>

              <button className='absolute -top-2 right-10 bg-blue-500 p-2 rounded-full w-7 h-7 flex justify-center items-center' onClick={() => window.location.href = `/editpedidos/${pedido.id}`}>
                <FaEdit size={18} color='#fff' />
              </button>
              <button className='absolute -top-2 right-0 bg-red-500 p-2 rounded-full w-7 h-7 flex justify-center items-center' onClick={() => deletePedido(pedido.id)}>
                <FiTrash size={18} color='#fff' />
              </button>
            </article>
          )
        })}
      </main>
    </div>
  )
}
