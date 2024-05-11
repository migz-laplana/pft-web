export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}