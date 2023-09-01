import React, { useState } from "react";

const Loan = ({ onLoan, currentUser }) => {
	const [amountToLoan, setAmountToLoan] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!amountToLoan) return;

		if (
			amountToLoan > 0 &&
			currentUser.movements.some((mov) => mov >= amountToLoan * 0.1)
		) {
			onLoan(amountToLoan);
			setAmountToLoan("");
		}
	};

	return (
		<div className="operation operation--loan">
			<h2>Request loan</h2>
			<form onSubmit={handleSubmit} className="form form--loan">
				<input
					value={amountToLoan}
					onChange={(e) => setAmountToLoan(Number(e.target.value))}
					type="number"
					className="form__input form__input--loan-amount"
				/>
				<button className="form__btn form__btn--loan">&rarr;</button>
				<label className="form__label form__label--loan">Amount</label>
			</form>
		</div>
	);
};

export default Loan;
