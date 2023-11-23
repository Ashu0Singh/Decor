import Link from "next/link";

const Home: React.FC = () => {
	return (
		<section className={`hero-section h-full flex gap-5`}>
			<h1 className="text-[2rem] lg:text-[3rem] font-semibold tracking-tight max-w-[700px] text-center leading-[2.2rem] lg:leading-[3.2rem]">
				Transform Your Space with AI-Powered Design
			</h1>
			<p className="text-md lg:text-lg tracking-wide text-center max-w-[650px] text-gray-600">
				Experience Personalized Interior Design Suggestions Based on
				Your Style Preferences, Room Layout, and Architectural Elements,
				Delivered by Cutting-Edge AI Technology
			</p>
			<div className="flex gap-6">
				<Link href={"/decorAi"}>
					<button className="bg-[#7b2cbf] text-sm lg:text-md px-6 py-3 rounded-md hover:bg-[#7b2cbf]/50 tracking-wider">
						Get Started
					</button>
				</Link>
				<Link href={"/profile"}>
					<button className="outline outline-[#7b2cbf] text-sm lg:text-md px-6 py-3 rounded-md hover:bg-[#7b2cbf]/50 tracking-wider">
						Profile
					</button>
				</Link>
			</div>
		</section>
	);
};

export default Home;
