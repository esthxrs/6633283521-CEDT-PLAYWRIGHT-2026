interface ValidUser {
  username: string;
  password: string;
}

declare module '@test-data/users/valid-user.json' {
  const value: ValidUser[];
  export default value;
}

