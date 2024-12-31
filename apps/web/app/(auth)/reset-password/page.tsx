"use client";

import {
	NewPasswordForm,
	ResetPasswordForm,
} from "@workspace/auth/components/reset-password-form";
import { maskEmail } from "@workspace/auth/utils/helpers";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
	REGEXP_ONLY_DIGITS,
} from "@workspace/ui/components/input-otp";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

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

const Footer = () => {
	return (
		<div className={"space-y-4 text-center text-sm font-semibold"}>
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
	);
};

export default function ResetPasswordPage() {
	async function handleResetPassword({ email }: { email: string }) {
		setUserEmail(maskEmail(email));
		setStage(2);
	}

	async function handleNewPassword({
		password,
		confirmPassword,
	}: { password: string; confirmPassword: string }) {
		console.log(password, confirmPassword);
		setStage(3);
	}

	const [stage, setStage] = useState(1);
	const [userEmail, setUserEmail] = useState("");

	return (
		<div className={"w-full md:w-3/5 space-y-4 px-10"}>
			{stage === 1 && (
				<motion.div
					key="stage1"
					initial="initial"
					animate="animate"
					exit="exit"
					variants={variants}
					className={"space-y-4"}
				>
					<div className={"w-full"}>
						<h1 className="text-3xl font-bold text-center">Enter your email</h1>
						<p className={"text-muted-foreground text-center"}>
							Please enter your email address with which you registered
						</p>
					</div>
					<ResetPasswordForm handleResetPassword={handleResetPassword} />
					<Footer />
				</motion.div>
			)}
			{stage === 2 && (
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
								{userEmail}
							</span>
							.
						</p>
						<InputOTP
							maxLength={6}
							pattern={REGEXP_ONLY_DIGITS}
							onChange={(value) => value.length === 6 && setStage(3)}
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
						<Footer />
					</div>
				</motion.div>
			)}
			{stage === 3 && (
				<motion.div
					key="stage3"
					initial="initial"
					animate="animate"
					exit="exit"
					variants={variants}
				>
					<div className={"space-y-4"}>
						<h1 className="text-3xl font-bold text-center">
							Enter new password
						</h1>
						<p className={"text-muted-foreground text-center"}>
							Please enter your new password and make sure to remember it
						</p>
						<NewPasswordForm handleNewPassword={handleNewPassword} />
						<Footer />
					</div>
				</motion.div>
			)}
		</div>
	);
}
