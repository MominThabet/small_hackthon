const { User } = require("../../Model");
const bcrypt = require("bcrypt");
const { create_Tokens_with_cookie } = require("../../../utils/jwt");

module.exports.login = async (data) => {
  const { email, password } = data;
  try {
    if (!email || !password) {
      return {
        code: 2,
        message: "user.please_provide_email_and_password!",
        data: null,
      };
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return {
        code: 2,
        message: "user.incorrectEmail_OR_Password",
        data: null,
      };
    }

    let token = create_Tokens_with_cookie({
      id: user._id,
      name: user.name
    });

    return {
      code: 0,
      message: "commonSuccess.message",
      data: { token, user },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.signUp = async (data) => {
  const { name, email, password } = data;
  try {
    const isUsedEmail = await User.findOne({ email });
    if (isUsedEmail) {
      return { code: 2, message: "user.usedEmail", data: null };
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    let token = create_Tokens_with_cookie({
      id: user._id,
      name: user.name
    });

    return { code: 0, message: "commonSuccess.message", data: { token, user } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

