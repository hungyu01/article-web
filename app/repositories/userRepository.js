const User = require('../models/user');

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findAll() {
    return User.users;
  }

  async findById(id) {
    return await User.findById(id);
  }

  async update(id, userData) {
    const user = await User.findById(id);
    if (!user) return null;

    if (userData.username) user.username = userData.username;
    if (userData.email) user.email = userData.email;
    return user;
  }

  async delete(id) {
    const index = User.users.findIndex(user => user._id === id);
    if (index === -1) return null;

    const [deletedUser] = User.users.splice(index, 1);
    return deletedUser;
  }
}

module.exports = new UserRepository(); 