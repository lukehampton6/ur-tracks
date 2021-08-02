const User = require("./Users");
const Playlist = require("./Playlists");
const Genre = require("./Genres");

User.hasMany(Playlist, {
    foreignKey: 'user_id'
});

User.hasMany(Genre, {
    foreignKey: 'user_id'
});

Playlist.belongsTo(User, {
    foreignKey: 'user_id'
});

Genre.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Playlist, Genre };
