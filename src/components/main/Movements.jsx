import React from "react";

const Movements = ({ currentUser }) => {
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

	const formattedMonetaryValue = (value) => {
		return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return (
		<div className="movements">
			{currentUser?.movements?.map((movement, i) => {
				const randomDate = getRandomDate(startDate, endDate);
				return movement > 0 ? (
					<div className="movements__row" key={i}>
						<div className="movements__type movements__type--deposit">
							{i + 1} deposit
						</div>
						<div className="movements__date">{randomDate}</div>
						<div className="movements__value">
							{formattedMonetaryValue(movement)}€
						</div>
					</div>
				) : (
					<div className="movements__row" key={i}>
						<div className="movements__type movements__type--withdrawal">
							{i + 1} withdrawal
						</div>
						<div className="movements__date">{randomDate}</div>

						<div className="movements__value">
							{formattedMonetaryValue(movement)}€
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Movements;
