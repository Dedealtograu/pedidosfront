import { useRef, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from './services/api';

export default function Pedidos() {
  const navigate = useNavigate();
  const clienteRef = useRef<HTMLInputElement | null>(null);
  const pedidoRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLInputElement | null>(null);
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
    let dataEntrega = dataEntregaRef.current?.value;
    const horaEntrega = horaEntregaRef.current?.value;

    dataEntrega = `${dataEntrega}T${horaEntrega}`;

    dataEntrega = new Date(dataEntrega).toISOString();

    await api.post('/pedido', {
      cliente: cliente,
      status: status,
      descricao: descricao,
      valorTotal: parseFloat(valorTotal),
      dataEntrega: dataEntrega,
    }).catch(() => {
      alert('Erro ao cadastrar pedido!');
    });

    navigate('/getpedidos');
  }

  function cleanFields() {
    clienteRef.current!.value = '';
    pedidoRef.current!.value = '';
    valorTotalRef.current!.value = '';
    dataEntregaRef.current!.value = '';
    horaEntregaRef.current!.value = '';
  }

  return (
    <div className="w-full min-h-screen flex bg-orange-800 justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white text-center">Pedidos</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <input type="hidden" value="pendente" ref={statusRef} />
          <label className="font-medium text-white">Cliente</label>
          <input type="text" placeholder="Digite o nome do cliente" className="w-full mb-5 p-2 rounded" ref={clienteRef} required />

          <label className="font-medium text-white">Produtos</label>
          <input type="text" placeholder="Digite o pedido do cliente" className="w-full mb-5 p-2 rounded" ref={pedidoRef} required />

          <label className="font-medium text-white">Valor do pedido</label>
          <input type="number" placeholder="Digite o valor do pedido" className="w-full mb-5 p-2 rounded" ref={valorTotalRef} required />

          <div className="flex justify-between">
            <div className="flex flex-col w-80 mr-1">
              <label className="font-medium text-white">Data de entrega</label>
              <input type="date" className=" mb-5 p-2 rounded" ref={dataEntregaRef} required />
            </div>
            <div className="flex flex-col w-80 ml-1">
              <label className="font-medium text-white">Hora de entrega</label>
              <input type="time" className=" mb-5 p-2 rounded" ref={horaEntregaRef} required />
            </div>
          </div>

          <input type="submit" value="Salvar pedido" className="bg-green-500 cursor-pointer w-full p-2 rounded font-medium mb-5" />

          <div className="flex justify-between">
            <div className="flex flex-col w-80 mr-1">
              <Link to="/" className="bg-gray-500 cursor-pointer w-full p-2 rounded font-medium text-center">Voltar</Link>
            </div>
            <div className="flex flex-col w-80 ml-1">
            <input type="button" value="Limpar tudo" className="bg-gray-400 cursor-pointer w-full p-2 rounded font-medium" onClick={cleanFields} />
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
