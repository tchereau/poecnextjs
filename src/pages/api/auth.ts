// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Auth from '../../components/server/auth/auth'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let body;
  try {
    body = req.body;
  } catch (error) {
    return res.status(500).json(<any>{error: "Oups, something went wrong"})
  }
  if(req.method !== "POST"){
    return res.status(400).json(<any>{error: "Bad request"})
  }
  const auth = new Auth();
  if(!body.username || !body.password){
    return res.status(400).json(<any>{error: "Missing username or password"})
  }

  const result = await auth.Login(body.username, body.password);
  if(!result){
    return res.status(401).json(<any>{error: "Wrong username or password"})
  }
  return res.status(200).json(<any>{result: result})
}
