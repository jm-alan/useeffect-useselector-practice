'use strict';
const {
  Model,
  Op,
  ValidationError,
  ValidationErrorItem
} = require('sequelize');
const { hashSync, compareSync } = require('bcryptjs');

module.exports = (sequelize, { DataTypes, fn }) => {
  class User extends Model {
    validatePass (password) {
      return !!password && compareSync(password, this.password);
    }

    get info () {
      const { id, firstName, username, email } = this;
      return { id, firstName, username, email };
    }

    static async LogIn ({ identification, password }) {
      const errors = [];
      if (!identification) errors.push(new ValidationErrorItem('Please provide a username or email'));
      if (!password) errors.push(new ValidationErrorItem('Please provide a password'));
      if (errors.length) throw new ValidationError('Invalid login', errors);
      const potentialUser = await User.findOne({
        where: {
          [Op.or]: [
            { username: identification },
            { email: identification }
          ]
        }
      });
      if (!potentialUser || !potentialUser.validatePass(password)) {
        errors.push(new ValidationErrorItem('Invalid username, email, or password'));
        throw new ValidationError('Invalid login', errors);
      }
      return potentialUser;
    }

    static async SignUp ({ username, email, password }) {
      const errors = [];
      if (await User.findOne({ where: { username } })) errors.push(new ValidationErrorItem('An account already exists with that username'));
      if (await User.findOne({ where: { email } })) errors.push(new ValidationErrorItem('An account already exists with that email'));
      if (errors.length) throw new ValidationError('Could not accept identification', errors);
      const newUser = new User({ username, email, password });
      return (await newUser.save()).info;
    }

    static associate ({ Post }) {
      User.hasMany(Post, { foreignKey: 'userId' });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        not: {
          args: 'email',
          msg: 'Username cannot be an email'
        },
        set (val) {
          if (!val.match(/[a-zA-Z0-9_]{5,30}/)) {
            const errors = [];
            if (val.length < 5) errors.push(new ValidationErrorItem('Username must be at least 5 characters'));
            if (val.length > 30) errors.push(new ValidationErrorItem('Username may not exceed 30 characters'));
            if (val.match(/[^a-zA-Z0-9_]/g)) errors.push('Username may only contain the letters A-Z, the numbers 0-9, or an underscore');
            throw new ValidationError('Invalid username', errors);
          } else this.setDataValue('username', val);
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ['^[a-zA-Z0-9+-_~]{1,64}@(?=.{1,64}\\.)\\w+[a-zA-Z-]\\w+\\.\\w{1,63}$'],
          msg: 'Please provide a valid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      set (val) {
        if (!val.match(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[0-9])(?=\S*[!@#$%^&*()`~-])[a-zA-Z0-9!@#$%^&*()`~-]{8,}$/)) {
          const errors = [];
          if (val.length < 8) errors.push(new ValidationErrorItem('Password must be at least 8 characters.'));
          if (val.match(/\s/g)) errors.push(new ValidationErrorItem('Password must not contain spaces.'));
          if (!val.match(/(?=\S*[A-Z])/)) errors.push(new ValidationErrorItem('Password must contain at least 1 uppercase letter.'));
          if (!val.match(/(?=\S*[a-z])/)) errors.push(new ValidationErrorItem('Password must contain at least 1 lowercase letter.'));
          if (!val.match(/(?=\S*[0-9])/)) errors.push(new ValidationErrorItem('Password must contain at least 1 of these symbols: !@#$%^&*()`~-'));
          if (!val.match(/^[a-zA-Z0-9!@#$%^&*()`~-]+$/)) errors.push(new ValidationErrorItem('Password may only contain letters, numbers, and these symbols: !@#$%^&*()`~-'));
          throw new ValidationError('Invalid password.', errors);
        } else this.setDataValue('password', hashSync(val));
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
