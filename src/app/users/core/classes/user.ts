export class User {
  userName: string;
  password: string;
  teamName: string;
}

export class AuthUser {
  id: number;
  created: Date;
  userName: string;
  password: string;
  teamName: string;
  roles: string[];
}
