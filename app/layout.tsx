import { Toaster } from "react-hot-toast";
import "./globals.css";
import NavBar from "@/components/NavBar";
export const metadata = {
	title: "Home Decor AI",
	description:
		"Home Decor AI helps you style you style your living space according to your will.",
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="no-scrollbar">
            <body>
                <Toaster />
				<main className="max-w-10xl h-[100vh] px-2 mx-auto">
					<NavBar />
					{children}
				</main>
			</body>
		</html>
	);
}
