export const formatCardNumber = (number) => {
    if(!number) { return "0000 0000 0000 0000" }
    return number.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
}

export const formatTime = (milliseconds) => {
    if(!milliseconds) return null

    return (new Date(parseInt(milliseconds))).toLocaleString("uk-UA", {timeZone: "Europe/Kiev"}).replace(',', '')
}

export const getDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}


export const getTimestamp = (str) => {
    try { 
        const [date, time] = str.split(' ')
        const [D, M, Y] = date.split('.')
        const [h, m] = time? time.split(':') : [0, 0]

        if(D === undefined || M === undefined || Y === undefined || h === undefined || m === undefined) { return null }

        const timedate = (new Date(Y, M - 1, D, h, m))
        const timestamp = timedate.getTime()

        const dUa = (new Date(Date.parse(timedate))).toLocaleString("uk-UA", {timeZone: "Europe/Kiev"})

        const [Udate, Utime] = dUa.split(', ')
        const [UD, UM, UY] = Udate.split('.')
        const [Uh, Um, Us] = Utime.split(':')

        const milliseconds = (new Date(UY, UM - 1, UD, Uh, Um)).getTime()
        const dt = milliseconds - timestamp

        return timestamp - dt
    } 
    catch(e) { return null }
}
