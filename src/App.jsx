import { useState } from "react";
import Header from "./components/header/Header";
import BodyContent from "./components/main/bodyContent";

const accounts = [
	{
		owner: "Felix",
		movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
		interestRate: 1.2,
		pin: 1111,
	},
	{
		owner: "Justin",
		movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
		interestRate: 1.5,
		pin: 2222,
	},
	{
		owner: "Steve",
		movements: [200, -200, 340, -300, -20, 50, 400, -460],
		interestRate: 0.7,
		pin: 3333,
	},
	{
		owner: "Jonas",
		movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
		interestRate: 1.2, // %
		pin: 1111,
	},
];

function App() {
	const [newAccounts, setNewAccounts] = useState(accounts);
	const [currentUser, setCurrentUser] = useState(null);

	// useEffect(() => {
	// 	const createUsernames = (accs) => {
	// 		const newAccs = accs.map((acc) => ({
	// 			...acc,
	// 			username: acc.owner
	// 				.toLowerCase()
	// 				.split(" ")
	// 				.map((name) => name[0])
	// 				.join(""),
	// 		}));

	// 		setNewAccounts(newAccs);
	// 	};
	// 	createUsernames(accounts);
	// }, [currentUser]);

	console.log(newAccounts);
	const handleLogin = (user) => {
		setCurrentUser(user);
		console.log(user);
	};

	const handleTransfer = (value, receiverAcc) => {
		// subtract the amount from the user's account
		setCurrentUser((currUser) => ({
			...currUser,
			movements: [...currUser.movements, -value],
		}));

		// credit the receiver's account
		setNewAccounts((accs) => {
			const newAccs = accs.map((acc) =>
				acc.owner === receiverAcc.owner
					? { ...acc, movements: [...acc.movements, value] }
					: acc
			);
			return newAccs;
		});
	};

	const handleLoan = (value) => {
		setCurrentUser((currUser) => ({
			...currUser,
			movements: [...currUser.movements, value],
		}));
	};

	return (
		<>
			<Header
				accounts={newAccounts}
				currentUser={currentUser}
				onLogin={handleLogin}
			/>

			{currentUser && (
				<BodyContent
					currentUser={currentUser}
					accounts={newAccounts}
					onTransfer={handleTransfer}
					onLoan={handleLoan}
				/>
			)}
		</>
	);
}

export default App;
