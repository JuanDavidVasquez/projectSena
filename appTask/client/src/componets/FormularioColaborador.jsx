import React, { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

export default function FormularioColaborador() {

    const [email,setEmail] = useState('')

    const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

    const handleSubmit = e =>{
        e.preventDefault();

        if(email === ''){
            mostrarAlerta({
                msg:'El Email es obligatorio',
                error:true
            })
            return
        }

        submitColaborador(email)
    }

    const { msg } = alerta

  return (
    <form 
    onSubmit={handleSubmit}
    className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
    {msg && <Alerta alerta={alerta}/>}
    <div className="mb-5">
      <label
        className="text-gray-700 uppercase font-bold text-sm"
        htmlFor="email"
      >
        Email del Colaborador
      </label>
      <input
        id="email"
        type="email"
        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-sm"
        placeholder="Email del usuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
      type="submit"
      value="Buscar Colaborador"
      className="bg-sky-600 w-full mt-2 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700"
    />
    </div>
    </form>
  );
}
