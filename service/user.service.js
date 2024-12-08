const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const registerUserDto = require("../dto/user/register-user.dto");
const UserRepository = require("../repository/user.repository");

class UserService {
  userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(payload) {
    try {
      const { email, first_name, last_name, password } = payload;
      await registerUserDto.validate({
        email,
        first_name,
        last_name,
        password,
      });
      const hashedPassword = await bcrypt.hash(password, 12);
      const id = v4();
      return this.userRepository.create(
        id,
        email,
        first_name,
        last_name,
        hashedPassword
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
