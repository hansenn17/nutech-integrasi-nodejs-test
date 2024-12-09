const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRepository = require("../repository/user.repository");
const loginDto = require("../dto/user/login.dto");

require("dotenv").config();

class AuthService {
  userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(payload) {
    try {
      await loginDto.validate(payload);
      const { email, password } = payload;

      const user = await this.userRepository.findByEmail(email);
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const token = this.generateToken(email);
        return token;
      }

      throw new Error("Username atau password salah");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  generateToken(email) {
    return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "12h",
    });
  }
}

module.exports = AuthService;
