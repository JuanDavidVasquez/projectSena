import React, { useEffect, useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";

export default function FormularioProyecto() {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  const params = useParams();

  useEffect(()=>{
    if(params.id){
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
      setCliente(proyecto.cliente)
    }else{
      console.log('Nuevo proyecto')
    }
  },[params])



  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });
      return;
    }

    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

    setId(null)
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setCliente("");
  };

  const { msg } = alerta;

  return (
    <div className="grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="nombre"
          >
            Nombre Proyecto
          </label>
          <input
            id=""
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-sm"
            placeholder="Nombre del Proyecto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="descripcion"
          >
            Descripción Proyecto
          </label>
          <textarea
            id="descripcion"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-sm"
            placeholder="Descripción del Proyecto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="fecha-entrega"
          >
            Fecha de Entrega
          </label>
          <input
            id="fecha-entrega"
            type="date"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-sm"
            placeholder="Fecha de entrega"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
          />
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="nombre"
          >
            Nombre Cliente
          </label>
          <input
            id="cliente"
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-sm"
            placeholder="Nombre del Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          <input
            type="submit"
            value={id ? 'Actualizar Proyecto' : "Crear Proyecto"}
            className="bg-sky-600 w-full mt-2 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700"
          />
        </div>
      </form>
    </div>
  );
}
