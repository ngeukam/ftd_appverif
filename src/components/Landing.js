import React from "react";
import {
	FaUserCircle,
	FaPlusCircle,
	FaWallet,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useI18n } from "../context/i18n";
import CardFaq from "./CardFaq";
import CardComment from "./CardComment";
const Landing = () => {
	const i18n = useI18n();

	return (
		<div className="font-sans">
			{/* Hero Section */}
			<section className="relative bg-gray-200">
				<img
					src="./tester-01_50.jpg" // Replace with your image URL
					alt="Hero Background"
					className="w-full h-96 object-cover"
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center py-8">
					<h1 className="text-white text-4xl font-bold">
						{i18n?.t("Welcome to") || "Welcome to"}{" "}
						<span className="bg-[#ff6347] text-white py-1 px-3 rounded-full italic inline-block">
							appVerif
						</span>
					</h1>
					<p className="text-gray-200 text-lg mt-4">
						{i18n?.t(
							"Test your app for the Play Store, App Store, or web with appVerif and launch with confidence! Start today."
						) ||
							"Test your app for the Play Store, App Store, or web with appVerif and launch with confidence! Start today."}
					</p>
					{/* Call to Action Button */}
					<div className="mt-6">
						<Link
							to="/user/new-app" // Replace with your target link
							className="inline-block bg-blue-500 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300 no-underline"
						>
							{i18n?.t("Get more than 20 testers") ||
								"Get more than 20 testers"}
						</Link>
					</div>
				</div>
			</section>

			{/* User Guide Section */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-12">How to Use Our Service</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-gray-50 p-6 rounded-lg shadow-md">
							<FaUserCircle className="mx-auto text-6xl text-blue-500 mb-4" />
							<h3 className="text-xl font-semibold mb-4">
								1. Create Your Account
							</h3>
							<p>
								Sign up in just a few clicks to gain immediate access to all
								features.
							</p>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg shadow-md">
							<FaWallet className="mx-auto text-6xl text-blue-500 mb-4" />
							<h3 className="text-xl font-semibold mb-4">
								2. Add funds in your wallet
							</h3>
							<p>
								Add minimum $5 in your wallet. To recharge you can request us at
								{" "} <a href="mailto:wallet@appverif.com">wallet@appverif.com</a>
							</p>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg shadow-md">
							<FaPlusCircle className="mx-auto text-6xl text-blue-500 mb-4" />
							<h3 className="text-xl font-semibold mb-4">3. Add app to test</h3>
							<p>
								Easily configure your test criteria to match your testing needs.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Steps Section */}
			<section className="py-16 bg-gray-100">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-12">
						Example of Test Process: Google Closed Test
					</h2>
					<div className="grid md:grid-cols-4 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold mb-2">Step 1</h3>
							<p className="text-gray-600">
								Testers who match your criteria accept the invitation to join
								your test.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold mb-2">Step 2</h3>
							<p className="text-gray-600">
								We create a Google group for your test and add all the testers.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold mb-2">Step 3</h3>
							<p className="text-gray-600">
								We will email you with the link to the Google Group that
								contains all your testers.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold mb-2">Step 4</h3>
							<p className="text-gray-600">
								You add this link to your project in the Google Play Console,
								and then the test can be launched.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<CardComment />

			{/* Frequently Asked Questions Section */}
			<CardFaq />
		</div>
	);
};

export default Landing;
