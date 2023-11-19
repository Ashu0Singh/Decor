import Users from "@/lib/models/User";
import { connectToDb } from "@/utils/mongoose";
import { NextRequest, NextResponse } from "next/server";

type UserData =
	| {
			fullname: String;
			getSuggestions: Array<{
				inputImage: String;
				inputStyle: String;
				outputImage: String;
				outputSuggestions: String;
			}>;
	  }
	| undefined;

export async function POST(req: NextRequest) {
	const { email } = await req.json();
	connectToDb();
	try {
		const userData = await Users.findOne(
			{ email: email },
			{ generatedSuggestions: 1, fullname: 1 }
		);
		return NextResponse.json(userData);
	} catch (error: any) {
		console.log(`Unable to fetch userdata : ${error.message}`);
	}
}
