const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class Nightcore extends AvonCommand{
    get name(){
        return 'nightcore'
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
        let data = player.data.get(`night`)
        if(!data || data == false || data == undefined)
        {
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.1,
                    pitch : 1.125,
                    rate : 1.05
                }
            });
            player.data.set(`night`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled nightcore mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        if(data == true){
            player.data.set(`night`,false);
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Nightcore mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}
module.exports = Nightcore;