import bcrypt from "bcrypt";
export const hashPassword = async (password: string) => {
  const saltRounds: number = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const ComparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
