import { pool } from '../config/db.js'

const all = async () => {
  const [usuarios] = await pool.query('SELECT * FROM usuarios')
  return usuarios
}

const remove = async (id) => {
  const [resultado] = await pool.execute('DELETE FROM usuarios WHERE usuario_id = ?', [id])

  return resultado.affectedRows === 1
}

const create = async ({ nombre, email, password, rolId, imagen }) => {
  const [resultado] = await pool.execute('INSERT INTO usuarios(nombre,email, password, rol_id, imagen) VALUES(?, ?, ?, ?, ?)', [nombre, email, password, rolId, imagen])

  return resultado.affectedRows === 1
}

const update = async ({ id, nombre, email, password, rolId, imagen }) => {
  const [resultado] = await pool.execute('UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol_id = ?, imagen = ? WHERE usuario_id = ?', [nombre, email, password, rolId, imagen, id])

  return resultado.affectedRows === 1
}

export default { all, remove, create, update }
