"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter.",
		})
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter.",
		})
		.regex(/[0-9]/, { message: "Password must contain at least one number." })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Password must contain at least one special character.",
		})
		.refine((val) => !/\b(john|doe|name)\b/i.test(val), {
			message: "Password must not contain names.",
		}),
	confirmPassword: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter.",
		})
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter.",
		})
		.regex(/[0-9]/, { message: "Password must contain at least one number." })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Password must contain at least one special character.",
		})
		.refine((val) => !/\b(john|doe|name)\b/i.test(val), {
			message: "Password must not contain names.",
		}),
});

interface ISignupFormProps {
	handleEmailPassLogin: (values: { email: string; password: string }) => void;
}

export function SignupForm({ handleEmailPassLogin }: ISignupFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleEmailPassLogin)}
				className={"flex flex-col gap-4"}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type={"email"} placeholder="john@email.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<p>Password</p>
							</FormLabel>
							<FormControl>
								<Input type={"password"} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<p>Confirm Password</p>
							</FormLabel>
							<FormControl>
								<Input type={"password"} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
