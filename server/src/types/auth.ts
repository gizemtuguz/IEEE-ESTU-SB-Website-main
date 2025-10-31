export interface AuthenticatedUser {
  id: string;
  email: string;
  role: "super" | "editor";
}
