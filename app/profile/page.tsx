"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import LoadingState from "@/components/LoadingState";
import Link from "next/link";

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
		setUserData(response?.data);
	};
	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace("/profile/login");
			return;
		} else if (status === "authenticated") {
			getUserData();
			setIsLoading(false);
		} else setIsLoading(true);
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
				<LoadingState text="Loading" isLoading={isLoading} />
			)}
		</div>
	);
};

const RenderUserData = (props: any) => {
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
			<div className="flex flex-row h-full w-fit justify-evenly flex-wrap gap-8">
				{props.suggestions ? (
					props.suggestions?.map((suggestion: any) => {
						return (
							<ProductCard
								key={suggestion.inputImage}
								suggestion={suggestion}
							/>
						);
					})
				) : (
					<div className="w-[85vw] flex flex-col justify-center items-center">
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm tracking-wider font-medium drop-shadow-2xl max-w-[400px] lg:bg-[65px] lg:text-lg text-gray-500">You haven't generated anything yet</p>
							<Link href={"/decorAi"}>
								<button className="bg-[#7b2cbf] text-sm lg:text-md px-6 py-3 rounded-md hover:bg-[#7b2cbf]/50 tracking-wider">
									Get Started
								</button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
