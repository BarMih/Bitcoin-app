import Bitcoin from '~/server/models/models'
// import sequelize from "~/db";


const bitcoinF = async () => {

  const bitcoin: any = await $fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
  const bitcoinText_Data = bitcoin.time.updated
  const bitcoinText_USD = bitcoin.bpi.USD.rate
  const bitcoinText_GBP = bitcoin.bpi.GBP.rate
  const bitcoinText_EUR = bitcoin.bpi.EUR.rate

  const duplicate = await Bitcoin.findOne({ where: { time: bitcoinText_Data } })

  if (duplicate) return

  return await Bitcoin.create({
    time: bitcoinText_Data,
    USD: bitcoinText_USD,
    GBP: bitcoinText_GBP,
    EUR: bitcoinText_EUR
  })
}

export default defineEventHandler(async() => {
  return bitcoinF()
})