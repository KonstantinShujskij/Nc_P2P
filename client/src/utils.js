export const formatCardNumber = (number) => {
    if(!number) { return "0000 0000 0000 0000" }
    return number.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
}

export const formatTime = (milliseconds) => {
    if(!milliseconds) return null

    return (new Date(parseInt(milliseconds))).toLocaleString("uk-UA", {timeZone: "Europe/Kiev"}).replace(',', '')
}

