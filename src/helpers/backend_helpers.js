import { del, get, post } from "./api_helper";

//Login
export const postSocialLogin = (data) => post("/user/social-login", data);
export const verifyByEmail = (data) => get("/user/verify-by-email", data);
export const postUserProfileByToken = (data) =>
	post("/user/update-by-token", data);
export const postLogin = (data) => post("/user/login", data);
export const checkEmailExist = (data) => post("/user/check-email", data);
export const changePassword = (data) => post("/user/change-password", data);

// Registration
export const userRegistration = (data) => post("/user/registration", data);
export const confirmEmail = (data) => post("/user/confirm-email", data);

//User
export const getUserDetailsById = (data) => get("/user/details", data);
export const getProfile = (data) => get("/user/profile", data);
export const fetchProfile = (data) => get("/user/verify", data);
export const fetchAllUsersWithWallet = (data) => get("/user/all-users", data); //admin
export const fetchUserWithWallet = (data) =>
	get("/user/details-with-wallet", data); //admin

//Language
export const fetchLanguages = (data) => get("/settings/languages", data);
export const fetchAllLanguages = (data) => get("/settings/all-languages", data);
export const postLanguage = (data) => post("/settings/language", data);
export const delLanguage = (data) => del("/settings/language", data);
export const fetchTranslations = (data) =>
	get("/settings/language/translations", data);
export const postTranslations = (data) =>
	post("/settings/language/translations", data);

//Project
export const fetchListPreferences = (data) =>
	get("/project/list-preferences", data);
export const fetchAvailableTesters = (data) =>
	post("/project/available-testers", data);
export const createUserAppPayWithCash = (data) =>
	post("/project/create-project-pay-cash", data);
export const createUserAppPayWithWallet = (data) =>
	post("/project/create-project-pay-wallet", data);
export const listProjectsByTester = (data) =>
	get("/project/tester-projects-list", data);
export const testerDeclineProject = (data) =>
	post("/project/decline-project", data);
export const testerAcceptProject = (data) =>
	post("/project/accept-project", data);
export const getTesterAcceptedProjects = (data) =>
	get("/project/tester-projects-accepted", data);
export const countTesterAcceptedProjects = (data) =>
	get("/project/count-tester-projects-accepted", data);
export const countUserProjects = (data) =>
	get("/project/count-user-projects", data);
export const getAllUserProjects = (data) => get("/project/user-projects", data);
export const countTesterAssignedProject = (data) =>
	get("/project/count-tester-assigned-project", data);
export const deleProject = (data) => post("/project/delete-project", data);
export const fetchCurrentCommission = (data) =>
	get("/project/current-rate", data);

export const fetchProjectList = (data) => get("/project/all-projects", data); //Admin
export const fetchProject = (data) => get("/project/details", data); //Admin
export const validateCash = (data) => post("/project/cash-validation", data); //Admin
export const updateCommissionRate = (data) =>
	post("/project/update-rate", data); //Admin
export const completeTest = (data) => post("/project/complete-test", data); //Admin
export const changeSelectedTester = (data) =>
	post("/project/change-selected-tester", data); //Admin
export const changeAccepteTester = (data) =>
	post("/project/change-accepted-tester", data); //Admin
export const addTester = (data) => post("/project/add-tester", data); //Admin

//Payment
export const getPaymentDetails = (data) =>
	get("/payment/payment-details/", data);

//Wallet
export const getWalletBalance = (data) => get("/wallet/balance", data);
export const addFunds = (data) => post("/wallet/recharge", data); //Admin
//Withdraw
export const withdrawRequest = (data) => post("/withdraw/request", data);
export const getWithdrawals = (data) => get("/withdraw/retrieve", data);
export const fetchWithdrawRequest = (data) =>
	get("/withdraw/retrieve-all", data); //Admin
export const delWithdrawRequest = (data) => post("/withdraw/delete", data); //Admin
export const updateWithdrawRequest = (data) => post("/withdraw/update", data); //Admin
export const approveWithdrawRequest = (data) =>
	post("/withdraw/approved", data); //Admin

// aws file upload
export const postFileToAws = (data) => post("/file/aws", data);
