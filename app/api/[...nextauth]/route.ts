import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/lib/models/User";
import { connectToDb } from "@/utils/mongoose";
import bcrypt from "bcrypt";

export const authOptions: any = {
	provider: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", tpye: "password" },
			},
			async authorize(credentials: any) {
				await connectToDb();
				try {
					const user = await Users.findOne({
						email: credentials.email,
					});
					const isPasswordCorrect = await bcrypt.compare(
						credentials.password,
						user.password
					);
					if (isPasswordCorrect) return user;
				} catch (error: any) {
					console.log(error.message);
				}
			},
		}),
	],
};
