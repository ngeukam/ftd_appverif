import pricingRules from "./price_rules";

const calculateTotalPrice = (formData) => {
	let total = 0;

	// Calcul des prix selon les âges
	formData.age.forEach((age) => {
		total += pricingRules.agePrices[age] || 0.1;
	});

	// Calcul des prix selon le genre
	formData.business.forEach((business) => {
		total += pricingRules.businessPrices[business] || 0.1;
	});

	// Calcul des prix selon le pays
	formData.country.forEach((country) => {
		total += pricingRules.countryPrices[country] || 0.05;
	});

	// Calcul des prix selon les hobbies
	// formData.hobbies.forEach((hobby) => {
	// 	total += pricingRules.hobbies[hobby] || 0;
	// });

	// Calcul des prix selon la taille de l'app
	if(formData.app_size){
		total += pricingRules.app_sizePrices[formData.app_size] || 0.5;
	}
	

	// Ajouter le prix pour les testeurs
	if (formData.nb_tester) {
		total *= formData.nb_tester;
	}

	// Calculate the difference between start and end dates in days
	if (formData.start_date && formData.end_date) {
		const startDate = Date.parse(formData.start_date);
		const endDate = Date.parse(formData.end_date);
		// Ensure endDate is after startDate
		if (startDate && endDate && endDate > startDate) {
			const daysDifference = Math.ceil(
				(endDate - startDate) / (1000 * 60 * 60 * 24)
			);
			total *= daysDifference; // Multiply price by the number of days
		}
	}

	return Math.ceil(total);
};

export default calculateTotalPrice;
