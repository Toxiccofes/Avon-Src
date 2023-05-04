const AvonCommand = require("../../structures/avonCommand");

class Chipmunk extends AvonCommand{
    get name(){
        return 'chipmunk';
    }
    get vote(){
        return true;
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get cat(){
        return 'filters';
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        let data = player.data.get(`chip`)
        if(!data || data == false || data == undefined)
        {
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.05,
                    pitch : 1.35,
                    rate : 1.25
                }
            });
            player.data.set(`chip`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled Chipmunk mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        if(data == true){
            player.data.set(`chip`,false);
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Chipmunk mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}
module.exports = Chipmunk;