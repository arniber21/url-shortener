import {NextPage} from "next";
import { PrismaClient } from "@prisma/client";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";


const Home: NextPage = () => {
	const router = useRouter();
	let id: number = Number.parseInt(router.query.id as string);
	const [url, setUrl] = useState("");

	useEffect(() => {
		const doStuff = async () => {
			const data = { id }
			console.log('doing stuff');
			await fetch('/api/getUrl', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(res => res.json()).then((res) => {
				console.log(res);
				setUrl(res.url)
			});
		}
		doStuff().then();
	}, [id,  setUrl]);

	return (
		<div className='container'>
			<a href={url} className={'btn btn-primary'}>Go to URL</a>
		</div>
	)
}

export default Home;