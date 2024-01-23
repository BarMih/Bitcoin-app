import sequelize from "~/db";
const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
        .then(() => console.log('Connected.--------------------------------'))
  } catch (e) {
    console.log(e)
  }
}

export default defineEventHandler(async () => {
  return start()
})
