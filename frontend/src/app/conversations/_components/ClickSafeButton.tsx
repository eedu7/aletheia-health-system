import { Button } from "@/components/ui/button";

export const ClickSafeButton = (props: React.ComponentProps<typeof Button>) => (
	<Button
		{...props}
		onClick={(e) => {
			e.stopPropagation();
			props.onClick?.(e);
		}}
	/>
);
