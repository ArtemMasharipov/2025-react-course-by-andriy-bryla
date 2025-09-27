import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

dotenv.config()

class AuthService {
	generateAccessToken(user) {
		return jwt.sign(
			{ id: user.id, role: user.role, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.ACCESS_EXPIRES }
		)
	}

	generateRefreshToken(user) {
		return jwt.sign(
			{ id: user.id },
			process.env.JWT_REFRESH_SECRET,
			{ expiresIn: process.env.REFRESH_EXPIRES }
		)
	}

	async login(email, password) {
		const user = await UserModel.findByEmail(email)
		
		if (!user) {
			throw new Error('Invalid credentials')
		}

		const isPasswordValid = await UserModel.validatePassword(user, password)
		
		if (!isPasswordValid) {
			throw new Error('Invalid credentials')
		}

		const accessToken = this.generateAccessToken(user)
		const refreshToken = this.generateRefreshToken(user)

		return {
			user: UserModel.stripPassword(user),
			accessToken,
			refreshToken
		}
	}

	async refreshToken(refreshToken) {
		try {
			const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
			
			const user = await UserModel.findById(payload.id)
			
			if (!user) {
				throw new Error('User not found')
			}

			const newAccessToken = this.generateAccessToken(user)

			return {
				user: UserModel.stripPassword(user),
				accessToken: newAccessToken
			}
		} catch (error) {
			throw new Error('Invalid refresh token')
		}
	}

	verifyAccessToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_SECRET)
		} catch (error) {
			throw new Error('Invalid access token')
		}
	}

	extractTokenFromHeader(authHeader) {
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return null
		}
		return authHeader.substring(7)
	}
}

export default new AuthService()
