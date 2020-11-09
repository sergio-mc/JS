let logSesiones = [];

exports.crearLog = (req, res, next) => {
    logSesiones.push({
        fecha: new Date(),
        email: req.body.email,
    })
    console.log(logSesiones);
    next();
}

