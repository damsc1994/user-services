const username = process.env.USERNAMEDB || 'admin';
const password = process.env.PASSWORDDB || '123';
const localhost = process.env.HOSTDB || 'localhost:27017/costdb';


module.exports = {
    infoConection: {
        url: `mongodb+srv://${username}:${password}@${localhost}`
    }
}