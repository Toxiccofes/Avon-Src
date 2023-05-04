const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class Slowmode extends AvonCommand{
    get name(){
        return 'slowmode'
    }
    get aliases(){
        return null;
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get cat(){
        return 'filters'
    }
    get vote(){
        return true;
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
       let db = player.data.get(`slow`);
       if(!db || db === false || db === undefined)
       {
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 0.5,
                    pitch : 1.0,
                    rate : 0.8
                }
            });
            player.data.set(`slow`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled Slowmode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
       }
       if(db === true)
       {
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            player.data.set(`slow`,false);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Slowmode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
       }
    }
}
module.exports = Slowmode;