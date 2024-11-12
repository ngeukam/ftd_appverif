import React from "react";
const CardFaq = () => {
	return (
		<section className="py-16 bg-gray-100">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Frequently Asked Questions
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						{/* Question 1 */}
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">
								How long does the process take?
							</h3>
							<p className="text-gray-600">
								The duration of the testing process will depend on the date
								range you choose.
							</p>
						</div>
						{/* Question 2 */}
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">
								How are my testers chosen?
							</h3>
							<p className="text-gray-600">
								Your testers are randomly selected based on the defined
								criteria.
							</p>
						</div>
						{/* Question 3 */}
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">
								What happens after testing?
							</h3>
							<p className="text-gray-600">
								Once testing is complete, we will notify you that your app is
								ready to be published in the Google Play Console.
							</p>
						</div>
						{/* Question 4 */}
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">
								How do I become a tester?
							</h3>
							<p className="text-gray-600">
								Becoming a tester with us is simple: you create your account,
								complete all the required profile information, and submit it.
							</p>
						</div>
					</div>
				</div>
			</section>
	);
};

export default CardFaq;
