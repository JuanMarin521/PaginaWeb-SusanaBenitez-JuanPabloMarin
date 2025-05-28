const UserRepository = require('../../repositories/userRepository');

class UserService {
    async registerUser(userData) {
        const { documentNumber, username } = userData;

        const existingUserByDocument = await UserRepository.findByDocumentNumber(documentNumber);
        if (existingUserByDocument) {
            throw new Error('La cédula ' + documentNumber + ' ya está registrada.');
        }

        const existingUserByUsername = await UserRepository.findByUsername(username);
        if (existingUserByUsername) {
            throw new Error('El nombre de usuario ya está en uso.');
        }

        return UserRepository.createUser(userData);
    }

    async loginUser(userData, requiereTrabajador = false) {
        const { password, username } = userData;

        const existingUser = await UserRepository.findByUsername(username);

        if (!existingUser || existingUser.password !== password) {
            throw new Error('Usuario o contraseña incorrectos.');
        }

        const isTrabajador = existingUser.isTrabajador?.[0] === 1;

        if (requiereTrabajador && !isTrabajador) {
            throw new Error('Este usuario no tiene permisos de trabajador.');
        }

        return existingUser;
    }

    async findUserByUsername(username) {
        return await UserRepository.findByUsername(username);
    }
}

module.exports = new UserService();