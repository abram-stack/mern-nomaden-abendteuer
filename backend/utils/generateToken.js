import jwt from 'jsonwebtoken'

export const generateToken = (id) => {
  //the function takes param({desired of field name})
  const token = jwt.sign({ id}, process.env.JSON_SECRET, {expiresIn: '30d'});
  return token;
}