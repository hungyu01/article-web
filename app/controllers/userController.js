const UserService = require('../services/userService');

class UserController {
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: '使用者未找到' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: '使用者未找到' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: '使用者未找到' });
      }
      res.json({ message: '使用者已刪除' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController(); 