import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useState} from "react";

const Home: NextPage = () => {
	const [formValue, setFormValue] = useState("");
	const [url, setUrl] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [copied, setCopied] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: any) => {
		setFormValue(e.target.value);
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const data = { link: `https://${formValue}` }
		setLoading(true);
		await fetch('/api/createUrl', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(data => data.json()).then((data => {
			setUrl(data.id);
			setLoaded(true);
			setLoading(false);
		}));

	}

	const handleCopy = () => {
		async function copyTextToClipboard(text: string) {
			if ('clipboard' in navigator) {
				return await navigator.clipboard.writeText(text);
			}
		}

		copyTextToClipboard(`https://url.arnabg.me/url/${url}`)
			.then(() => {
				setCopied(true);
				setTimeout(() => {
					setCopied(false);
				}, 3000)
			})
	}

	return (
		<div className='container text-center p-5'>
			<h1 className='p-3'>URL Shortener</h1>
			<form onSubmit={handleSubmit}>
				<div className="input-group mb-3">
					<span className="input-group-text" id="basic-addon1">https://</span>
					<input className='form-control' type="text" onChange={handleChange} value={formValue} />
					<input type="submit" className='btn btn-primary' />
				</div>
			</form>
			{loading &&
				<div className="m-3">Loading...</div>
			}
			{loaded &&
			<div>Your shortened link:
				<div className="input-group mb-3">
                    <div className="form-control text-left">{`https://url.arnabg.me/url/${url}`}</div>
					<button className='btn btn-primary' onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</button>
				</div>
			</div>}
		</div>
	)
}

export default Home
