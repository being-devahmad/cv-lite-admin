export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin"
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
  }
  
  
