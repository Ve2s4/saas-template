"use client";

import { sendOtpViaEmail, verifyOtp } from "@/actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@workspace/auth/utils/client";
import { maskEmail } from "@workspace/auth/utils/helpers";
import { Button } from "@workspace/ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
	REGEXP_ONLY_DIGITS,
} from "@workspace/ui/components/input-otp";
import { Loading } from "@workspace/ui/components/loading";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const variants = {
	initial: { opacity: 0, y: 50 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { type: "tween", ease: "easeOut", duration: 0.3 },
	},
	exit: {
		opacity: 0,
		y: -50,
		transition: { type: "tween", ease: "easeIn", duration: 0.3 },
	},
};

const formSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
});

interface IAuthWrapperProps {
	type: "login" | "signup";
}

export function AuthWrapper({ type }: IAuthWrapperProps) {
	const [state, setState] = useState({
		stage: 1,
		userEmail: "",
	});
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const { toast } = useToast();
	const router = useRouter();

	async function handleSendOtpViaEmail({ email }: { email: string }) {
		setLoading(true);
		const { error } = await sendOtpViaEmail(email);
		if (error) {
			toast({
				title: "Error",
				description: error || "Oops! Something went wrong",
				variant: "destructive",
			});
		} else {
			setState({ stage: 2, userEmail: email });
		}
		setLoading(false);
	}

	async function handleVerifyOtp(otp: string, email: string) {
		toast({
			title: "Verifying OTP",
			description: "Hang tight! We're verifying your OTP",
		});
		const { error } = await verifyOtp(otp, email);
		if (error) {
			toast({
				title: "Error",
				description: error || "Oops! Something went wrong",
				variant: "destructive",
			});
		} else {
			router.push("/dashboard");
		}
	}

	async function handleSignInWithOauth(provider: "google" | "github") {
		const supabase = createClient();
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/callback`,
			},
		});
	}

	return (
		<div className={"w-full md:w-3/5 space-y-4 px-10"}>
			{state.stage === 1 ? (
				<motion.div
					key="stage1"
					initial="initial"
					animate="animate"
					exit="exit"
					variants={variants}
					className={"space-y-4"}
				>
					<div className={"w-full"}>
						<h1 className="text-3xl font-bold text-center">
							{type === "login" ? "Welcome Back!" : "Create an account"}
						</h1>
						<p className={"text-muted-foreground text-center"}>
							{type === "login"
								? "Please enter your email to sign in to your account."
								: "Please enter your email to create an account."}
						</p>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSendOtpViaEmail)}
							className={"flex flex-col gap-4"}
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type={"email"}
												placeholder="john@email.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">
								{loading && <Loading className={"animate-spin"} />}
								{loading ? "Sending OTP ..." : "Send OTP"}
							</Button>
						</form>
					</Form>
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
						<Button
							variant={"outline"}
							onClick={() => handleSignInWithOauth("google")}
						>
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
						<Button
							variant={"outline"}
							onClick={() => handleSignInWithOauth("github")}
						>
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
						{type === "login" ? (
							<p className={"text-muted-foreground"}>
								Don't have an account?{" "}
								<Link
									href={"/signup"}
									className={"underline underline-offset-4 text-primary"}
								>
									Sign Up
								</Link>
							</p>
						) : (
							<p className={"text-muted-foreground"}>
								Already have an account?{" "}
								<Link
									href={"/login"}
									className={"underline underline-offset-4 text-primary"}
								>
									Sign In
								</Link>
							</p>
						)}
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
				</motion.div>
			) : (
				<motion.div
					key="stage2"
					initial="initial"
					animate="animate"
					exit="exit"
					variants={variants}
				>
					<div className={"flex flex-col items-center gap-4"}>
						<h1 className="text-3xl font-semibold text-center">
							Enter the 6-digit code
						</h1>
						<p className={"text-muted-foreground text-center"}>
							We've sent a 6-digit code to your email address{" "}
							<span className={"border px-1 rounded-lg text-sm font-semibold"}>
								{maskEmail(state.userEmail)}
							</span>
							.
						</p>
						<InputOTP
							maxLength={6}
							pattern={REGEXP_ONLY_DIGITS}
							onChange={(value) =>
								value.length === 6 && handleVerifyOtp(value, state.userEmail)
							}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
							</InputOTPGroup>
							<InputOTPSeparator />
							<InputOTPGroup>
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
						<div className={"space-y-4 text-center text-sm font-semibold"}>
							<p className={"text-muted-foreground"}>
								Didn't received the OTP ?{" "}
								<Button
									variant={"link"}
									className={"underline underline-offset-4 text-primary p-0"}
									onClick={() => setState({ ...state, stage: 1 })}
								>
									Request again
								</Button>
							</p>
							<p className={"text-muted-foreground"}>
								Already have an account?{" "}
								<Link
									href={"/login"}
									className={"underline underline-offset-4 text-primary"}
								>
									Sign In
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
				</motion.div>
			)}
		</div>
	);
}
