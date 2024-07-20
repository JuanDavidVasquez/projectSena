import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";

const obtenerTareas = async (req, res) => {
  const tareas = await Tarea.find().where("creador").equals(req.usuario);

  res.json(tareas);
};

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);

  if (!existeProyecto) {
    const error = new Error("El Proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos para añadir tareas");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const tareaAlmacenda = await Tarea.create(req.body);
    //Almacenar ID en el proyecto

    existeProyecto.tareas.push(tareaAlmacenda._id);
    await existeProyecto.save();

    res.json(tareaAlmacenda);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString !== req.usuario._id.toString) {
    const error = new Error("Eccion no valida");
    return res.status(403).json({ msg: error.message });
  }

  res.json(tarea);
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString !== req.usuario._id.toString) {
    const error = new Error("Eccion no valida");
    return res.status(403).json({ msg: error.message });
  }

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;

  try {
    const tareaAlmacenado = await tarea.save();
    return res.json(tareaAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString !== req.usuario._id.toString) {
    const error = new Error("Eccion no valida");
    return res.status(403).json({ msg: error.message });
  }

  try {
    //Eliminar tarea del proyecto
    const proyecto = await Proyecto.findById(tarea.proyecto);
    proyecto.tareas.pull(tarea._id);

    //Realizar varios awaits al tiempo sin bloquearse
    await Promise.allSettled([await proyecto.save(), await tarea.deleteOne()]);

    res.json({ msg: "La Tarea se elimino correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const cambiarEstado = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }
  if (
    tarea.proyecto.creador.toString() !== req.usuario._id.toString() &&
    !tarea.proyecto.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error.message });
  }

  tarea.estado = !tarea.estado;
  tarea.completado = req.usuario._id;
  await tarea.save();

  const tareaAlmacenada = await Tarea.findById(id)
  .populate("proyecto")
  .populate("completado");

  res.json(tareaAlmacenada);
};

export {
  obtenerTarea,
  agregarTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
