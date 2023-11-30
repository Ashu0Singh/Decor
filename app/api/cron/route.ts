import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
	const { imageURL, style } = {
		imageURL:
			"https://homedecorai.s3.ap-south-1.amazonaws.com/WhatsApp%20Image%202023-11-22%20at%2019.41.42.jpg-1700662760649",
		style: "Modern houes",
	};
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_SERVER_IP}/getSuggestions`,
			{
				imageURL: imageURL,
				style: style,
			}
		);
		return new NextResponse("OK", { status: 200 });
	} catch (error: any) {
		console.log(error.message);
		return new NextResponse(error, { status: 500 });
	}
}
