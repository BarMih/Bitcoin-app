import Bitcoin from '~/server/models/models'



const getBitcoins = async () => {
  return await Bitcoin.findAll()
}

export default defineEventHandler(async () => {
  return getBitcoins()
})