const username = process.env.USERNAMEDB || 'admin';
const password = process.env.PASSWORDDB || '123';
const localhost = process.env.HOSTDB || 'cluster0-8n8vu.mongodb.net/costdb?retryWrites=true';


module.exports = {
    infoConection: {
        url: `mongodb+srv://${username}:${password}@${localhost}`
    }
}