import { User } from '../../../models/user/user.js';
import { checkResolver } from '../../checkResolver.js';
import { Role } from '../../role.js';
const ACCESS = [Role.Admin, Role.Teacher];
/* Fn */
const resolver = async () => {
    return await User.getStudentUsers();
};
export const getStudentsUsersResolver = async (...args) => await checkResolver(...args)(ACCESS)(resolver);
