import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

interface Config {
	region: string;
	credentials: {
		accessKeyId: string;
		secretAccessKey: string;
	};
}

const s3Client = new S3Client({
	region: process.env.NEXT_PUBLIC_REGION,
	credentials: {
		accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
		secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	},
} as Config);

export async function POST(req: NextRequest) {
	try {
		const formdata = await req.formData();
		const file: any = await formdata.get("file");
		if (!file)
			return NextResponse.json({
				message: "File not found",
				status: 500,
			});

		const buffer = Buffer.from(await file?.arrayBuffer());
		const fileName = await uploadToS3(buffer, file.name, file.type);

		return NextResponse.json({ message: "File Uploaded", status: 200, url : `https://homedecorai.s3.ap-south-1.amazonaws.com/${fileName}` });
	} catch (error: any) {
		NextResponse.json({
			message: `Unable to upload this file : ${error.message}`,
			status: 500,
		});
		return console.log(`Unable to upload this file : ${error.message}`);
	}
}

const uploadToS3 = async (file: Buffer, fileName: string, filetype: string) => {
    const fileBuffer = file;

    const newFileName = `${fileName}-${Date.now()}`;

    const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
        Key: newFileName,
        Body: fileBuffer,
        ContentType: filetype
    }

    const command = new PutObjectCommand(params);
    const res = await s3Client.send(command);
    return newFileName;
};
