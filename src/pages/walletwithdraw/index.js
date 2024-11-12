import React from "react";
import Wallet from "../../components/Wallet";
import Withdraw from "../../components/Withdraw";
import { RootLayout } from "../../layouts/layout";
const WalletWithdrawPage = () => {
	return (
		<div>
			<RootLayout>
				<div className="flex flex-col md:flex-row justify-between space-x-4">
					<div className="flex-1">
						<Wallet balance={10000} />
					</div>
					<div className="flex-1">
						<Withdraw />
					</div>
				</div>
			</RootLayout>
		</div>
	);
};

export default WalletWithdrawPage;
