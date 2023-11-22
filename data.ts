import {
	IoIosCheckmarkCircle,
	IoLogoFacebook,
	IoLogoGithub,
	IoLogoInstagram,
	IoLogoYoutube,
} from "react-icons/io";

type Features = {
	title: string;
	subtitle: string;
	buttonText: string;
	items: Array<{ icon: any; title: string; subtitle: string }>;
	feature2: { title: string; subtitle: string };
};

export const navigation = [
	{
		name: "DecorAi",
		href: "/decorAi",
	},
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Profile",
		href: "/profile",
	},
];

export const hero = {
	title: " Your Home's AI Design Companion – Capture, Upload, Transform!",
	subtitle:
		"Revolutionizing Interior Design: Seamlessly Transcend Your Space with AI-Driven Suggestions and Visualizations",
	buttonText: "Upload",
};

export const features: Features = {
	title: "We make your home more aesthetic",
	subtitle:
		"Our Home Decor AI offers powerful AI-powered Interior Decor Suggestions",
	buttonText: "Show Now",
	items: [
		{
			icon: IoIosCheckmarkCircle,
			title: "State of the Art Suggestion Systems",
			subtitle:
				"Our AI model provides tailored Home decor suggestions according to the styles you desire.",
		},
		{
			icon: IoIosCheckmarkCircle,
			title: "Realistic Image preview",
			subtitle:
				"Preview our interior decor sugggestion with a click of a button.",
		},
	],
	feature2: {
		title: "The Best Interior decorator of your choice",
		subtitle:
			"Our AI Tool Home Decor offers a versatile AI-powered Interior Decor System",
	},
};

export const footer = {
	social: [
		{
			icon: IoLogoYoutube,
			href: "#",
		},
		{
			icon: IoLogoInstagram,
			href: "#",
		},
		{
			icon: IoLogoGithub,
			href: "#",
		},
		{
			icon: IoLogoFacebook,
			href: "#",
		},
	],
	copyright: "HomeDecor 2024-All Rights Reserved.",
};
