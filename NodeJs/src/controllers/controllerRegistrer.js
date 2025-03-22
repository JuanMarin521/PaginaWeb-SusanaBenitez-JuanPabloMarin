const { body, validationResult } = require('express-validator');

const controllerRegistrer = {
    register: [
        // Validaciones
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('email').isEmail().withMessage('El email no es válido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('tipoUsuario').isIn(['cliente', 'trabajador']).withMessage('El tipo de usuario no es válido'),
        body('codigoTrabajador').custom((value, { req }) => {
            if (req.body.tipoUsuario === 'trabajador' && value !== 'REST123') {
                throw new Error('Código de trabajador incorrecto');
            }
            return true;
        }),

        // Controlador
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Simulación de registro exitoso
            return res.status(200).json({ message: 'Registro exitoso' });
        }
    ]
};

module.exports = controllerRegistrer;