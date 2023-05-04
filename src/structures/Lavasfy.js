const { LavasfyClient } = require("lavasfy");
const config = require(`../../config.json`);
class Lavasfy extends LavasfyClient{
    constructor(client){
        super({
            clientID : config.spotifyId,
            clientSecret : config.spotifySecret,
            playlistLoadLimit : 4,
            audioOnlyResults : true,
            autoResolve : true,
            useSpotifyMetadata : true
        },[
            {
                id : "Avon",
                host : "us1.tortoises.studio",
                port : 4100,
                password : "youshallnotpass",
                secure : false
            }
        ]);
    }
}
module.exports = Lavasfy;