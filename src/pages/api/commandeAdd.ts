// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Verif from "../../components/server/auth/verif";
import CommandeQuery from "../../components/server/Commande/CommandeQuery";
import Commande from "../../components/server/ERP/Commande/Commandes";

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

  let body;
  try {
    body = req.body;
  } catch (error) {
    return res.status(500).json(<any>{ error: "Oups, something went wrong" });
  }
  console.log(body)
  if (
    !body.NumeroCommandes ||
    !body.Client ||
    !body.Date
  ) {
    return res.status(400).json(<any>{ error: "Missing data" });
  }

  const commande = new Commande();
  commande.idCommande = 0;
  commande.NumeroCommandes = body.NumeroCommandes;
  commande.Client = body.Client;
  commande.Date = body.Date;

  const commandeQuery = new CommandeQuery();
  const resultCommande = await commandeQuery.addCommande(commande);

  if (!!resultCommande.error) {
    return res
      .status(resultCommande.code)
      .json(<any>{ error: resultCommande.error });
  }

  if (!resultCommande) {
    return res.status(500).json(<any>{ error: "error" });
  }

  return res.status(200).json(<any>{ result: "ok" });
}
