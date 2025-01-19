import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pedidos from "./pedidos";
import Inicio from "./inicio";
import GetPedidos from "./getpedidos";
import EditPedidos from "./editpedidos";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/getpedidos" element={<GetPedidos />} />
        <Route path="/editpedidos/:id" element={<EditPedidos />} />
      </Routes>
    </BrowserRouter>
  )
}
