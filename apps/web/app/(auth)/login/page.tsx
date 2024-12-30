"use client";

import { handleEmailPassLoginAction } from "@/actions/auth.action";
import { LoginForm } from "@workspace/auth/components/login-form";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function LoginPage() {
	async function handleEmailPassLogin({
		email,
		password,
	}: { email: string; password: string }) {
		await handleEmailPassLoginAction(email, password);
	}

	return (
		<div className={"w-full md:w-3/5 space-y-4 px-10"}>
			<div className={"w-full"}>
				<h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
				<p className={"text-muted-foreground text-center"}>
					Please enter your email & password
				</p>
			</div>
			<LoginForm handleEmailPassLogin={handleEmailPassLogin} />
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div className={"flex flex-col gap-4"}>
				<Button variant={"outline"}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="#fff"
						viewBox="0 0 256 256"
					>
						<path d="M228,128a100,100,0,1,1-22.86-63.64,12,12,0,0,1-18.51,15.28A76,76,0,1,0,203.05,140H128a12,12,0,0,1,0-24h88A12,12,0,0,1,228,128Z" />
					</svg>
					Google
				</Button>
				<Button variant={"outline"}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="#fff"
						viewBox="0 0 256 256"
					>
						<path d="M212.62,75.17A63.7,63.7,0,0,0,206.39,26,12,12,0,0,0,196,20a63.71,63.71,0,0,0-50,24H126A63.71,63.71,0,0,0,76,20a12,12,0,0,0-10.39,6,63.7,63.7,0,0,0-6.23,49.17A61.5,61.5,0,0,0,52,104v8a60.1,60.1,0,0,0,45.76,58.28A43.66,43.66,0,0,0,92,192v4H76a20,20,0,0,1-20-20,44.05,44.05,0,0,0-44-44,12,12,0,0,0,0,24,20,20,0,0,1,20,20,44.05,44.05,0,0,0,44,44H92v12a12,12,0,0,0,24,0V192a20,20,0,0,1,40,0v40a12,12,0,0,0,24,0V192a43.66,43.66,0,0,0-5.76-21.72A60.1,60.1,0,0,0,220,112v-8A61.5,61.5,0,0,0,212.62,75.17ZM196,112a36,36,0,0,1-36,36H112a36,36,0,0,1-36-36v-8a37.87,37.87,0,0,1,6.13-20.12,11.65,11.65,0,0,0,1.58-11.49,39.9,39.9,0,0,1-.4-27.72,39.87,39.87,0,0,1,26.41,17.8A12,12,0,0,0,119.82,68h32.35a12,12,0,0,0,10.11-5.53,39.84,39.84,0,0,1,26.41-17.8,39.9,39.9,0,0,1-.4,27.72,12,12,0,0,0,1.61,11.53A37.85,37.85,0,0,1,196,104Z" />
					</svg>
					Github
				</Button>
			</div>
			<div className={"space-y-4 text-center text-sm font-semibold"}>
				<p className={"text-muted-foreground"}>
					Forgot Password ?{" "}
					<Link
						href={"/auth/register"}
						className={"underline underline-offset-4 text-primary"}
					>
						Reset Password
					</Link>
				</p>
				<p className={"text-muted-foreground"}>
					Don't have an account?{" "}
					<Link
						href={"/auth/register"}
						className={"underline underline-offset-4 text-primary"}
					>
						Sign Up
					</Link>
				</p>
				<p className={"text-muted-foreground leading-5"}>
					By clicking continue, you agree to our{" "}
					<Link
						href={"/auth/register"}
						className={"underline underline-offset-4 text-primary"}
					>
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link
						href={"/auth/register"}
						className={"underline underline-offset-4 text-primary"}
					>
						Privacy Policy
					</Link>
				</p>
			</div>
		</div>
	);
}
