import bcrypt

export const generatedPasswordHash = async () => {
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

}