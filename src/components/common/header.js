import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FcMenu } from "react-icons/fc"; // Hamburger icon
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { fetchProfile } from "../../helpers/backend_helpers";
import { useUserDataContext } from "../../context/userDataContext";
import { NavDropdown } from "react-bootstrap";
import { useI18n } from "../../context/i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { GiWallet } from "react-icons/gi";
import { GrUser, GrLogout } from "react-icons/gr";
import { DownOutlined } from "@ant-design/icons"; // Importez l'icône de dropdown

const Header = () => {
	const i18n = useI18n();
	const navigate = useNavigate();
	const location = useLocation();
	const [mobileMenu, setMobileMenu] = useState(false);
	const [userData, setUserData] = useState(null);
	const { setIsLoggedIn, setLanguage } = useUserDataContext();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		setMobileMenu(!mobileMenu);
	};

	// Fetch user profile data
	const getProfile = async () => {
		try {
			const { error, data } = await fetchProfile();
			if (!error) {
				setUserData({ ...data });
			} else {
				setUserData(null);
			}
		} catch (err) {
			console.error("Error fetching profile", err);
			setUserData(null);
		} finally {
			setLoading(false);
		}
	};

	// Logout handler
	const handleLogOut = async () => {
		localStorage.clear()
		setIsLoggedIn(false);
		navigate("/auth/signin");
		window.location.reload();
	};

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			getProfile();
		} else {
			setLoading(false);
		}
	}, []);
	const navItems = [
		userData && {
			_id: 1,
			name: "Home",
			href: "/",
		},
		userData && {
			_id: 2,
			name: "Dashboard",
			href: "/user/dashboard",
		},
		userData && {
			_id: 3,
			name: "My apps",
			href: "/user/my-apps",
		},
		userData && {
			_id: 4,
			name: "Jobs",
			dropdown: true,
			items: [
				{
					key: "testingJobs",
					label: "Testing Jobs",
					href: "/user/testing-jobs",
				},
				{
					key: "assignedJobs",
					label: "Assigned Jobs",
					href: "/user/assigned-jobs",
				},
			],
		},
	].filter(Boolean);

	// Profile dropdown menu
	const profileDropDowns = {
		name: (
			<Avatar
				size={40}
				icon={
					userData?.image ? (
						<img src={userData?.image} alt="User" />
					) : (
						<UserOutlined />
					)
				}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			/>
		),
		icon: false,
		placement: "bottom",
		items: {
			items: [
				{
					key: "1",
					label: (
						<Link
							to="/user/profile"
							className="block px-4 py-2 text-gray-700 text-lg no-underline flex items-center"
						>
							<GrUser className="mr-2" color="#ff6347" />
							{i18n?.t("Profile") || "Profile"}
						</Link>
					),
				},
				{
					key: "2",
					label: (
						<Link
							target="_blank"
							to="/user/wallet"
							className="block px-4 py-2 text-gray-700 text-lg no-underline flex items-center"
						>
							<GiWallet className="mr-2" color="#ff6347" /> {/* Icon */}
							<span>{i18n?.t("Wallet") || "Wallet"}</span>
						</Link>
					),
				},
				{
					key: "3",
					label: (
						<Link
							to="#"
							onClick={handleLogOut}
							className="block px-4 py-2 text-gray-700 text-lg no-underline flex items-center"
						>
							<GrLogout className="mr-2" color="#ff6347" />
							{i18n?.t("Logout") || "Logout"}
						</Link>
					),
				},
			],
		},
	};
	if (loading) {
		return <p className="flex justify-center">Loading menu...</p>;
	}
	return (
		<>
			<div className="shadow-twCustom border-b border-white-300 shadow">
				<div className="container py-[16px]">
					<div className="h-[35px] px-[8px] flex items-center justify-between">
						<div className="flex items-center">
							<Link to="/">
								<div className="flex items-center space-x-3 cursor-pointer">
									<img
										className="max-w-[66px] lg:max-w-[80px] relative z-10"
										src="/appverif-logo.png"
										alt="site logo"
									/>
								</div>
							</Link>
						</div>
						<div className="hidden lg:block mb-1">
							{navItems.map((item) =>
								item?.dropdown ? (
									<Dropdown
										key={item._id}
										menu={{
											items: item.items.map((subItem) => ({
												key: subItem.key,
												label: (
													<Link
														to={subItem.href}
														target="_blank"
														className="text-black text-base no-underline"
													>
														{subItem.label}
													</Link>
												),
											})),
										}}
										trigger={["click"]}
									>
										<span
											className={`${
												location.pathname.startsWith("/user/testing-jobs") ||
												location.pathname.startsWith("/user/assigned-jobs")
													? "text-[#ff6347]"
													: "text-black"
											} md:mr-[8px] lg:mr-[16px] xl:mr-10 text-base lg:text-lg cursor-pointer hover:text-[#ff6347]`}
											onClick={(e) => e.preventDefault()}
										>
											{i18n?.t("Jobs") || "Jobs"} <DownOutlined />
										</span>
									</Dropdown>
								) : (
									<Link
										key={item._id}
										to={item.href}
										className={`${
											location.pathname === item.href
												? "text-[#ff6347]"
												: "text-black"
										} md:mr-[8px] lg:mr-[16px] xl:mr-10 text-base lg:text-lg text-twContent hover:text-[#ff6347] no-underline`}
									>
										<span>{!!i18n && i18n?.t(`${item.name}`)}</span>
									</Link>
								)
							)}
						</div>

						{/* Desktop menu */}
						<div className="hidden lg:flex items-center">
							<NavDropdown
								title={i18n?.languages?.find((l) => l.key === i18n.lang)?.name}
								className="language-selector min-w-[100px] z-50 text-lg"
							>
								{i18n?.languages?.map((l, index) => (
									<NavDropdown.Item
										onClick={() => {
											i18n.changeLang(l.key);
											setLanguage(l.key);
										}}
										key={index}
									>
										{i18n?.t(l.name)}
									</NavDropdown.Item>
								))}
							</NavDropdown>
							<div>
								{userData ? (
									<Dropdown menu={profileDropDowns.items} trigger={["click"]}>
										{profileDropDowns.name}
									</Dropdown>
								) : (
									<div>
										<Link to={"/auth/signin"}>
											<button className="font-Inter md:px-6 px-[16px] md:py-[12px] py-[8px] bg-white text-twSecondary-shade800 border border-twSecondary-shade700  md:text-lg text-sm font-semibold rounded-lg">
												{!!i18n && i18n?.t("Log in")}
											</button>
										</Link>
										<Link to={"/auth/signup"}>
											<button className="font-Inter ml-[12px] px-6 py-[12px]  bg-blue-500  text-white text-lg font-semibold rounded-lg transition-all duration-300 transform hover:!-translate-y-1 hover:shadow-lg">
												{!!i18n && i18n?.t("Register")}
											</button>
										</Link>
									</div>
								)}
							</div>
						</div>

						{/* Mobile menu */}
						<div className="lg:hidden flex justify-center items-center gap-2  relative z-10">
							{userData && (
								<Dropdown menu={profileDropDowns.items} trigger={["click"]}>
									{profileDropDowns.name}
								</Dropdown>
							)}
							<div onClick={toggleMenu}>
								{isMenuOpen ? (
									<span className="rotate-45 text-2xl text-gray-500 font-semibold">
										X
									</span> // Utilisez une autre icône ou transformez l'icône
								) : (
									<FcMenu size={40} />
								)}
							</div>

							{/* <FcMenu size={40} onClick={() => setMobileMenu(!mobileMenu)} /> */}
						</div>
					</div>

					{/* Mobile dropdown */}
					{mobileMenu && (
						<div className="flex flex-col gap-3 lg:hidden pb-4 text-lg text-center">
							{navItems.map((item) =>
								item.dropdown ? (
									<Dropdown
										key={item._id}
										menu={{
											items: item.items.map((subItem) => ({
												key: subItem.key,
												label: (
													<Link
														to={subItem.href}
														className="text-black text-base no-underline"
													>
														{subItem.label}
													</Link>
												),
											})),
										}}
										trigger={["click"]}
									>
										<span
											className={`${
												location.pathname.startsWith("/user/testing-jobs")
													? "text-[#ff6347]"
													: "text-black"
											} md:mr-[8px] lg:mr-[16px] xl:mr-10 text-base lg:text-lg cursor-pointer hover:text-[#ff6347]`}
											onClick={(e) => e.preventDefault()}
										>
											{i18n?.t("Jobs") || "Jobs"} <DownOutlined />
										</span>
									</Dropdown>
								) : (
									<Link
										key={item._id}
										to={item.href}
										className={`${
											location.pathname === item.href
												? "text-[#ff6347]"
												: "text-black"
										} md:mr-[8px] lg:mr-[16px] xl:mr-10 text-base lg:text-lg text-twContent hover:text-[#ff6347] no-underline`}
									>
										<span>{!!i18n && i18n?.t(`${item.name}`)}</span>
									</Link>
								)
							)}

							<NavDropdown
								title={i18n?.languages?.find((l) => l.key === i18n.lang)?.name}
								className="language-selector min-w-[100px] z-50 text-lg"
							>
								{i18n?.languages?.map((l, index) => (
									<NavDropdown.Item
										onClick={() => {
											i18n.changeLang(l.key);
											setLanguage(l.key);
										}}
										key={index}
									>
										{i18n?.t(l.name)}
									</NavDropdown.Item>
								))}
							</NavDropdown>
							{!userData && (
								<div className="flex flex-col gap-3">
									<Link
										to="/auth/signin"
										className="font-Inter md:px-6 px-[16px] md:py-[12px] py-[8px] bg-white text-twSecondary-shade800 border border-twSecondary-shade700  md:text-lg text-sm font-semibold rounded-lg no-underline"
									>
										{i18n?.t("Log In") || "Log In"}
									</Link>
									<Link
										to="/auth/signup"
										className="font-Inter ml-[12px] md:px-6 px-[16px] md:py-[12px] py-[8px] bg-blue-500 text-white md:text-lg text-sm font-semibold rounded-lg no-underline"
									>
										{i18n?.t("Register") || "Register"}
									</Link>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
