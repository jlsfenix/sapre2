import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Header from "@/Components/Header";

export default function Dashboard({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<Header title="Dashboard" />}
		>
			<Head title="Dashboard" />

			<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
				<div className="text-gray-900">You're logged in!</div>
			</div>
		</AuthenticatedLayout>
	);
}
