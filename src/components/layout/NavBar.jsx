import { NavLink, Link } from "react-router-dom"
import Logout from "../auth/Logout"
import React, { useContext, useState, useRef, useEffect } from "react";

const Navbar = () => {
	const [showAccount, setShowAccount] = useState(false)
	const dropdownRef = useRef(null);

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowAccount(false); 
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to={"/"}>
					Online Quiz App
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ml-auto">
						{isLoggedIn &&
							(userRole === "ROLE_ADMIN" ||
								userRole === "ROLE_USER,ROLE_ADMIN") && (
								<li className="nav-item">
									<NavLink
										className="nav-link"
										aria-current="page"
										to={"/admin"}
									>
										Admin
									</NavLink>
								</li>
							)}
						{isLoggedIn &&
							(userRole === "ROLE_USER" ||
								userRole === "ROLE_ADMIN") && (
								<li className="nav-item">
									<NavLink className="nav-link" to={"/quiz-stepper"}>
										Take Quiz
									</NavLink>
								</li>
							)}
					</ul>



					<ul className="d-flex navbar-nav">
						<li className="nav-item dropdown" ref={dropdownRef}>
							<a
								className={`nav-link dropdown-toggle ${showAccount ? "show" : ""
									}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}
							>
								{" "}
								Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown"
							>
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>


				</div>
			</div>
		</nav>
	)
}

export default Navbar
