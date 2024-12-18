import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { useColorMode } from "@chakra-ui/react";  // Import useColorMode to manage theme toggle

const DashboardPage = () => {
	const { user, logout } = useAuthStore();
	const { colorMode } = useColorMode(); // Access colorMode from Chakra UI

	const handleLogout = () => {
		logout();
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className={`max-w-md w-full mx-auto p-8 rounded-xl shadow-2xl border border-gray-800 transition-all duration-300 ease-in-out ${
				colorMode === "light" ? "bg-gray-100" : "bg-gray-900"
			}`}
			style={{ marginTop: '100px' }}
		>
			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
				Dashboard
			</h2>

			<div className='space-y-6'>
				{/* Profile Information */}
				<motion.div
					className={`p-4 rounded-lg border transition-all duration-300 ease-in-out ${
						colorMode === "light" ? "bg-gray-200 border-gray-300 text-gray-900" : "bg-gray-800 border-gray-700 text-gray-100"
					}`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
					<p className='${
						colorMode === "light" ? "bg-gray-200 border-gray-300 text-gray-900" : "bg-gray-800 border-gray-700 text-gray-100"
					}'><span className='font-bold'>Name: </span>
						{user.name}</p>
					<p className='${
						colorMode === "light" ? "bg-gray-200 border-gray-300 text-gray-900" : "bg-gray-800 border-gray-700 text-gray-100"
					}'><span className='font-bold'>Email: </span>
						{user.email}</p>
				</motion.div>

				{/* Account Activity */}
				<motion.div
					className={`p-4 rounded-lg border transition-all duration-300 ease-in-out ${
						colorMode === "light" ? "bg-gray-200 border-gray-300 text-gray-900" : "bg-gray-800 border-gray-700 text-gray-100"
					}`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
					<p className='${
						colorMode === "light" ? "bg-gray-200 border-gray-300 text-gray-900" : "bg-gray-800 border-gray-700 text-gray-100"
					}'>
						<span className='font-bold'>Joined: </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className='${
						colorMode === "light" ? "bg-gray-200 border-gray-300 text-gray-900" : "bg-gray-800 border-gray-700 text-gray-100"
					}'>
						<span className='font-bold'>Last Login: </span>
						{formatDate(user.lastLogin)}
					</p>
				</motion.div>
			</div>

			{/* Logout Button */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className='mt-4'
			>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className={`w-full py-3 px-4 font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 ease-in-out ${
						colorMode === "light"
							? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
							: "bg-gradient-to-r from-green-600 to-emerald-700 text-gray-200 hover:from-green-700 hover:to-emerald-800"
					}`}
				>
					Logout
				</motion.button>
			</motion.div>
		</motion.div>
	);
};

export default DashboardPage;
