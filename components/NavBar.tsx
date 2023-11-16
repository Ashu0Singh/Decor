"use client";

import React, { useEffect, useState } from "react";
import { CgClose, CgMenuRight } from "react-icons/cg";
import { navigation } from "../data";
import NavMobile from "./NavMobile";
import Link from "next/link";

const Header = () => {
	const [bg, setBg] = useState(false);
	const [mobileNav, setMobileNav] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			return window.scrollY > 50 ? setBg(true) : setBg(false);
		});
	});
	return (
		<header
			className={`${
				bg ? `bg-primary py-4 lg:py-6` : "bg-none"
			} fixed h-[10vh] left-0 w-full backdrop-filter backdrop-blur-lg py-8 px-3 z-10`}>
			<div className="container font-semibold mx-auto flex justify-between items-center">
				<div>
					<a href="#home" className="text-white text-2xl">
						Home<span className="text-[#7b2cbf]">Decor</span>
					</a>
				</div>
				<div className="md:hidden">
					<div
						onClick={() => setMobileNav(!mobileNav)}
						className="text-2xl text-white cursor-pointer">
						{mobileNav ? <CgClose /> : <CgMenuRight />}
					</div>
				</div>
				<nav className="hidden md:flex ml-auto">
					<ul className="md:flex md:gap-x-12">
						{navigation.map((item, index) => (
							<li key={index}>
								<Link
									className="capitalize text-white hover:border-b transition-all"
									href={item.href}>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className={`${mobileNav ? "left-0" : "-left-[100%]"} z-20 transition-all duration-200 fixed w-full h-[90vh]`}>
				<NavMobile />
			</div>
		</header>
	);
};

export default Header;
