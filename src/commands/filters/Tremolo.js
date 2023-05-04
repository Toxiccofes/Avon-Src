const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class Tremolo extends AvonCommand{
    get name(){
        return 'tremolo'
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
        let db = player.data.get(`trem`);
       if(!db || db === false || db === undefined)
       {
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                tremolo : {
                    frequency: 4.0,
                    depth: 0.75
                }
            });
            player.data.set(`trem`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled tremolo mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
       }
       if(db === true)
       {
            player.send({
                guildId : message.guild.id,
                op : 'filters'
            });
            player.data.set(`trem`,false);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled tremolo mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
       }
    }
}
module.exports = Tremolo;