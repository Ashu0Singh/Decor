import {
	IoIosCheckmarkCircle,
	IoLogoFacebook,
	IoLogoGithub,
	IoLogoInstagram,
	IoLogoYoutube,
} from "react-icons/io";
import Features1Img from "./assets/img/features-1.png";
import Features2Img from "./assets/img/features-2.png";

type Features = {
	image: any;
	title: string;
	subtitle: string;
	buttonText: string;
	items: Array<{ icon: any; title: string; subtitle: string }>;
	feature2: { image: any; title: string; subtitle: string };
};

export const navigation = [
	{
		name: "home",
		href: "",
	},
	{
		name: "about",
		href: "",
	},
	{
		name: "features",
		href: "",
	},
	{
		name: "contact",
		href: "",
	},
];

export const hero = {
	title: " Your Home's AI Design Companion – Capture, Upload, Transform!",
	subtitle:
		"Revolutionizing Interior Design: Seamlessly Transcend Your Space with AI-Driven Suggestions and Visualizations",
	buttonText: "Upload",
};

export const features: Features = {
	image: Features1Img,
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
		image: Features2Img,
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
