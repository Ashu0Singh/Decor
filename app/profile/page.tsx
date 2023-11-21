"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ConfigProvider, Spin } from "antd";
import theme from "@/theme/*";
import { signOut } from "next-auth/react";
import ProductCard from "@/components/ProductCard";
import LoadingState from "@/components/LoadingState";

const Profile = () => {
	const { data, status } = useSession();
	const [userData, setUserData] = useState({
		fullname: "",
		generatedSuggestions: [],
	});
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	const getUserData = async () => {
		const response = await axios.post(
			`${
				process.env.NEXT_PUBLIC_API || "http://localhost:3000"
			}/api/getUserData`,
			{
				email: data?.user?.email,
			}
		);
		console.log(response?.data);
		setUserData(response?.data);
	};
	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace("/profile/login");
			return;
		} else if (status === "authenticated") {
			getUserData();
			setIsLoading(false);
		}
		else setIsLoading(true);
	}, [status]);

	return (
		<div className="pt-[10vh] container mx-auto flex justify-center items-center border-red h-full text-gray-200">
			{userData.fullname != "" ? (
				<RenderUserData
					email={data?.user?.email}
					fullname={userData?.fullname}
					suggestions={userData?.generatedSuggestions}
				/>
			) : (
				<LoadingState text="Loading" isLoading={isLoading}/>
			)}
		</div>
	);
};

const RenderUserData = (props: any) => {
	console.log(props);
	return (
		<div className="h-full w-full flex flex-col gap-1 p-3 sm:p-10">
			<div>
				<h1 className="text-[1.5rem] font-semibold mt-[1rem] sm:text-[2rem] lg:text-[2.5rem] text-gray-300">
					{`Hey 👋, `}
					<span className="text-[#7b2cbf]">{props.fullname}</span>
				</h1>
				<h2 className="mb-[30px] text-sm tracking-wider font-medium drop-shadow-2xl max-w-[400px] lg:bg-[65px] lg:text-lg text-gray-500">
					{`Here's the history of all the suggestions you have gotten yet.`}
				</h2>
			</div>
			<div className="flex flex-row w-fit justify-evenly flex-wrap gap-8">
				{
					props.suggestions?.map((suggestion: any) => { console.log(suggestion);  return <ProductCard key={suggestion.inputImage} suggestion={suggestion} /> })
				}
			</div>
		</div>
	);
};

export default Profile;
