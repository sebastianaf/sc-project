const errorCodes = {
  BAD_USER_OR_PASSWORD: {
    code: 10010,
    title: `Error de autenticación`,
    description: `El nombre de usuario o la contraseña no son correctos`,
  },
  OK: {
    code: 10000,
    title: `La autenticación es correcta`,
    description: `El Token coincide es válido para comunicarse con la API REST`,
  },
};

export default errorCodes;
