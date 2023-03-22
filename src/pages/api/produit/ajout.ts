// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Verif from "../../../components/server/auth/verif";
import ProduitQuery from "../../../components/server/produit/ProduitQuery";
import Produit from "../../../components/server/ERP/Produits/Produits";

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

  const produit = new Produit();
  produit.idProduit = 0
  produit.CodeProduit = body.CodeProduit
  produit.Libelle = body.Libelle
  produit.Prix = body.Prix

  const produitQuery = new ProduitQuery();
  const resultProduit = await produitQuery.addProduit(produit);

  if (!!resultProduit.error) {
    return res
      .status(resultProduit.code)
      .json(<any>{ error: resultProduit.error });
  }

  if (!resultProduit) {
    return res.status(500).json(<any>{ error: "error" });
  }

  return res.status(200).json(<any>{ result: "ok" });
}
