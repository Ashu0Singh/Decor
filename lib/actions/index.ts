import { connectToDb } from "@/utils/mongoose";
import axios from "axios";
import Users from "../models/User";
import { NextResponse } from "next/server";

type FormData = {
	imageURL: string;
	style: string;
	email: string | undefined;
};

export const getSuggestions = async ({ imageURL, style, email }: FormData) => {
	console.log(imageURL);
	console.log(style);

	connectToDb();
	try {
		// await axios.post("http:localhost:5000/index", {
		// 	image: imageURL,
		// 	style: style,
		// });

		const data = {
			inputImage:
				"https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/4eb87522-83b1-11ee-a26c-02420a0001fe/gooey.ai%20-%20To%20transform%20the%20room%20into%20a%20Stone%20Ag...yle%20creating%20a%20unique%20and%20intriguing%20atmosphere..png",
			inputStyle: "Old money vintage",
			outputImage:
				"To transform the room into a Stone Age style, we will make some changes to the home decor items and their positions while keeping the overall structure intact. \n\n1. Change the chair into a wooden stool, reflecting the simplicity of Stone Age furniture.\n2. Shift the couch to the right side of the room, replacing it with a large animal hide rug, reminiscent of Stone Age seating.\n3. Replace the elegant vase with a handmade clay pot, adding a rustic touch.\n4. Move the tall potted plant to the left of the room, replacing it with a stone statue or a replica of a primitive tool.\n5. Place a stack of large stones or rocks below the first potted plant, symbolizing the Stone Age connection.\n6. Introduce a small cave painting or a tribal artifact in place of the small potted plant at the back.\n7. Keep the additional potted plant but replace it with a terracotta pot for a more earthy feel.\n8. Arrange two stone tablets with carvings on them at the bottom right corner, representing ancient writings or symbols.\n\nWith these changes, the room will maintain its structure while embracing the Stone Age style, creating a unique and intriguing atmosphere.",
			outputSuggestions:
				"https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/4eb87522-83b1-11ee-a26c-02420a0001fe/gooey.ai%20-%20To%20transform%20the%20room%20into%20a%20Stone%20Ag...yle%20creating%20a%20unique%20and%20intriguing%20atmosphere..png",
		};

		const user = await Users.findOne({ email: email });
		user.generatedSuggestions.push(data);
        user.save();
        
	} catch (error: any) {
		console.log(error.message);
	}
	// Image Url , Suggestion
	// {
	//     "changes": "To transform the room into a Stone Age style, we will make some changes to the home decor items and their positions while keeping the overall structure intact. \n\n1. Change the chair into a wooden stool, reflecting the simplicity of Stone Age furniture.\n2. Shift the couch to the right side of the room, replacing it with a large animal hide rug, reminiscent of Stone Age seating.\n3. Replace the elegant vase with a handmade clay pot, adding a rustic touch.\n4. Move the tall potted plant to the left of the room, replacing it with a stone statue or a replica of a primitive tool.\n5. Place a stack of large stones or rocks below the first potted plant, symbolizing the Stone Age connection.\n6. Introduce a small cave painting or a tribal artifact in place of the small potted plant at the back.\n7. Keep the additional potted plant but replace it with a terracotta pot for a more earthy feel.\n8. Arrange two stone tablets with carvings on them at the bottom right corner, representing ancient writings or symbols.\n\nWith these changes, the room will maintain its structure while embracing the Stone Age style, creating a unique and intriguing atmosphere.",
	//     "new_img": "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/4eb87522-83b1-11ee-a26c-02420a0001fe/gooey.ai%20-%20To%20transform%20the%20room%20into%20a%20Stone%20Ag...yle%20creating%20a%20unique%20and%20intriguing%20atmosphere..png"
	//   }
};
