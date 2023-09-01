import React, { useState } from "react";
import { accounts } from "./accounts";
import Header from "./components/header/Header";

const App = () => {
	const [newAccounts, setNewAccounts] = useState(accounts);
	const [currentUser, setCurrentUser] = useState(null);

	// sets a currentuser when a user logs in
	const handleLogin = (user) => {
		setCurrentUser(user);
	};

	return (
		<>
			<Header
				accounts={accounts}
				onLogin={handleLogin}
				currentUser={currentUser}
			/>
		</>
	);
};

export default App;
