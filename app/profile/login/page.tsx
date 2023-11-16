"use client";
import React, { FormEvent, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";

const Login = () => {
	const [userData, setUserData] = useState({ email: "", password: "" });

	const onChangeEmail = (event: any) => {
		setUserData((prev) => ({ ...prev, email: event.target.value }));
	};

	const onChangePassword = (event: any) => {
		setUserData((prev) => ({ ...prev, password: event.target.value }));
	};

	const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(userData)
	};
	return (
		<div className="h-full mx-auto max-w-[350px] flex flex-col justify-center items-center text-white">
			<form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 px-4 py-6 rounded-md">
				<div className="input-container p-3">
					<MailOutlined style={{ color: "#6b7280", fontSize: "1.2rem" }} />
					<input
						type="email"
						className="form-input"
                        placeholder="Email"
                        value={userData.email}
                        onChange={onChangeEmail}
					/>
				</div>
				<div className="input-container p-3">
					<LockOutlined style={{ color: "#6b7280", fontSize: "1.2rem" }} />
					<input
						type="password"
						className="form-input"
                        placeholder="Password"
                        value={userData.password}
                        onChange={onChangePassword}
					/>
				</div>
				<div className="flex px-2 text-sm flex-row text-gray-500 justify-between">
					Forgot Password ?
				</div>
				<button type="submit" className="bg-[#7b2cbf] tracking-wider flex justify-center text-white w-full hover:bg-gray-500 px-6 py-2 text-sm font-semibold rounded-lg transition mx-auto">
					Login
				</button>
				<div className="px-2 text-sm text-gray-500">
					Not a member ?{" "}
					<Link href={"/profile/register"} className="text-[#7b2cbf]">
						Register
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
