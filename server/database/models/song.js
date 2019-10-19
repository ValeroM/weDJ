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
    songName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    songArtist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    songAlbum: {
      type: DataTypes.STRING,
      allowNull: false
    },
    songLikes: {
      type: DataTypes.INTEGER
    },
    songDislikes: {
      type: DataTypes.INTEGER
    }
  });
  return Song;
};
