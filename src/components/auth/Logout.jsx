import React, { useContext, useState } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const [showAccount, setShowAccount] = useState(false)

	const handleLogout = () => {
		auth.handleLogout()
		setShowAccount(false);
		navigate("/", { state: { message: " You have been logged out!" } })
		const userConfirmed = window.confirm("You have been logged out!")
		if (userConfirmed) {
			window.location.reload();
		}
	}

	return (
		<>
			<li>
				<Link className="dropdown-item" to={"/profile"}>
					Profile
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="dropdown-item" onClick={handleLogout}>
				Logout
			</button>
		</>
	)
}

export default Logout
