import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      role: Yup.string(),
    });

    const isValidSchema = await schema.isValid(req.body);
    if (!isValidSchema) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const userCreated = await User.create(req.body);
    const { id, name, email } = userCreated;

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      role: Yup.string(),
      oldPassword: Yup.string().min(9),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    const isValidSchema = await schema.isValid(req.body);
    if (!isValidSchema) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter.' });
    }

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(400).json({ error: 'User not found.' });
    }

    await userToUpdate.updateOne(req.body);
    return res.json();
  }

  async getById(req, res) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Missing ID parameter.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    return res.json(user);
  }

  async getAllUsers(req, res) {
    const users = await User.find();
    return res.json(users);
  }

  async delete(req, res) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Missing ID parameter.' });
    }

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(400).json({ error: 'User not found.' });
    }

    userToDelete.active = false;
    await userToDelete.save();

    return res.json();
  }
}

export default new UserController();
