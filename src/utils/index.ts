import { hash as _hash, genSalt, compare as _compare } from 'bcrypt';

export const hash = async (text: string) => {
  return _hash(text, await genSalt(10));
};

export const compare = async (data: string, hashed: string) => {
  return _compare(data, hashed);
};
