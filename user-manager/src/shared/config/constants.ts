import { EUserRoles, EUserStatus } from "../../entities/user";

export const USER_ROLE_OPTIONS = [
  {label: 'Admin', value: EUserRoles.Admin},
  {label: 'Moderator', value: EUserRoles.Moderator},
  {label: 'User', value: EUserRoles.User},
];

export const USER_STATUS_OPTIONS = [
  {label: 'Active', value: EUserStatus.ACTIVE},
  {label: 'Banned', value: EUserStatus.BANNED},
  {label: 'Pending', value: EUserStatus.Pending},
]