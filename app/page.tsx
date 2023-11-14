"use client";

import React, { FormEvent, useRef, useState } from "react";
import { hero } from "../data";
// import axios from "axios";

import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
	name: "file",
	multiple: false,
	accept: ".jpeg,.jpg,.png,.heic,.svg,.raw",
	action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
	onChange(info) {
		console.log(info.file);
		const { status } = info.file;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e) {
		console.log("Dropped files", e.dataTransfer.files);
	},
};

const Hero: React.FC = () => {
	const { title, subtitle } = hero;
	const [style, setStyle] = useState("");
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
	};
	return (
		<section className={`hero-section`}>
			<div
				className={`flex flex-col items-center gap-[1rem] mx-auto text-center
                    px-5
                    py-5
                    sm:p-10
                    lg:py-25`}>
				<h1 className="text-[2rem] leading-8 tracking-tight drop-shadow-2xl mx-auto font-semibold mb[30px] sm:text-[2.5rem] lg:text-[3rem] lg:leading-tight lg:max-w-[888px] sm:leading-[2.75rem]">
					{title}
				</h1>
				<h2 className="mb-[30px] tracking-wider drop-shadow-2xl max-w-[627px] mx-auto lg:bg-[65px] lg:text-xl text-gray-500">
					{subtitle}
				</h2>
				<form
					className={`flex gap-1 justify-between p-2 w-full max-w-[400px] border-2 border-gray-700 rounded-md`}>
					<input
						className="bg-transparent font-inherit tracking-wider w-full text-white grow text-base focus:outline-none px-4"
						type="text"
						placeholder="Enter Style"
						value={style}
						onChange={(e) => {
							setStyle(e.target.value);
						}}
					/>
					<button
						className="bg-[#7b2cbf] font-inherit tracking-wider flex justify-center text-white max-w-[12rem] hover:bg-gray-500 px-4 py-2 text-md font-semibold rounded-md transition "
						onClick={handleSubmit}>
						Submit
					</button>
				</form>
				<div className="file-upload">
					<Dragger {...props}>
						<p className="ant-upload-drag-icon">
							<InboxOutlined style={{ color: "#7b2cbf" }} />
						</p>
						<p className="text-center text-xl font-semibold mx-5 text-white">
							Double click or drag file to this area to upload
						</p>
						<p className="text-center text-sm mx-5 text-gray-500">
							Support for a single or bulk upload. Strictly
							prohibited from uploading company data or other
							banned files.
						</p>
					</Dragger>
				</div>
			</div>
		</section>
	);
};

export default Hero;
