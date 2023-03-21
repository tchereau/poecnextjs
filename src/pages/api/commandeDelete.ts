// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Verif from "../../components/server/auth/verif";
import CommandeQuery from "../../components/server/Commande/CommandeQuery";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('ici')
  if (req.method !== "DELETE") {
    return res.status(400).json(<any>{ error: "Bad request" });
  }
  let token;
  try {
    const header = req.headers;
    token = header.authorization;
    //console.log(req.headers);
  } catch (error) {
    return res.status(500).json(<any>{ error: "Oups, something went wrong" });
  }
  const verif = new Verif();
  const result = await verif.verifyToken(token);

  if (!!result.error) {
    return res.status(result.code).json(<any>{ error: result.error });
  }

  if (!result) {
    return res.status(401).json(<any>{ error: "Wrong token" });
  }
  switch (<any>result?.code) {
    case 401:
      return res.status(401).json(<any>{ error: result.error });
    case 500:
      return res.status(401).json(<any>{ error: result.error });
  }

  let body;
  try {
    body = req.body;
  } catch (error) {
    return res.status(500).json(<any>{ error: "Oups, something went wrong" });
  }
  let idCommande;
  try {
    idCommande = body.idCommande;
  } catch (error) {
    
  }
  const commandeQuery = new CommandeQuery();
  try {
    await commandeQuery.deleteCommande(idCommande);
  }catch(error){
    return res.status(500).json(<any>{ error: "Oups, something went wrong" });
  }

  return res.status(200).json(<any>{ result: "ok" });
}
