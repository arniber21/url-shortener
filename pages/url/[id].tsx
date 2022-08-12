import {NextPage} from "next";
import { PrismaClient } from "@prisma/client";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";


const Home: NextPage = () => {
	const router = useRouter();
	let id: number = Number.parseInt(router.query.id as string);
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const doStuff = async () => {
			const data = { id }
			setLoading(true);
			await fetch('/api/getUrl', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(res => res.json()).then((res) => {
				console.log(res);
				setUrl(res.url)
				setLoading(false);
			});
		}
		doStuff().then();
	}, [id,  setUrl]);

	return (
		<div className='container'>
			<h1 className='text-center p-3'>URL Shortener</h1>
			<div className="center-item">
				{ loading &&
                    <div>
                        Loading...
                    </div>}
				{!loading &&
                    <div>
                        <a href={url} className={'btn btn-primary'}>Go to URL</a>
                    </div>
				}
			</div>
		</div>
	)
}

export default Home;