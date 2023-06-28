import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
	return (
		<div className="min-h-screen flex flex-col gap-y-6 justify-center items-center p-6 bg-gray-100">
			<div>
				<Link href="/">
					<ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
				</Link>
			</div>

			<div className="w-full sm:max-w-md p-6 bg-white shadow-md overflow-hidden rounded-lg">
				{children}
			</div>
		</div>
	);
}
