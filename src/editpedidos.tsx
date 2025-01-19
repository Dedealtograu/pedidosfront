import { useEffect, useState, useRef, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from './services/api';

interface PedidoProps {
  id: string;
  cliente: string;
  status: string;
  descricao: string;
  valorTotal: number;
  dataEntrega: string;
  horaEntrega: string;
  updatedAt: string;
}

export default function Pedidos() {
  const [pedido, setPedido] = useState<PedidoProps>({} as PedidoProps)
    useEffect(() => {
      const id = window.location.pathname.split('/editpedidos/')[1]
      loadPedido(id)
    }, [])

    async function loadPedido(id: string) {
      const response = await api.get(`/pedido/${id}`)
      let { dataEntrega } = response.data
      const horaEntrega = new Date(dataEntrega).toLocaleString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      dataEntrega = new Date(dataEntrega).toLocaleString("pt-BR",{ day: "2-digit", month: "2-digit", year: "numeric" })
      setPedido({ ...response.data, dataEntrega, horaEntrega })
      //console.log(response.data)
    }
  const navigate = useNavigate();
  const clienteRef = useRef<HTMLInputElement | null>(null);
  const pedidoRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);
  const valorTotalRef = useRef<HTMLInputElement | null>(null);
  const dataEntregaRef = useRef<HTMLInputElement | null>(null);
  const horaEntregaRef = useRef<HTMLInputElement | null>(null);



  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!clienteRef.current?.value || !pedidoRef.current?.value || !valorTotalRef.current?.value || !dataEntregaRef.current?.value || !horaEntregaRef.current?.value || !statusRef.current?.value) {
      alert('Preencha todos os campos!');
      return;
    }

    const cliente = clienteRef.current?.value;
    const descricao = pedidoRef.current?.value;
    const status = statusRef.current?.value;
    const valorTotal = valorTotalRef.current?.value;
    const dataEntrega = dataEntregaRef.current?.value;
    const horaEntrega = horaEntregaRef.current?.value;
    const data = dataEntrega.split("/").reverse().join("-")

    await api.put(`/pedido/${pedido.id}`, {
      cliente: cliente,
      status: status,
      descricao: descricao,
      valorTotal: parseFloat(valorTotal),
      dataEntrega: new Date(`${data}T${horaEntrega}`).toISOString(),
    }).catch(() => {
      alert('Erro ao atualizar pedido!');
    });

    navigate('/getpedidos');
  }

  return (

    <div className="w-full min-h-screen flex bg-orange-800 justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white text-center">Atualizar Pedido</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <input type="hidden" value="pendente" />
          <label className="font-medium text-white">Cliente</label>
          <input type="text" defaultValue={pedido.cliente} className="w-full mb-5 p-2 rounded" ref={clienteRef} />

          <label className="font-medium text-white">Produtos</label>
          <input type="text" defaultValue={pedido.descricao} className="w-full mb-5 p-2 rounded" ref={pedidoRef} />
          <div>
            <label htmlFor="combobox" className="block mb-2 text-sm font-medium text-white">Status</label>
            <select id="combobox" className="w-full mb-5 p-2 rounded" ref={statusRef}>
              <option defaultValue="pendente">{pedido.status}</option>
              <option defaultValue="entregue">entregue</option>
              <option defaultValue="cancelado">pago</option>
              <option defaultValue="cancelado">finalizado</option>
            </select>
          </div>

          <label className="font-medium text-white">Valor do pedido</label>
          <input type="number" defaultValue={pedido.valorTotal} className="w-full mb-5 p-2 rounded" ref={valorTotalRef} />

          <div className="flex justify-between">
            <div className="flex flex-col w-80 mr-1">
              <label className="font-medium text-white">Data da entrega</label>
              <input type="text" defaultValue={pedido.dataEntrega}className=" mb-5 p-2 rounded" ref={dataEntregaRef} />
            </div>
            <div className="flex flex-col w-80 ml-1">
              <label className="font-medium text-white">Hora de entrega</label>
              <input type="text" defaultValue={pedido.horaEntrega} className=" mb-5 p-2 rounded" ref={horaEntregaRef} />
            </div>
          </div>

          <input type="submit" value="Atualizar pedido" className="bg-green-500 cursor-pointer w-full p-2 rounded font-medium mb-5" />

          <div className="flex flex-col w-full">
            <Link to="/" className="bg-gray-500 cursor-pointer w-full p-2 rounded font-medium text-center">Voltar</Link>
          </div>

        </form>
      </main>
    </div>
  )
}
