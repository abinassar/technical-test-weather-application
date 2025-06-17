
export interface User {
  id: number;
  tasks: string;
  countries: string;
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  authorities: Authority[];
  lastLogin: string;
  registrationDate: string;
}

interface Authority {
  authority: string;
}

export interface BodyUser {
  name: string;
  email: string;
  role: string;
  password: string;
  tasks: string;
  countries: string;
}

export interface PendingTask {
  taskName: string;
  completed: boolean;
}

export interface UserSession {
  id: number;
  name: string;
  username: string;
  email: string;
  lastLogin: string;
  registrationDate: string;
}