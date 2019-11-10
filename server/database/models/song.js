module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define("song", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Song.associate = function(models) {
    models.Song.belongsToMany(models.Lobby, { through: models.Queue });
  };
  return Song;
};
