const username = process.env.USERNAME || 'admin';
const password = process.env.PASSWORD || '123';
const localhost = process.env.HOST || 'localhost:27017/costdb';


module.exports = {
    infoConection: {
        url: `mongodb+srv://${username}:${password}@${localhost}`
    }
}