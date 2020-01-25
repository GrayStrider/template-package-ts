import * as http from 'http'
import {Connection, createConnection, getConnection} from 'typeorm'
import main from '@/server'
import {ORMConfig, GQL_URL} from '@config'
import {sig, isUp} from '@/utils'

export default async function setupTests () {
	
	let conn: Connection
	let server: http.Server | null
	jest.setTimeout(30000)
	
	/**
	 * Connect to running server with test_runner
	 * If no server running, start the server and then connect
	 */
	if (await isUp(GQL_URL)) {
		
		sig.await('server\'s up, connecting to database')
		conn = await createConnection(ORMConfig)
		server = null
		
	}
	else {
		
		sig.await(`${GQL_URL} is down, starting server`)
		server = await main()
		sig.await('connecting to database')
		conn = getConnection()
		
	}
	sig.warn('resetting database')
	await conn.synchronize(true)
	return {conn, server}
	
}
