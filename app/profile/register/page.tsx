"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SignUp = () => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
		fullname: "",
	});
	const router = useRouter();

	const [error, setError] = useState("");

	const { data, status } = useSession();

	useEffect(() => {
		if (status === "authenticated") {
			router.replace("/profile");
			return;
		}
	}, [status]);

	const onChangeEmail = (event: any) => {
		setUserData((prev) => ({ ...prev, email: event.target.value }));
	};

	const onChangePassword = (event: any) => {
		setUserData((prev) => ({ ...prev, password: event.target.value }));
	};

	const onChangeFullname = (event: any) => {
		setUserData((prev) => ({ ...prev, fullname: event.target.value }));
	};

	const isValidEmail = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValidEmail(userData.email))
			return setError("* Enter a valid email");
		if (userData.email === "") return setError("* Email required");
		if (userData.fullname === "") return setError("* Fullname required");
		if (userData.password === "") return setError("* Password required");
		if (userData.password.length <= 8)
			return setError("* Password should be greater than 8 characters");

		try {
			setError("");
			await axios.post("http://localhost:3000/api/register", {
				...userData,
			});
			router.push("/profile/login");
		} catch (error: any) {
			if (error.response.status === 400) setError(error.response.data);
		}
	};
	return (
		<div className="h-full mx-auto max-w-[350px] flex flex-col justify-center items-center text-white">
			<form
				onSubmit={handleSubmit}
				className="w-full flex flex-col gap-4 px-4 py-6 rounded-md">
				<div className="input-container p-3">
					<UserOutlined
						style={{ color: "#6b7280", fontSize: "1.2rem" }}
					/>
					<input
						type="text"
						className="form-input"
						placeholder="Fullname"
						value={userData.fullname}
						onChange={onChangeFullname}
					/>
				</div>
				<div className="input-container p-3">
					<MailOutlined
						style={{ color: "#6b7280", fontSize: "1.2rem" }}
					/>
					<input
						type="text"
						className="form-input"
						placeholder="Email"
						value={userData.email}
						onChange={onChangeEmail}
					/>
				</div>
				<div className="input-container p-3">
					<LockOutlined
						style={{ color: "#6b7280", fontSize: "1.2rem" }}
					/>
					<input
						type="password"
						className="form-input"
						placeholder="Password"
						value={userData.password}
						onChange={onChangePassword}
					/>
				</div>
				<div className="flex px-2 text-sm flex-row text-gray-500 justify-between">
					<span className="text-sm text-red-500">{error}</span>
				</div>
				<button
					type="submit"
					className="bg-[#7b2cbf] tracking-wider flex justify-center text-white w-full hover:bg-gray-500 px-6 py-2 text-sm font-semibold rounded-lg transition mx-auto">
					Register
				</button>
				<div className="px-2 text-sm text-gray-500">
					Already have an account ?{" "}
					<Link href={"/profile/login"} className="text-[#7b2cbf]">
						Login
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
