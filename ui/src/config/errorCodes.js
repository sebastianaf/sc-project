const errorCodes = {
  INCOMPLETE_USER_OR_PASSWORD: {
    code: 20010,
    title: `Error de autenticación`,
    description: `Los datos de inicio de sesión están incompletos`,
  },
  CONECTION_ERROR: {
    code: 20015,
    title: `Error de conexión`,
    description: `No se ha podido establecer conexión con el servidor, por favor intente en otro momento. Si el problema persiste informe al administrador de la aplicación.`,
  },
  COMPUTE_ERROR: {
    code: 20020,
    title: `Error en el cálculo`,
    description: `No se ha podido establecer conexión con el servidor de cálculo o los parámetros enviados están errados.`,
  },
  INCOMPLETE_PARAMS: {
    code: 20025,
    title: `Parámetros vacios`,
    description: `Los parámeros del problema están vacios, por favor complételos.`,
  },
};

export default errorCodes;
