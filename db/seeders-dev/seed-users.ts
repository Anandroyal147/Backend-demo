import mongoose from 'mongoose';
import { userSchema } from '../../src/users/user.entity';
import { genSalt, hash } from 'bcrypt';

mongoose.connect('mongodb://localhost:27017/sciflare_demo', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const seedUsers = async () => {
  const usersData = [
    {
      userName: 'user1',
      email: 'user1@example.com',
      password: 'password1',
      role: 'Admin',
    },
    {
      userName: 'user2',
      email: 'user2@example.com',
      password: 'password2',
      role: 'User',
    },
    {
      userName: 'user3',
      email: 'user3@example.com',
      password: 'password3',
      role: 'User',
    },
  ];

  const UserModel = mongoose.model('User', userSchema);
  const salt = await genSalt(10);
  const transformedUsers = await Promise.all(
    usersData.map(async (user: any) => {
      user.password = await hash(user.password, salt);
      return user;
    }),
  );
  console.log(transformedUsers);
  await UserModel.insertMany(transformedUsers);

  console.log('Users seeded successfully');
  mongoose.connection.close();
};

seedUsers();
