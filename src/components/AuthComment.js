import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const AuthComment = () => {
	return (
		<div className="hidden md:flex w-1/2 bg-white p-8 flex-col justify-center">
			<FaQuoteLeft className="text-blue-500 text-4xl mb-4" />
			<p className="text-gray-600 text-2xl text-center leading-relaxed font-light">
				"I just learned about <span className="font-semibold">@supabase</span>{" "}
				and I’m in love 😍 Supabase is an open-source Firebase alternative!
				EarListen (&apos;react&apos;) to database changes 🧑‍💻 Manage users
				&amp; permissions 🛠️ Simple UI for database interaction."
			</p>
			
			<div className="text-center text-gray-500">- @Stephane</div>
		</div>
	);
};

export default AuthComment;
