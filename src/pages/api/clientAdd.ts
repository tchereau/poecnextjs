// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Verif from "../../components/server/auth/verif";
import ClientQuery from "../../components/server/client/ClientQuery";
import Client from "../../components/server/ERP/Client/Clients";

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
    !body.Siret ||
    !body.NomSociete ||
    !body.Dirigeant ||
    !body.NumVoie ||
    !body.Voie ||
    !body.CodePostal ||
    !body.Ville ||
    !body.Telephone
  ) {
    return res.status(400).json(<any>{ error: "Missing data" });
  }

  const client = new Client();
  client.id = 0;
  client.Siret = body.Siret;
  client.NomSociete = body.NomSociete;
  client.Dirigeant = body.Dirigeant;
  client.NumVoie = body.NumVoie;
  client.NomVoie = body.Voie;
  client.CodePostal = body.CodePostal;
  client.Ville = body.Ville;
  client.Telephone = body.Telephone;

  const clientQuery = new ClientQuery();
  const resultClient = await clientQuery.addClient(client);

  if (!!resultClient.error) {
    return res
      .status(resultClient.code)
      .json(<any>{ error: resultClient.error });
  }

  if (!resultClient) {
    return res.status(500).json(<any>{ error: "error" });
  }

  return res.status(200).json(<any>{ result: "ok" });
}
