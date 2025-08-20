"use client";

import { LinkIcon } from "lucide-react";
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
					className="flex flex-wrap gap-2 text-5xl font-bold text-gray-700"
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
					className="text-gray-600"
				>
					Aletheia Health System brings people and technology together to make healthcare more personal,
					accurate, and accessible. From early cancer detection to secure health records and supportive AI
					chatbots, we focus on empowering patients and doctors to make better decisions — because every life
					matters.
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
						<Link
							href="/conversations/"
							className="text-primary group relative flex w-fit items-center gap-2 font-bold"
						>
							Get Started <LinkIcon className="h-3 w-3" />
							<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
						</Link>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
}
