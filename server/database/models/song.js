module.exports = (sequelize, DataTypes) => 
{
  const Song = sequelize.define("song", {
    /*
    As per some stack overflow posts, it looks like the id is provided by sequelize but I am not sure
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      }
    */

    // Remove artist and album attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false
    },

    rating: {
      // Downvote: -1 Upvote: +1
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return Song;
};
