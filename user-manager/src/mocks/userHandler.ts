
import { graphql, HttpResponse } from 'msw';
import { EUserRoles, EUserStatus, User } from '../entities/user';

let users: User[] = [
  { id: 1, name: 'John Doe', email: 'qGd0U@example.com', role: EUserRoles.User, status: EUserStatus.ACTIVE, createdDate: new Date() },
  { id: 2, name: 'Jane Adam', email: 'jane@doe', role: EUserRoles.Admin, status: EUserStatus.Pending, createdDate: new Date() },
  { id: 3, name: 'Bob Joseph', email: 'bob@doe', role: EUserRoles.Moderator, status: EUserStatus.BANNED, createdDate: new Date() },
];
let newId = 4;
export const handlers = [
  graphql.query('GetUsers', () => {
    return HttpResponse.json({data: {users: users}});
  }),

  graphql.mutation('AddUser', ({variables}) => {
    
      const newUser = { id: newId++, status: EUserStatus.Pending, createdDate: new Date(), ...variables } as User;
      users.push(newUser);
      return HttpResponse.json({data:{addUser: newUser}});
  }),

  graphql.mutation(
    'UpdateUser',
    ({variables}) => {
      users = users.map(u =>
        u.id === variables.id ? { ...u, ...variables } : u
      );
      return HttpResponse.json({data:{ updateUser: users.find(u => u.id == variables.id) }});
    }
  ),

  graphql.mutation(
    'DeleteUser',
    ({variables}) => {
      users = users.filter(u => u.id !== variables.id);
      return HttpResponse.json({data:{ deleteUser: true }});
    }
  ),
];