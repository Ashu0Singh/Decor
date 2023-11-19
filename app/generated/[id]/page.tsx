"use client";
import React from "react";

type Props = {
	params: { id: string | undefined };
};

const GeneratedSuggestion = ({ params : {id} }: Props) => {
	console.log(id);
	return (
		<div className="pt-[12vh] text-white border-2 h-full">{id}</div>
	);
};

export default GeneratedSuggestion;
