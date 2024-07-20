import React from "react";
import FormularioProyecto from "../componets/FormularioProyecto";

export default function NuevoProyecto() {
  return (
    <div>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>

      <div></div>
    </div>
  );
}
