import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
const CardComment = () => {
	return (
		<section className="py-16 bg-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-12">
						What Our Customers Are Saying
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-gray-50 p-8 rounded-lg shadow-lg">
							<FaQuoteLeft className="text-blue-500 text-4xl mb-4" />
							<p className="italic text-lg mb-4">
								"This service transformed our business. It's incredibly easy to
								use and efficient!"
							</p>
							<h4 className="font-bold">- Alex Johnson</h4>
						</div>
						<div className="bg-gray-50 p-8 rounded-lg shadow-lg">
							<FaQuoteLeft className="text-blue-500 text-4xl mb-4" />
							<p className="italic text-lg mb-4">
								"I've seen measurable growth since I started using this tool.
								Highly recommend it!"
							</p>
							<h4 className="font-bold">- Lisa Martinez</h4>
						</div>
						<div className="bg-gray-50 p-8 rounded-lg shadow-lg">
							<FaQuoteLeft className="text-blue-500 text-4xl mb-4" />
							<p className="italic text-lg mb-4">
								"The customer service is outstanding. They really care about
								their clients!"
							</p>
							<h4 className="font-bold">- Michael Brown</h4>
						</div>
					</div>
				</div>
			</section>
	);
};

export default CardComment;
