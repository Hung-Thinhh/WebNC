
const redis = require('redis')

let cliend = {}, statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR:'error',
}
const handleEventConnection = ({
    connectionRedis
}) => {
    connectionRedis.on(statusConnectRedis.CONNECT, () => {
        console.log('Connect Redis : connected');
    })
    connectionRedis.on(statusConnectRedis.END, () => {
        console.log('Connect Redis : end');
    })
    connectionRedis.on(statusConnectRedis.RECONNECT, () => {
        console.log('Connect Redis : reconnecting');
    })
    connectionRedis.on(statusConnectRedis.CONNECTERROR, (err) => {
        console.log('Connect Redis : error ',err);
    })
}
const initRedis = () => {
    console.log('hahahah');
    
    const instanceRedis = redis.createClient()
    cliend.instanceConnect = instanceRedis
    handleEventConnection({
        connectionRedis:instanceRedis
    })
}

const getConnectRedis = () => cliend

const closeConnectRedis = () => {

}

module.exports = {
    initRedis,
    getConnectRedis,
    closeConnectRedis
}