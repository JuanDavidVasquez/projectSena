import React, { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../componets/PreviewProyecto";
import Alerta from "../componets/Alerta";

export default function Proyectos() {
  
  const { proyectos, alerta } = useProyectos();

  const { msg } = alerta 


  return (
    <div>
      <h1 className="text-4xl font-black">Proyectos</h1>

      {msg && <Alerta alerta={alerta}/>}

      <div className="bg.white shadow mt-5 rounded-lg">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-700 p-5">No hay proyectos</p>
        )}
      </div>
    </div>
  );
}
