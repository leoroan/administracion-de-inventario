import { EntitySchema } from 'typeorm';

const UserEntity = new EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
});

export default UserEntity;
