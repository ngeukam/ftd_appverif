import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FcMenu } from "react-icons/fc"; // Hamburger icon
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { fetchProfile } from "../../../helpers/backend_helpers";
import { useUserDataContext } from "../../../context/userDataContext";
import { NavDropdown } from "react-bootstrap";
import { useI18n } from "../../../context/i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { GrUser, GrLogout } from "react-icons/gr";
import { DownOutlined } from "@ant-design/icons"; // Importez l'icône de dropdown
import { FaBars, FaGlobe, FaHammer } from "react-icons/fa";
import {
	BiDollarCircle,
	BiUserCircle,
	BiStats,
} from "react-icons/bi";
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
		localStorage.removeItem("authToken");
		localStorage.removeItem("authRole");
		localStorage.clear()
		setIsLoggedIn(false);
		navigate("/auth/signin");
	};

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			getProfile();
		}else{
			setLoading(false);
		}
	}, []);
	const navItems = [
		userData && {
			_id: 1,
			name: "Dashboard",
			href: "/admin",
			icon: <BiStats />,
		},
		userData && {
			_id: 2,
			name: "Projects",
			href:"/admin/projects",
			icon: <FaBars />,
			dropdown: true,
			items: [
				{
					key: "projects_list",
					label: "Projects list",
					href: "/admin/projects/list",
				},
				{
					key: "rate",
					label: "Commission rate",
					href: "/admin/projects/rate",
				},
			],
		},
		userData && {
			_id: 3,
			name: "Withdrawals",
			href:"/admin/withdraw/list",
			icon: <BiDollarCircle />,
		},
		userData && {
			_id: 4,
			name: "Users",
			icon: <BiUserCircle />,
			href:"/admin/users",
			dropdown: true,
			items: [
				{
					key: "users_list",
					label: "Users list",
					href: "/admin/users/list",
				},
				{
					key: "employees_list",
					label: "Employees list",
					href: "#",
				},
			],
		},
		userData && {
			_id: 5,
			name: "Settings",
			icon: <FaHammer />,
			href:"/admin/settings",
			dropdown: true,
			items: [
				{
					key: "settings_translation",
					label: "Translations",
					href: "/admin/settings/translation",
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
							to="/"
							className="block px-4 py-2 text-gray-700 text-lg no-underline flex items-center"
						>
							<FaGlobe className="mr-2" color="#ff6347" />
							{i18n?.t("Frontend") || "Frontend"}
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
					<div className="h-[40px] px-[8px] flex items-center justify-between">
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
						<div className="flex justify-around p-[10px] hidden md:flex">
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
														className={`${
															location.pathname === subItem.href
																? "text-[#ff6347]" // Couleur pour l'élément de sous-menu actif
																: "text-black"
														} text-base lg:text-xm	 no-underline`}
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
												location.pathname.startsWith(item.href)
													? "text-[#ff6347]" // Couleur du menu principal actif ou d'un sous-menu actif
													: "text-black"
											} md:mr-[8px] lg:mr-[16px] xl:mr-10 text-base lg:text-xm cursor-pointer flex items-center hover:text-[#ff6347]`}
											onClick={(e) => e.preventDefault()}
										>
											{item.icon}
											{i18n?.t(item.name) || item.name} <DownOutlined />
										</span>
									</Dropdown>
								) : (
									<Link
										key={item._id}
										to={item.href}
										className={`${
											location.pathname === item.href
												? "text-[#ff6347]" // Si le lien du menu principal est actif
												: "text-black"
										} md:mr-[8px] lg:mr-[16px] xl:mr-5 text-base lg:text-xm text-twContent hover:text-[#ff6347] no-underline`}
									>
										<span className="mx-[10px] flex items-center">
											{item.icon}
											{!!i18n && i18n?.t(`${item.name}`)}
										</span>
									</Link>
								)
							)}
						</div>

						{/* Desktop menu */}
						<div className="hidden lg:flex items-center">
							<Link
								to="/"
								target="_blank"
								title="Go to Frontend"
								className="mr-2"
							>
								<FaGlobe />
							</Link>
							<NavDropdown
								title={i18n?.languages?.find((l) => l.key === i18n.lang)?.name}
								className="language-selector min-w-[100px] z-50 text-xm"
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
