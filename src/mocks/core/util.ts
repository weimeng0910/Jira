import jwt from 'jsonwebtoken';

import { SECRET_KEY, expiresIn } from './config';

export const generteToken = (uid: string, scope: number) => {
  const token = jwt.sign(
    {
      uid,
      scope
    },
    SECRET_KEY,
    //设置过期时间
    { expiresIn }
  );
  return token;
};
