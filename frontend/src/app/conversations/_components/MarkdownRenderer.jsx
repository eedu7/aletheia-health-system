import remarkGfm from "remark-gfm";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// TODO: Make it type-safe
export const MarkdownRenderer = ({ content }) => {
	return (
		<div className="prose prose-neutral max-w-none">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					table: ({ node, ...props }) => (
						<table className="w-full border-collapse border border-gray-300 text-sm" {...props} />
					),
					thead: ({ node, ...props }) => <thead className="bg-gray-100 font-semibold" {...props} />,
					th: ({ node, ...props }) => (
						<th className="border border-gray-300 px-3 py-2 text-left" {...props} />
					),
					td: ({ node, ...props }) => <td className="border border-gray-300 px-3 py-2" {...props} />,
					tr: ({ node, ...props }) => <tr className="even:bg-gray-50" {...props} />,
					code({ inline, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");
						return !inline && match ? (
							<SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
								{String(children).replace(/\n$/, "")}
							</SyntaxHighlighter>
						) : (
							<code className={className} {...props}>
								{children}
							</code>
						);
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};
