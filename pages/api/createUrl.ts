import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient, Url} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Url>) {
	if(req.method==="POST") {
		const link: string = req.body.link;
		const created = await prisma.url.create({ data: { link } });
		return res.status(200).json(created);
	}
}