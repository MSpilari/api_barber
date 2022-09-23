const hoursToMinutes = (hours: string) => {
    const [hour, min] = hours.split(':').map((number) => Number(number))

    const totalMinutes = hour * 60 + min

    return totalMinutes
}

export { hoursToMinutes }
