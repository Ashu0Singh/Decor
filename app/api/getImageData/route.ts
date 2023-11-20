import Users from "@/lib/models/User";
import { connectToDb } from "@/utils/mongoose";
import { NextRequest, NextResponse } from "next/server";

type UserData =
	| {
			fullname: String;
			generatedSuggestions: Array<{
				_id: string;
				inputImage: String;
				inputStyle: String;
				outputImage: String;
				outputSuggestions: String;
			}>;
	  }
	| undefined
	| null;

export async function POST(req: NextRequest) {
	const { email, imageId } = await req.json();
	connectToDb();
	try {
		const userData: UserData = await Users.findOne(
			{ email: email },
			{ generatedSuggestions: 1 }
		);
		const ImageData = await userData?.generatedSuggestions?.filter(
			(ImageData) => {
				return ImageData._id.valueOf() === imageId;
			}
		);
		return NextResponse.json(ImageData);
	} catch (error: any) {
		console.log(`Unable to fetch userdata : ${error.message}`);
	}
}
