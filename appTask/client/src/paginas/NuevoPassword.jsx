import React, { useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../componets/Alerta";
import { Link, Navigate, useParams } from "react-router-dom";


export default function NuevoPassword() {

  const [password,setPasword] = useState('');
  const [alerta,setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado,setPasswordModificado] = useState(false);

  const params = useParams();


  const { token } = params;

  useEffect(()=>{
    const comprobarToken = async () =>{
      try {

        await clienteAxios(`/usuarios/olvide-password/${ token }`)
        setTokenValido(true);
        
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    comprobarToken();
  },[]);

  const handleSubmit = async e =>{
    e.preventDefault();

    if(password.length < 6){
      setAlerta({
        msg: 'El Paswword debe ser minimo de 6 caracteres',
        error: true
      })
      return
    }
    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, {password})
      setAlerta({
        msg:data.msg,
        error:false
      })
      setPasswordModificado(true)
      
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  }

  const { msg } = alerta;

  return (
    <div>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
       Restablece tu password tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta}/>}
      {passwordModificado && (
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/"
        >
          Inicia Sesión.
        </Link>
      )}
      {tokenValido && (
        <form className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Escribe Tu Nuevo Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPasword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Guardar Nuevo Password"
          className="mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      )}
      
    </div>
  );
}
