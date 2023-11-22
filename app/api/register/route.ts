import Users from "@/lib/models/User";
import { connectToDb } from "@/utils/mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
	const { fullname, email, password } = await req.json();

	try {
		await connectToDb();

		const existingUser = await Users.findOne({ email });

		if (existingUser)
			return new NextResponse("Email already in use", { status: 400 });

		const hashedPass = await bcrypt.hash(password, 5);
		const newUser = new Users({
			email: email,
			password: hashedPass,
			fullname: fullname,
		});

		newUser.save();

		return new NextResponse("User is registered", { status: 200 });
	} catch (error: any) {
		console.error(`Unable to register user : ${error.message}`);
		return new NextResponse(`User is registered : ${error.message}`, {
			status: 500,
		});
	}
}
