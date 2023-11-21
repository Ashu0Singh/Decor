import Users from "@/lib/models/User";
import { connectToDb } from "@/utils/mongoose";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { imageURL, style, email } = await req.json();

	connectToDb();
	try {
		const res = await axios.post(`http://34.100.254.160/getSuggestions`, {
			imageURL: imageURL,
			style: style,
		});
		const data = {
			inputImage: imageURL,
			inputStyle: style,
			outputSuggestions: res?.data?.changes,
			outputImage: res?.data?.new_img,
		};

		const user = await Users.findOne({ email: email });
		const generation = user.generatedSuggestions?.push(data);
		const id = user.generatedSuggestions?.[generation - 1]?._id;
		user.save();
		console.log(id);
		return new NextResponse(id, { status: 200 });
	} catch (error: any) {
		console.log(error.message);
		return new NextResponse(error, { status: 500 });
	}
}
