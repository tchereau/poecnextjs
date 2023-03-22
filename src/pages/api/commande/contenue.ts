// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Verif from "../../../components/server/auth/verif";
import ContenueQuery from "../../../components/server/Commande/ContenueQuery";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
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

  let id = false;

  try {
    id = req.body.id;
  } catch (error) {
    return res.status(500).json(<any>{ error: "Oups, something went wrong" });
  }

  let contenue;
  switch(id){
    case false:
      const commandeQuery = new ContenueQuery();
      contenue = await commandeQuery.getAllContenuCommandes();
      break;
    default:
      const contenuQuery = new ContenueQuery();
      contenue = await contenuQuery.getContenueById(id);
      break;

  }

  // get all clients


  if (contenue) {
    return res.status(200).json(<any>{ contenue: contenue });
  } else {
    return res.status(500).json(<any>{ error: "Oups, something went wrong" });
  }
}
