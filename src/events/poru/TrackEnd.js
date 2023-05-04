const AvonClientEvent = require("../../structures/Eventhandler");

class TrackEnd extends AvonClientEvent{
    get name(){
        return 'playerEnd';
    }
    async run(player){
        try{
            player.data.get('music').delete()
        } catch(e)
        {
            
        }
    }
}
module.exports = TrackEnd;