import { signOut, useSession } from "next-auth/react";
import { navigation } from "../data";
import { useEffect, useState } from "react";
const NavMobile = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { data, status } = useSession();

	useEffect(() => {
		if (status === "authenticated") {
			setIsLoggedIn(true);
			return;
		}
	}, [status]);

	return (
		<div
			className={`backdrop-filter backdrop-blur-lg bg-slate-900 bg-opacity-10 w-full h-full text-white`}>
			<ul className="text-center h-full flex flex-col items-center justify-center gap-y-6">
				{navigation.map((item, index) => (
					<li key={index}>
						<a
							className="text-xl underline font-semibold underline-offset-2 capitalize"
							href={item.href}>
							{item.name}
						</a>
					</li>
				))}
				{isLoggedIn && (
					<li>
						<button
							className="bg-transparent border-2 border-gray-600 tracking-wider flex justify-center text-white max-w-[12rem] max-h-[3rem] my-auto hover:bg-gray-500 px-6 py-2 text-sm font-semibold rounded-md transition"
							onClick={() => signOut()}>
							Logout
						</button>
					</li>
				)}
			</ul>
		</div>
	);
};

export default NavMobile;
