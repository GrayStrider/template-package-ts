import {Middleware} from 'koa'
import {sig} from '@/utils'

export const redirect: Middleware = async (ctx, next) => {
	
	await next()
	if (ctx.status === 404) ctx.redirect('/')
	
	
}
export const errorHandler: Middleware = async (ctx, next) => {
	
	try {
		
		await next()
		
	}
	catch (err) {
		
		ctx.status = err.status ?? 500
		ctx.body = err.message
		sig.error('Error in Koa handler')
		ctx.app.emit('error', err, ctx)
		
	}
	
}
