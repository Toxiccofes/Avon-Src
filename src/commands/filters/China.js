const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class China extends AvonCommand{
    get name(){
        return 'china'
    }
    get aliases(){
        return null;
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
        return 'filters'
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        let db = player.data.get(`china`);
        if(!db || db === undefined || db === false){
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 0.75,
                    pitch : 1.25,
                    rate : 1.25
                }
            });
            player.data.set(`china`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled China mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
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
            player.data.set(`china`,false);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled China mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}
module.exports = China;