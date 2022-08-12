import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

type Data = {
	url: string;
}

const prisma = new PrismaClient();

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
	if(req.method === "POST") {
		const { id } = req.body;
		const dbObj = await prisma.url.findFirst({ where: { id } });

		if(dbObj === null) {
			return res.status(500);
		}
		const url = dbObj.link;
		res.status(200).json({ url });
	}
}