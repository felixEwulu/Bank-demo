import React, { useState } from "react";

const Transfer = ({ accounts, onTransfer, currentUser, balance }) => {
	const [receiverAcc, setReceiverAcc] = useState("");
	const [amount, setAmount] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!receiverAcc || !amount || amount < 0) return;

		const findReceiver = accounts?.find((acc) => acc.owner === receiverAcc);

		if (
			findReceiver &&
			amount > 0 &&
			balance >= amount &&
			findReceiver.owner !== currentUser?.owner
		) {
			onTransfer(amount, findReceiver);
		}
		setReceiverAcc("");
		setAmount("");
	};

	return (
		<div className="operation operation--transfer">
			<h2>Transfer money</h2>
			<form onSubmit={handleSubmit} className="form form--transfer">
				<input
					value={receiverAcc}
					onChange={(e) => setReceiverAcc(e.target.value)}
					type="text"
					className="form__input form__input--to"
				/>
				<input
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					type="number"
					className="form__input form__input--amount"
				/>
				<button type="submit" className="form__btn form__btn--transfer">
					&rarr;
				</button>
				<label className="form__label">Transfer to</label>
				<label className="form__label">Amount</label>
			</form>
		</div>
	);
};

export default Transfer;
