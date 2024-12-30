import { Geist, Geist_Mono } from "next/font/google";
import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { fontAnurati } from "@/fonts/anurati-font";
import { cn } from "@workspace/ui/lib/utils";

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
			>
				<Providers>
					<div className={"flex w-full min-h-svh"}>
						<div
							className={
								"hidden lg:block w-1/2 relative m-10 bg-zinc-900 rounded-lg p-10"
							}
						>
							<div
								className={cn(
									"absolute text-2xl font-bold text-white w-auto relative tracking-wide",
									fontAnurati.className,
									fontAnurati.variable,
									"antialiased",
								)}
							>
								THUN<span className={"text-brand"}>D</span>ERLABS
								<div
									className={
										"absolute w-[20px] h-1 bg-brand translate-x-[175px]"
									}
								/>
							</div>
							<div className={"absolute  bottom-10 text-white space-y-5"}>
								<p className={"text-2xl font-medium w-4/5"}>
									"This library has saved me countless hours of work and helped
									me deliver stunning designs to my clients faster than ever
									before."
								</p>
								<p className={"text-xl font-medium"}>Sofia Davis</p>
							</div>
						</div>
						<div
							className={
								"w-full lg:w-1/2 flex flex-col items-center justify-center"
							}
						>
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
