import usuariosModel from '../models/usuarios.model.js'
import { nuevoNombreArchivo } from '../config/multer.js'

export const index = async (req, res) => {
  const usuarios = await usuariosModel.all()
  res.json(usuarios)
}

export const remove = async (req, res) => {
  const { id } = req.params

  const eliminado = await usuariosModel.remove(id)

  if (eliminado) {
    return res.json({ message: 'Usuario eliminado' })
  } else {
    return res.status(500).json({ message: 'No se pudo eliminar el usuario' })
  }
}

export const store = async (req, res) => {
  try {
    const { nombre, email, password, rolId } = req.body

    if (!nombre || !email || !password || !rolId) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const imagen = nuevoNombreArchivo
    if (imagen === null) {
      return res.status(400).json({ message: 'No se proporcionó una imagen' })
    }

    const resultado = await usuariosModel.create({ nombre, email, password, rolId, imagen })

    if (resultado) {
      return res.status(201).json({ message: 'Usuario creado' })
    } else {
      return res.status(500).json({ message: 'No se puede crear el usuario' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const update = async (req, res) => {
  try {
    const { nombre, email, password, rolId } = req.body
    const { id } = req.params

    if (!id || !nombre || !email || !password || !rolId) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const imagen = nuevoNombreArchivo
    if (imagen === null) {
      return res.status(400).json({ message: 'No se proporcionó una imagen' })
    }

    const resultado = await usuariosModel.update({ id, nombre, email, password, rolId, imagen })

    if (resultado) {
      return res.json({ message: 'Usuario actualizado' })
    } else {
      return res.status(500).json({ message: 'No se puedo actualizar el usuario' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
