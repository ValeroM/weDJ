module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define("song", {
    song_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Song code is already in use!'
      }
    }
  });
  Song.associate = function (models) {
    models.Song.belongsToMany(models.Lobby, { through: models.Queue });
  };
  return Song;
};
