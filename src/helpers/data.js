import { useI18n } from "../context/i18n";

export const useHobbiesList = () => {
	const i18n = useI18n();
   
	const hobbiesList = [
		{ label: i18n?.t("Healthcare") || "Healthcare", value: "healthcare" },
		{ label: i18n?.t("Map & Navigation") || "Map & Navigation", value: "map_navigation" },
		{ label: i18n?.t("Game") || "Game", value: "game" },
		{ label: i18n?.t("Auto & Vehicles") || "Auto & Vehicles", value: "auto_vehicles" },
		{ label: i18n?.t("Entertainment") || "Entertainment", value: "entertainment" },
		{ label: i18n?.t("Social") || "Social", value: "social" },
		{ label: i18n?.t("Productivity") || "Productivity", value: "productivity" },
		{ label: i18n?.t("Communication") || "Communication", value: "communication" },
		{ label: i18n?.t("Music & Audio") || "Music & Audio", value: "music_audio" },
		{ label: i18n?.t("Reading") || "Reading", value: "reading" },
		{ label: i18n?.t("Photography") || "Photography", value: "photography" },
		{ label: i18n?.t("Shopping") || "Shopping", value: "shopping" },
		{ label: i18n?.t("Education") || "Education", value: "education" },
		{ label: i18n?.t("Art & Design") || "Art & Design", value: "art_design" },
        { label: i18n?.t("Personalisation") || "Personalisation", value: "personalisation" },
		{ label: i18n?.t("Weather") || "Weather", value: "weather" },
		{ label: i18n?.t("Beauty") || "Beauty", value: "beauty" },
		

	];

	return hobbiesList;
};
export const appSizeList = () => {
	const appSizeList = [
		{ label: "0-100 Mo", value: "0-100" },
		{ label: "101-200 Mo", value: "101-200" },
		{ label: "201-300 Mo", value: "201-300" },
		{ label: "301-400 Mo", value: "301-400" },
		{ label: "401-500 Mo", value: "401-500" },
		{ label: "501-600 Mo", value: "501-600" },
		{ label: "601-700 Mo", value: "601-700" },
		{ label: "701-800 Mo", value: "701-800" },
		{ label: "801-900 Mo", value: "801-900" },
		{ label: "901-1000 Mo", value: "901-1000" },
		{ label: "1001-1100 Mo", value: "1001-1100" },
		{ label: "1101-1200 Mo", value: "1101-1200" },
		{ label: "1201-1300 Mo", value: "1201-1300" },
		{ label: "1301-1400 Mo", value: "1301-1400" },
		{ label: "1401-1500 Mo", value: "1401-1500" },
		{ label: "1501-1600 Mo", value: "1501-1600" },
		{ label: "1601-1700 Mo", value: "1601-1700" },
		{ label: "1701-1800 Mo", value: "1701-1800" },
		{ label: "1801-1900 Mo", value: "1801-1900" },
		{ label: "1901-2000 Mo", value: "1901-2000" },
	];

	return appSizeList;
};

export const useBusinessTypeOptions = () => {
    const i18n = useI18n();
    const businessTypeOptions = [
        { value: "non_profit", label: i18n?.t("Non-Profit") || "Non-Profit" },
        { value: "retail", label: i18n?.t("Retail") || "Retail" },
        { value: "manufacturing", label: i18n?.t("Manufacturing") || "Manufacturing" },
        { value: "it_service", label: i18n?.t("IT service") || "IT service" },
        { value: "healthcare", label: i18n?.t("Healthcare") || "Healthcare" },
        { value: "finance", label: i18n?.t("Finance") || "Finance" },
        { value: "hospitality", label: i18n?.t("Hospitality") || "Hospitality" },
        { value: "construction", label: i18n?.t("Construction") || "Construction" },
        { value: "education", label: i18n?.t("Education") || "Education" },
        { value: "transportation", label: i18n?.t("Transportation") || "Transportation" },
        { value: "real_estate", label: i18n?.t("Real estate") || "Real Estate" },
        { value: "food_service", label: i18n?.t("Food Service") || "Food Service" },
        { value: "entertainment", label: i18n?.t("Entertainment") || "Entertainment" },
        { value: "consulting", label: i18n?.t("Consulting") || "Consulting" },
        { value: "agriculture", label: i18n?.t("Agriculture") || "Agriculture" },
        { value: "ecommerce", label: i18n?.t("E-commerce") || "E-commerce" },
        { value: "influencer", label: i18n?.t("Influencer") || "Influencer" },
        { value: "sports", label: i18n?.t("Sports") || "Sports" },
        { value: "industry", label: i18n?.t("Industry") || "Industry" },
        { value: "energy", label: i18n?.t("Energy") || "Energy" },
    ];
    return businessTypeOptions;
};

export const useTerminalList = () => {
	const i18n = useI18n();
	const terminalList = [
		{ label: i18n?.t("Android") || "Android", value: "android" },
		{ label: i18n?.t("iOS") || "iOS", value: "ios" },
		{ label: i18n?.t("PC") || "PC", value: "pc" },
	];
	return terminalList;
};

export const useGenderList = () => {
	const i18n = useI18n();
	const genderList = [
		{ label: i18n?.t("Male") || "Male", value: "male" },
		{ label: i18n?.t("Female") || "Female", value: "female" },
		{ label: i18n?.t("Other") || "Other", value: "other" },
	];
	return genderList;
};

export const useAgeList = () => {
	const ageList = [
		{ label: "0-12", value: "0-12"},
		{ label: "13-17", value: "13-17" },
		{ label: "18-25", value: "18-25" },
		{ label: "26-35", value: "26-35" },
		{ label: "36-45", value: "36-45" },
		{ label: "46-54", value: "46-54s" },
		{ label: "55-64", value: "55-64" },
		{ label: "65+", value: "65+" },
	];
	return ageList;
};

export const useCountryList = () => {
	const i18n = useI18n();

	// Helper function to capitalize the first letter of a string
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};

	const countryList = [
		{ label: i18n?.t("Cameroon") || "Cameroon", value: capitalizeFirstLetter("cameroon") },
		{ label: i18n?.t("Canada") || "Canada", value: capitalizeFirstLetter("canada") },
		{ label: i18n?.t("France") || "France", value: capitalizeFirstLetter("france") },
		{ label: i18n?.t("Germany") || "Germany", value: capitalizeFirstLetter("germany") },
		{ label: i18n?.t("Hungary") || "Hungary", value: capitalizeFirstLetter("hungary") },
		{ label: i18n?.t("Iceland") || "Iceland", value: capitalizeFirstLetter("iceland") },
		{ label: i18n?.t("India") || "India", value: capitalizeFirstLetter("india") },
		{ label: i18n?.t("Indonesia") || "Indonesia", value: capitalizeFirstLetter("indonesia") },
		{ label: i18n?.t("Iran") || "Iran", value: capitalizeFirstLetter("iran") },
		{ label: i18n?.t("Iraq") || "Iraq", value: capitalizeFirstLetter("iraq") },
		{ label: i18n?.t("Ireland") || "Ireland", value: capitalizeFirstLetter("ireland") },
		{ label: i18n?.t("Israel") || "Israel", value: capitalizeFirstLetter("israel") },
		{ label: i18n?.t("Italy") || "Italy", value: capitalizeFirstLetter("italy") },
		{ label: i18n?.t("Jamaica") || "Jamaica", value: capitalizeFirstLetter("jamaica") },
		{ label: i18n?.t("Japan") || "Japan", value: capitalizeFirstLetter("japan") },
		{ label: i18n?.t("Jordan") || "Jordan", value: capitalizeFirstLetter("jordan") },
		{ label: i18n?.t("Kazakhstan") || "Kazakhstan", value: capitalizeFirstLetter("kazakhstan") },
		{ label: i18n?.t("Kenya") || "Kenya", value: capitalizeFirstLetter("kenya") },
		{ label: i18n?.t("Kiribati") || "Kiribati", value: capitalizeFirstLetter("kiribati") },
		{ label: i18n?.t("Kuwait") || "Kuwait", value: capitalizeFirstLetter("kuwait") },
		{ label: i18n?.t("Kyrgyzstan") || "Kyrgyzstan", value: capitalizeFirstLetter("kyrgyzstan") },
		{ label: i18n?.t("Laos") || "Laos", value: capitalizeFirstLetter("laos") },
		{ label: i18n?.t("Latvia") || "Latvia", value: capitalizeFirstLetter("latvia") },
		{ label: i18n?.t("Lebanon") || "Lebanon", value: capitalizeFirstLetter("lebanon") },
		{ label: i18n?.t("Lesotho") || "Lesotho", value: capitalizeFirstLetter("lesotho") },
		{ label: i18n?.t("Liberia") || "Liberia", value: capitalizeFirstLetter("liberia") },
		{ label: i18n?.t("Libya") || "Libya", value: capitalizeFirstLetter("libya") },
		{ label: i18n?.t("Liechtenstein") || "Liechtenstein", value: capitalizeFirstLetter("liechtenstein") },
		{ label: i18n?.t("Lithuania") || "Lithuania", value: capitalizeFirstLetter("lithuania") },
		{ label: i18n?.t("Luxembourg") || "Luxembourg", value: capitalizeFirstLetter("luxembourg") },
		{ label: i18n?.t("Madagascar") || "Madagascar", value: capitalizeFirstLetter("madagascar") },
		{ label: i18n?.t("Malawi") || "Malawi", value: capitalizeFirstLetter("malawi") },
		{ label: i18n?.t("Malaysia") || "Malaysia", value: capitalizeFirstLetter("malaysia") },
		{ label: i18n?.t("Maldives") || "Maldives", value: capitalizeFirstLetter("maldives") },
		{ label: i18n?.t("Mali") || "Mali", value: capitalizeFirstLetter("mali") },
		{ label: i18n?.t("Malta") || "Malta", value: capitalizeFirstLetter("malta") },
		{ label: i18n?.t("Marshall Islands") || "Marshall Islands", value: capitalizeFirstLetter("marshall-islands") },
		{ label: i18n?.t("Mauritania") || "Mauritania", value: capitalizeFirstLetter("mauritania") },
		{ label: i18n?.t("Mauritius") || "Mauritius", value: capitalizeFirstLetter("mauritius") },
		{ label: i18n?.t("Mexico") || "Mexico", value: capitalizeFirstLetter("mexico") },
		{ label: i18n?.t("Micronesia") || "Micronesia", value: capitalizeFirstLetter("micronesia") },
		{ label: i18n?.t("Moldova") || "Moldova", value: capitalizeFirstLetter("moldova") },
		{ label: i18n?.t("Monaco") || "Monaco", value: capitalizeFirstLetter("monaco") },
		{ label: i18n?.t("Mongolia") || "Mongolia", value: capitalizeFirstLetter("mongolia") },
		{ label: i18n?.t("Montenegro") || "Montenegro", value: capitalizeFirstLetter("montenegro") },
		{ label: i18n?.t("Morocco") || "Morocco", value: capitalizeFirstLetter("morocco") },
		{ label: i18n?.t("Mozambique") || "Mozambique", value: capitalizeFirstLetter("mozambique") },
		{ label: i18n?.t("Myanmar") || "Myanmar", value: capitalizeFirstLetter("myanmar") },
		{ label: i18n?.t("Namibia") || "Namibia", value: capitalizeFirstLetter("namibia") },
		{ label: i18n?.t("Nauru") || "Nauru", value: capitalizeFirstLetter("nauru") },
		{ label: i18n?.t("Nepal") || "Nepal", value: capitalizeFirstLetter("nepal") },
		{ label: i18n?.t("Netherlands") || "Netherlands", value: capitalizeFirstLetter("netherlands") },
		{ label: i18n?.t("New Zealand") || "New Zealand", value: capitalizeFirstLetter("new-zealand") },
		{ label: i18n?.t("Nicaragua") || "Nicaragua", value: capitalizeFirstLetter("nicaragua") },
		{ label: i18n?.t("Niger") || "Niger", value: capitalizeFirstLetter("niger") },
		{ label: i18n?.t("Nigeria") || "Nigeria", value: capitalizeFirstLetter("nigeria") },
		{ label: i18n?.t("North Korea") || "North Korea", value: capitalizeFirstLetter("north-korea") },
		{ label: i18n?.t("North Macedonia") || "North Macedonia", value: capitalizeFirstLetter("north-macedonia") },
		{ label: i18n?.t("Norway") || "Norway", value: capitalizeFirstLetter("norway") },
		{ label: i18n?.t("Oman") || "Oman", value: capitalizeFirstLetter("oman") },
		{ label: i18n?.t("Pakistan") || "Pakistan", value: capitalizeFirstLetter("pakistan") },
		{ label: i18n?.t("Palau") || "Palau", value: capitalizeFirstLetter("palau") },
		{ label: i18n?.t("Palestine") || "Palestine", value: capitalizeFirstLetter("palestine") },
		{ label: i18n?.t("Panama") || "Panama", value: capitalizeFirstLetter("panama") },
		{ label: i18n?.t("Papua New Guinea") || "Papua New Guinea", value: capitalizeFirstLetter("papua-new-guinea") },
		{ label: i18n?.t("Paraguay") || "Paraguay", value: capitalizeFirstLetter("paraguay") },
		{ label: i18n?.t("Peru") || "Peru", value: capitalizeFirstLetter("peru") },
		{ label: i18n?.t("Philippines") || "Philippines", value: capitalizeFirstLetter("philippines") },
		{ label: i18n?.t("Poland") || "Poland", value: capitalizeFirstLetter("poland") },
		{ label: i18n?.t("Portugal") || "Portugal", value: capitalizeFirstLetter("portugal") },
		{ label: i18n?.t("Qatar") || "Qatar", value: capitalizeFirstLetter("qatar") },
		{ label: i18n?.t("Romania") || "Romania", value: capitalizeFirstLetter("romania") },
		{ label: i18n?.t("Russia") || "Russia", value: capitalizeFirstLetter("russia") },
		{ label: i18n?.t("Rwanda") || "Rwanda", value: capitalizeFirstLetter("rwanda") },
		{ label: i18n?.t("Saint Kitts and Nevis") || "Saint Kitts and Nevis", value: capitalizeFirstLetter("saint-kitts-and-nevis") },
		{ label: i18n?.t("Saint Lucia") || "Saint Lucia", value: capitalizeFirstLetter("saint-lucia") },
		{ label: i18n?.t("Saint Vincent and the Grenadines") || "Saint Vincent and the Grenadines", value: capitalizeFirstLetter("saint-vincent-and-the-grenadines") },
		{ label: i18n?.t("Samoa") || "Samoa", value: capitalizeFirstLetter("samoa") },
		{ label: i18n?.t("San Marino") || "San Marino", value: capitalizeFirstLetter("san-marino") },
		{ label: i18n?.t("Sao Tome and Principe") || "Sao Tome and Principe", value: capitalizeFirstLetter("sao-tome-and-principe") },
		{ label: i18n?.t("Saudi Arabia") || "Saudi Arabia", value: capitalizeFirstLetter("saudi-arabia") },
		{ label: i18n?.t("Senegal") || "Senegal", value: capitalizeFirstLetter("senegal") },
		{ label: i18n?.t("Serbia") || "Serbia", value: capitalizeFirstLetter("serbia") },
		{ label: i18n?.t("Singapore") || "Singapore", value: capitalizeFirstLetter("singapore") },
		{ label: i18n?.t("Slovakia") || "Slovakia", value: capitalizeFirstLetter("slovakia") },
		{ label: i18n?.t("Slovenia") || "Slovenia", value: capitalizeFirstLetter("slovenia") },
		{ label: i18n?.t("Solomon Islands") || "Solomon Islands", value: capitalizeFirstLetter("solomon-islands") },
		{ label: i18n?.t("Somalia") || "Somalia", value: capitalizeFirstLetter("somalia") },
		{ label: i18n?.t("South Africa") || "South Africa", value: capitalizeFirstLetter("south-africa") },
		{ label: i18n?.t("South Korea") || "South Korea", value: capitalizeFirstLetter("south-korea") },
		{ label: i18n?.t("South Sudan") || "South Sudan", value: capitalizeFirstLetter("south-sudan") },
		{ label: i18n?.t("Spain") || "Spain", value: capitalizeFirstLetter("spain") },
		{ label: i18n?.t("Sri Lanka") || "Sri Lanka", value: capitalizeFirstLetter("sri-lanka") },
		{ label: i18n?.t("Sudan") || "Sudan", value: capitalizeFirstLetter("sudan") },
		{ label: i18n?.t("Suriname") || "Suriname", value: capitalizeFirstLetter("suriname") },
		{ label: i18n?.t("Sweden") || "Sweden", value: capitalizeFirstLetter("sweden") },
		{ label: i18n?.t("Switzerland") || "Switzerland", value: capitalizeFirstLetter("switzerland") },
		{ label: i18n?.t("Syria") || "Syria", value: capitalizeFirstLetter("syria") },
		{ label: i18n?.t("Taiwan") || "Taiwan", value: capitalizeFirstLetter("taiwan") },
		{ label: i18n?.t("Tajikistan") || "Tajikistan", value: capitalizeFirstLetter("tajikistan") },
		{ label: i18n?.t("Tanzania") || "Tanzania", value: capitalizeFirstLetter("tanzania") },
		{ label: i18n?.t("Thailand") || "Thailand", value: capitalizeFirstLetter("thailand") },
		{ label: i18n?.t("Togo") || "Togo", value: capitalizeFirstLetter("togo") },
		{ label: i18n?.t("Tonga") || "Tonga", value: capitalizeFirstLetter("tonga") },
		{ label: i18n?.t("Trinidad and Tobago") || "Trinidad and Tobago", value: capitalizeFirstLetter("trinidad-and-tobago") },
		{ label: i18n?.t("Tunisia") || "Tunisia", value: capitalizeFirstLetter("tunisia") },
		{ label: i18n?.t("Turkey") || "Turkey", value: capitalizeFirstLetter("turkey") },
		{ label: i18n?.t("Turkmenistan") || "Turkmenistan", value: capitalizeFirstLetter("turkmenistan") },
		{ label: i18n?.t("Tuvalu") || "Tuvalu", value: capitalizeFirstLetter("tuvalu") },
		{ label: i18n?.t("Uganda") || "Uganda", value: capitalizeFirstLetter("uganda") },
		{ label: i18n?.t("Ukraine") || "Ukraine", value: capitalizeFirstLetter("ukraine") },
		{ label: i18n?.t("United Arab Emirates") || "United Arab Emirates", value: capitalizeFirstLetter("united-arab-emirates") },
		{ label: i18n?.t("United Kingdom") || "United Kingdom", value: capitalizeFirstLetter("united-kingdom") },
		{ label: i18n?.t("United States") || "United States", value: capitalizeFirstLetter("united-states") },
		{ label: i18n?.t("Uruguay") || "Uruguay", value: capitalizeFirstLetter("uruguay") },
		{ label: i18n?.t("Uzbekistan") || "Uzbekistan", value: capitalizeFirstLetter("uzbekistan") },
		{ label: i18n?.t("Vanuatu") || "Vanuatu", value: capitalizeFirstLetter("vanuatu") },
		{ label: i18n?.t("Vatican City") || "Vatican City", value: capitalizeFirstLetter("vatican-city") },
		{ label: i18n?.t("Venezuela") || "Venezuela", value: capitalizeFirstLetter("venezuela") },
		{ label: i18n?.t("Vietnam") || "Vietnam", value: capitalizeFirstLetter("vietnam") },
		{ label: i18n?.t("Yemen") || "Yemen", value: capitalizeFirstLetter("yemen") },
		{ label: i18n?.t("Zambia") || "Zambia", value: capitalizeFirstLetter("zambia") },
		{ label: i18n?.t("Zimbabwe") || "Zimbabwe", value: capitalizeFirstLetter("zimbabwe") },
	];

	return countryList;
};
