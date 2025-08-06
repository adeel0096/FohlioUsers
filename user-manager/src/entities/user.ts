export type User = {
  id: number;
  name: string;
  email: string;
  role: EUserRoles;
  status: EUserStatus
  createdDate: Date; 
}
export enum EUserStatus {
  ACTIVE = "active",
  BANNED = "banned",
  Pending = "pending",
}

export enum EUserRoles {
  Admin = "admin",
  User = "user",
  Moderator = "moderator",
}