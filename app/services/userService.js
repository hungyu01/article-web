const UserRepository = require('../repositories/userRepository');

class UserService {
  async createUser(userData) {
    return await UserRepository.create(userData);
  }

  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUserById(id) {
    return await UserRepository.findById(id);
  }

  async updateUser(id, userData) {
    return await UserRepository.update(id, userData);
  }

  async deleteUser(id) {
    return await UserRepository.delete(id);
  }
}

module.exports = new UserService(); 