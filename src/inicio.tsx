import { Link } from 'react-router-dom';
export default function Inicio() {
    return (
        <div className="w-full min-h-screen flex bg-orange-800 justify-center px-4">
            <main className="my-10 w-full md:max-w-2xl">
                <h1 className="text-4xl font-medium text-white text-center mb-10">Gerenciar Pedidos</h1>
                <div className="flex flex-col">
                    <Link className="bg-green-500 cursor-pointer w-full p-2 rounded font-medium text-center mb-10" to="/pedidos">Criar novo pedido!</Link>
                </div>
                <div className="flex flex-col">
                    <Link className="bg-blue-500 cursor-pointer w-full p-2 rounded font-medium text-center mb-10" to="/getpedidos">Continuar pedidos!</Link>
                </div>
                <div className="flex flex-col">
                    <Link className="bg-gray-500 cursor-pointer w-full p-2 rounded font-medium text-center" to="/pedidos">Gerar relatórios!</Link>
                </div>
            </main>
        </div>
    )
}