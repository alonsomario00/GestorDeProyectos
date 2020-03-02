SELECT T.*, U.nombreUsuario AS Boss FROM jpm.tareas T
   INNER JOIN usuarios U ON t.idBoss=U.idUsuario