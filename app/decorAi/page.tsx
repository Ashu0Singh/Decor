"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { hero } from "../../data";
// import axios from "axios";

import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { ConfigProvider, Upload } from "antd";
import axios from "axios";
import theme from "@/theme/*";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingState from "@/components/LoadingState";
import { revalidatePath } from "next/cache";

const { Dragger } = Upload;

const Hero: React.FC = () => {
	const { title, subtitle } = hero;
	const [style, setStyle] = useState("");
	const [imageURL, setImageURl] = useState();

	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	const { data, status } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace("/profile/login");
			return;
		}
		if (status === "loading") setIsLoading(true);
		if (status === "authenticated") setIsLoading(false);
	}, [status]);

	const handleUpload = async (options: any) => {
		const { onSuccess, onError, file, onProgress } = options;
		const formData = new FormData();
		formData.append("file", file);

		const config = {
			headers: { "content-type": "multipart/form-data" },
			onUploadProgress: (event: any) => {
				const percent = Math.floor((event.loaded / event.total) * 100);
				onProgress({ percent: (event.loaded / event.total) * 100 });
			},
		};

		try {
			const response = await axios.post(
				"http://localhost:3000/api/s3-upload",
				formData,
				config
			);
			setImageURl(response.data.url);
			onSuccess("Ok");
		} catch (error) {
			onError({ error });
		}
	};

	const props: UploadProps = {
		name: "file",
		multiple: false,
		maxCount: 1,
		accept: ".jpeg,.jpg,.png",
		customRequest: handleUpload,
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (imageURL) {
			setIsLoading(true);
			try {
				const getImage = await axios.post(
					`${
						process.env.NEXT_PUBLIC_HOST_URL ||
						"http://localhost:3000"
					}/api/getSuggestions`,
					{
						imageURL: imageURL,
						style: style,
						email: data?.user?.email,
					}
				);
				// await revalidatePath(`/generated/${getImage.data}`);
				router.push(`/generated/${getImage.data}`);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				toast.error(
					"Please try using a image or smaller size and valid prompts"
				);
			}
		} else {
			toast.error("Upload the image");
		}
	};
	return (
		<section className={`hero-section`}>
			<LoadingState text="Loading" isLoading={isLoading} />
			<div
				className={`flex flex-col items-center gap-[1rem] mx-auto text-center
                    px-5
                    py-10
                    sm:p-10
                    lg:py-25`}>
				<h1 className="text-[2rem] leading-9 tracking-tight mx-auto font-semibold mt-[1rem] mb[30px] sm:text-[2.5rem] lg:text-[3rem] lg:max-w-[800px] sm:leading-[3rem]">
					{title}
				</h1>
				<h2 className="mb-[30px] tracking-wider drop-shadow-2xl max-w-[627px] mx-auto lg:bg-[65px] lg:text-xl text-gray-500">
					{subtitle}
				</h2>

				<div className="file-upload">
					<ConfigProvider theme={theme}>
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<InboxOutlined style={{ color: "#7b2cbf" }} />
							</p>
							<p className="text-center text-xl font-semibold mx-5 text-white">
								Double click or drag file to this area to upload
							</p>
							<p className="text-center text-sm mx-5 text-gray-500">
								Support for a single or bulk upload. Strictly
								prohibited from uploading company data or other
								banned files.
							</p>
						</Dragger>
					</ConfigProvider>
				</div>
				<form className={`input-container p-1`} onSubmit={handleSubmit}>
					<input
						className="form-input"
						type="text"
						placeholder="Enter Style"
						value={style}
						onChange={(e) => {
							setStyle(e.target.value);
						}}
					/>
					<button
						type="submit"
						className="bg-[#7b2cbf] font-inherit tracking-wider flex justify-center text-white max-w-[12rem] hover:bg-gray-500 px-6 py-2 text-sm font-semibold rounded-md transition">
						Submit
					</button>
				</form>
			</div>
			{/* {imageURL && <div className="w-full max-w-[500px] h-full overflow-hidden border-2 border-slate-600 rounded-md">
                <img src={imageURL} alt="Uploaded data"/>
            </div>} */}
		</section>
	);
};

export default Hero;
