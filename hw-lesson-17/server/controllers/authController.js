import AuthService from '../services/authService.js'

class AuthController {
	async login(req, res) {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				return res.status(400).json({ 
					error: 'Email та пароль обов\'язкові' 
				})
			}

			const result = await AuthService.login(email, password)

			res.cookie('refreshToken', result.refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 7 * 24 * 60 * 60 * 1000
			})
			res.json({
				user: result.user,
				accessToken: result.accessToken
			})
		} catch (error) {
			res.status(401).json({ error: error.message })
		}
	}

	async refresh(req, res) {
		try {
			const refreshToken = req.cookies.refreshToken

			if (!refreshToken) {
				return res.status(401).json({ error: 'Refresh token відсутній' })
			}

			const result = await AuthService.refreshToken(refreshToken)

			res.json({
				user: result.user,
				accessToken: result.accessToken
			})
		} catch (error) {
			res.status(403).json({ error: error.message })
		}
	}

	async logout(req, res) {
		try {
			res.clearCookie('refreshToken')
			res.status(204).send()
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async me(req, res) {
		try {
			res.json({ user: req.user })
		} catch (error) {
			res.status(500).json({ error: 'Внутрішня помилка сервера' })
		}
	}

	async checkAuth(req, res) {
		try {
			const authHeader = req.headers.authorization
			const token = AuthService.extractTokenFromHeader(authHeader)

			if (!token) {
				return res.status(401).json({ authenticated: false })
			}

			const payload = AuthService.verifyAccessToken(token)
			res.json({ 
				authenticated: true, 
				user: {
					id: payload.id,
					email: payload.email,
					role: payload.role
				}
			})
		} catch (error) {
			res.status(401).json({ authenticated: false })
		}
	}
}

export default new AuthController()
