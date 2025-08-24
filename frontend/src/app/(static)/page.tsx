"use client";

import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useAuth } from "@/hooks/api/useAuth";

const sentence = "Smarter Healthcare, Powered by Compassion and AI";

export default function HomePage() {
	const { isAuthenticated } = useAuth();

	const words = sentence.split(" ");

	return (
		<div className="mb-24 max-w-2xl space-y-4">
			<AnimatePresence>
				<motion.h1
					className="flex flex-wrap gap-2 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-5xl font-bold text-transparent"
					initial="hidden"
					animate="visible"
					variants={{
						hidden: {},
						visible: {},
					}}
					transition={{
						staggerChildren: 0.08,
					}}
				>
					{words.map((word, i) => (
						<motion.span
							key={i}
							className="inline-block"
							variants={{
								hidden: { opacity: 0, y: 20, rotateX: -90 },
								visible: {
									opacity: 1,
									y: 0,
									rotateX: 0,
									transition: {
										type: "spring",
										damping: 12,
										stiffness: 120,
									},
								},
							}}
						>
							{word}
						</motion.span>
					))}
				</motion.h1>
			</AnimatePresence>

			<AnimatePresence>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
					className="text-lg leading-relaxed text-gray-700"
				>
					<span className="font-semibold text-emerald-500">Aletheia Health System</span> brings people and
					technology together to make healthcare more{" "}
					<span className="font-medium text-cyan-600">personal</span>,{" "}
					<span className="font-medium text-blue-600">accurate</span>, and{" "}
					<span className="font-medium text-emerald-600">accessible</span>. From{" "}
					<span className="font-semibold text-cyan-700">early cancer detection</span> to{" "}
					<span className="font-semibold text-blue-700">secure health records</span> and{" "}
					<span className="font-semibold text-teal-500">supportive AI chatbots</span>, we focus on empowering
					patients and doctors to make better decisions — because{" "}
					<span className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text font-bold text-transparent">
						every life matters.
					</span>
				</motion.p>
			</AnimatePresence>

			{isAuthenticated && (
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.8, duration: 0.4, ease: "easeInOut" }}
						className="w-fit"
					>
						<Link href="/conversations/" className="group relative flex w-fit items-center gap-2 font-bold">
							{/* Gradient Button Text */}
							<span className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
								Get Started
							</span>

							<motion.div
								initial={{ opacity: 0.8, scale: 1 }}
								animate={{
									opacity: [0.8, 1, 0.8],
									scale: [1, 1.15, 1],
									rotate: [0, 3, -3, 0],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="relative"
							>
								<motion.span
									animate={{
										backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
									}}
									transition={{
										duration: 6,
										repeat: Infinity,
										ease: "linear",
									}}
									className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-[length:200%_200%] opacity-70 blur-sm"
								/>
								<Sparkles className="relative size-4 text-white" />
							</motion.div>
							<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
						</Link>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
}
