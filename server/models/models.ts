import sequelize from "~/db";
import {DataTypes} from "sequelize";


export default sequelize.define('bitcoin', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
  time: {type: DataTypes.STRING},
  USD: {type: DataTypes.STRING},
  GBP: {type: DataTypes.STRING},
  EUR: {type: DataTypes.STRING}
})