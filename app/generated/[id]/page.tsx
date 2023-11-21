"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
	params: { id: string | undefined };
};

const GeneratedSuggestion = ({ params: { id } }: Props) => {
	const [imageData, setImageData] = useState([
		{
			inputImage:
				"",
			inputStyle: "",
			outputImage:
				"",
			_id: "",
			outputSuggestions:""
		},
	]);

	const [isInputImage, setIsInputImage] = useState(false);

	function textToArray(text: string) {
		return text.split("\n").filter((str) => str != "");
	}

	const suggestions = textToArray(imageData?.[0].outputSuggestions);

	const { data, status } = useSession();
	const router = useRouter();

	const getImageData = async () => {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"}/api/getImageData`,
			{
				email: data?.user?.email,
				imageId: id,
			}
		);
		console.log(response?.data);
		setImageData(response?.data);
	};

	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace("/profile/login");
			return;
		} else if (status === "authenticated") {
			getImageData();
		}
	}, [status]);

	return (
		<div className="container mx-auto pt-[10vh] h-max lg:h-full flex flex-col">
			<h1 className="text-[2rem] py-3 lg:py-5 text-slate-100 tracking-tight font-semibold lg:mt-[1rem] mb[1.5rem] sm:text-[2.5rem]">Generated
			<span className="text-[#7b2cbf]"> Suggestion</span></h1>
			<div className="text-white lg:pt-10 flex justify-center items-center gap-4 lg:gap-10 flex-wrap">
				<div
					className="max-w-[500px] rounded-md overflow-clip max-h-[500px]"
					onClick={() => setIsInputImage((prev) => !prev)}>
					{isInputImage ? (
						<img
							src={imageData?.[0].inputImage}
							alt="Input Data"
							className="w-full"
						/>
					) : (
						<img
							src={imageData?.[0].outputImage}
							alt="Output Data"
							className="w-full"
						/>
					)}
				</div>
				<div className="max-w-[500px] h-full lg:max-h-[400px] overflow-scroll flex flex-col gap-2">
					{suggestions.map((suggestion) => (
						<div key={suggestion} className="bg-[#7b2cbf]/20 px-3 py-4 rounded-md tracking-wider drop-shadow-2xl lg:text-md text-gray-300">{suggestion}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GeneratedSuggestion;
