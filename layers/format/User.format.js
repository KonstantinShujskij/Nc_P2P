
const admin = (user) => ({
    id: user._id,
    login: user.login,
    telegram: user.telegram
})


module.exports = {
    all: (user) => user,
    admin
}
