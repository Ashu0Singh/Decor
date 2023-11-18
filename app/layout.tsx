import { Toaster } from "react-hot-toast";
import "./globals.css";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/utils/SessionProvider";
import { getServerSession } from "next-auth";

export const metadata = {
	title: "Home Decor AI",
	description:
		"Home Decor AI helps you style you style your living space according to your will.",
};
export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const serverSession = await getServerSession();
	return (
		<html lang="en" className="no-scrollbar">
			<body>
				<Toaster />
				<AuthProvider session={serverSession}>
					<main className="max-w-10xl h-[100vh] px-2 mx-auto">
						<NavBar />
						{children}
					</main>
				</AuthProvider>
			</body>
		</html>
	);
}
