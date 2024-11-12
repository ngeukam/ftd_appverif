import AdminDashboardCards from "../../components/admin/dashboard/cards";
import { GiMoneyStack } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
import AdminLayout from "../../layouts/admin";
import Withdraw from "../../components/admin/dashboard/withdraw";
import RecentRequest from "../../components/admin/dashboard/recentRequest";
import { useI18n } from "../../context/i18n";
import { TbUserCheck, TbCheckupList } from "react-icons/tb";
import { FaBars } from "react-icons/fa";

const Admin = () => {
	const i18n = useI18n();

	return (
		<AdminLayout>
			<section className="font-Poppins !text-twContent px-2">
				{/* <h1 className="font-medium text-[40px]">
					{i18n && i18n.t("Dashboard")}
				</h1> */}
				<div className="my-[40px] grid lg:grid-cols-3 md:grid-cols-2 gap-[33px]">
					<AdminDashboardCards
						stat={0}
						title={i18n && i18n.t("Verified Testers")}
						icon={<TbUserCheck size={70} />}
					/>
					<AdminDashboardCards
						stat={0}
						title={i18n && i18n.t("Verified Users")}
						icon={<FiUser size={70} />}
					/>
					<AdminDashboardCards
						stat={`$`+0}
						title={i18n && i18n.t("Total Commission")}
						icon={<GiMoneyStack size={70} />}
					/>
					<AdminDashboardCards
						stat={0}
						title={i18n && i18n.t("Projects")}
						icon={<FaBars size={70} />}
					/>
					<AdminDashboardCards
						stat={0}
						title={i18n && i18n.t("Completed Tests")}
						icon={<TbCheckupList size={70} />}
					/>
				</div>
				<div className="grid lg:grid-cols-10 gap-5">
					{/* <div className="lg:col-span-7">
                    <TotalEarningsChart />
                </div> */}
					{/* <div className="lg:col-span-3">
						<TodayTripChart />
					</div> */}
				</div>
				<div className="mt-10 lg:grid lg:grid-cols-2 gap-[10px]">
					<div>
						<Withdraw />
					</div>
					<div>
						<RecentRequest />
					</div>
				</div>
			</section>
		</AdminLayout>
	);
};
export default Admin;
