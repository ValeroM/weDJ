module.exports = (sequelize, DataTypes) => {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER
    },
    dislikes: {
      type: DataTypes.INTEGER
    }
  });
  return Song;
};
