import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
	suggestion: {
		_id:string,
		inputImage: string,
		inputStyle: string,
		outputImage: string,
		outputSuggestions: string,
	}
}

const ProductCard = ({suggestion : {inputImage , inputStyle , outputImage, outputSuggestions, _id}}: Props) => {
	return (
		<Link href={`/generated/${_id}`} key={_id} className="border-2 border-gray-600 max-w-[275px] flex flex-col gap-8 p-5 rounded-md">
			<img className="rounded-sm" src={outputImage} alt={inputImage} width={300} height={300} />
			<p className="line-clamp-5 text-slate-400 tracking-wide">
				{`${outputSuggestions}`}
			</p>
		</Link>
	);
};

export default ProductCard;
