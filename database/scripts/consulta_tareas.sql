SELECT C.Nombre, T.Descripcion, T.Fecha_Inicio, T.Fecha_Fin, T.Fecha_Relativa, U.Nombre, M.Puesto
FROM jpm.categorias C, jpm.tareas T, jpm.usuarios U, jpm.puesto M
WHERE C.idCategorias = T.idCategorias AND U.idUsuario = T.idUsuario AND U.idPuesto = M.idPuesto