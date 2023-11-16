import { navigation } from "../data";
const NavMobile = () => {
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
			</ul>
		</div>
	);
};

export default NavMobile;
