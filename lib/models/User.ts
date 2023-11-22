import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		fullname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		refreshtoken: { type: String },
		generatedSuggestions: [
			{
				inputImage: String,
				inputStyle: String,
				outputImage: String,
				outputSuggestions: String,
			},
		],
	},
	{ timestamps: true }
);

const Users =
	mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
