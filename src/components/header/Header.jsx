import { useState } from "react";

const Header = ({ accounts, onLogin, currentUser }) => {
	console.log(currentUser);

	const [username, setUsername] = useState("");
	const [pin, setPin] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!username || !pin) return;

		const currentAccount = accounts?.find(
			(acc) => acc.owner === username && acc.pin === pin
		);

		onLogin(currentAccount);
		setUsername("");
		setPin("");
	};

	return (
		<nav>
			<p className="welcome">
				{currentUser
					? `Welcome back ${currentUser?.owner.split(" ")[0]}`
					: "Log in to get started"}
			</p>

			<img src="/logo.png" alt="logo" className="logo" />

			<form className="login" onSubmit={handleSubmit}>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="user"
					className="login__input login__input--user"
				/>

				<input
					value={pin}
					onChange={(e) => setPin(Number(e.target.value))}
					type="password"
					placeholder="PIN"
					maxLength="4"
					className="login__input login__input--pin"
				/>
				<button className="login__btn">&rarr;</button>
			</form>
		</nav>
	);
};

export default Header;
