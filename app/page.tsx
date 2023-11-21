"use client"
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
	const router = useRouter();

	return (
        <section className={`hero-section h-full flex gap-5`}>
			<h1 className="text-[2rem] lg:text-[3rem] font-semibold tracking-tight max-w-[700px] text-center leading-[2.2rem] lg:leading-[3.2rem]">Transform Your Space with AI-Powered Design</h1>
			<p className="text-md lg:text-lg tracking-wide text-center max-w-[650px] text-gray-600">Experience Personalized Interior Design Suggestions Based on Your Style Preferences, Room Layout, and Architectural Elements, Delivered by Cutting-Edge AI Technology</p>
			<div className="flex gap-6">
				<button className="bg-[#7b2cbf] text-sm lg:text-md px-6 py-3 rounded-md hover:bg-[#7b2cbf]/50 tracking-wider" onClick={() => router.push("/decorAi")}>Get Started</button>
				<button className="bg-[#7b2cbf] text-sm lg:text-md px-6 py-3 rounded-md hover:bg-[#7b2cbf]/50 tracking-wider" onClick={() => router.push("/features")}>Learn More</button>
			</div>
		</section>
	);
};

export default Home;
