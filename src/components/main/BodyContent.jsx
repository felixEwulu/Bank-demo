import { useEffect, useState } from "react";
import Movements from "./Movements";
import Transfer from "./Transfer";
import Loan from "./Loan";

const BodyContent = ({ currentUser, accounts, onTransfer }) => {
	const [balance, setBalance] = useState(0);

	const currentDate = new Date();
	const day = String(currentDate.getDate()).padStart(2, "0");
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const year = currentDate.getFullYear();
	const formattedDate = `${day}/${month}/${year}`;

	// generating random date in the movement array
	const getRandomDate = (startDate, endDate) => {
		const startTimestamp = startDate.getTime();
		const endTimestamp = endDate.getTime();

		const randomTimestamp =
			startTimestamp + Math.random() * (endTimestamp - startTimestamp);

		const randomDate = new Date(randomTimestamp);

		const day = String(randomDate.getDate()).padStart(2, "0");
		const month = String(randomDate.getMonth() + 1).padStart(2, "0");
		const year = randomDate.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const startDate = new Date("2023-01-01");
	const endDate = new Date();

	useEffect(() => {
		const calcBalance = (acc) => {
			const balance = acc?.movements?.reduce((acc, cur) => {
				return acc + cur;
			});
			setBalance(balance);
		};
		calcBalance(currentUser);
	}, [currentUser, balance]);

	// format figures
	const formatMonetaryValue = (value) => {
		return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return (
		<main className="app">
			<div className="balance">
				<div>
					<p className="balance__label">Current balance</p>
					<p className="balance__date">{formattedDate}</p>
				</div>
				<p className="balance__value">{formatMonetaryValue(balance)}€</p>
			</div>
			{/* movements */}
			<div className="movements">
				<div>
					{currentUser?.movements.map((movement, i) => {
						const randomDate = getRandomDate(startDate, endDate);
						return movement > 0 ? (
							<div className="movements__row" key={i}>
								<div className="movements__type movements__type--deposit">
									{i + 1} deposit
								</div>
								<div className="movements__date">{randomDate}</div>
								<div className="movements__value">{formatMonetaryValue(movement)}€</div>
							</div>
						) : (
							<div className="movements__row" key={i}>
								<div className="movements__type movements__type--withdrawal">
									{i + 1} withdrawal
								</div>
								<div className="movements__date">{randomDate}</div>

								<div className="movements__value">{formatMonetaryValue(movement)}€</div>
							</div>
						);
					})}
				</div>
			</div>

			<>
				<Transfer
					currentUser={currentUser}
					accounts={accounts}
					onTransfer={onTransfer}
					balance={balance}
				/>
				<Loan />
				{/* <CloseAccount /> */}
			</>

			{/* <Summary /> */}
		</main>
	);
};

export default BodyContent;
