const welcome = async (req, res) => {
    res.respond({ message: "Slim op sollicitatie API" })
}

module.exports = {
    welcome
}