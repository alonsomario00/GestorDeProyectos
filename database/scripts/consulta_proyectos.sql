SELECT P.Nombre, P.Descripcion, P.Fecha_Inicio, P.Fecha_Fin, U.Nombre
FROM jpm.proyectos P, jpm.usuarios U, jpm.puesto M
WHERE U.idPuesto = 2 AND P.idResponsable = U.idUsuario AND U.idPuesto = M.idPuesto