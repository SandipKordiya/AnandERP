export interface User {
  id: number;
  username: string;
  token: string;
  firstName: string;
  lastName: string;
  type: string;
  created: Date;
  lastActive: Date;
  branchId: number;
  roles: string[];
}
