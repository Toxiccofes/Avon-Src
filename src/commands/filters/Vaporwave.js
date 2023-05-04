const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class Vaporwave extends AvonCommand{
    get name(){
        return 'vaporwave'
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
        let data = player.data.get(`vapor`);
        if(!data || data === false || data === undefined)
        {
            player.send({
                op: 'filters',
                guildId: message.guild.id,
                equalizer: [
                    { band: 0, gain: 0 },
                    { band: 1, gain: 0 },
                    { band: 2, gain: 0 },
                    { band: 3, gain: 0 },
                    { band: 4, gain: 0 },
                    { band: 5, gain: 0 },
                    { band: 6, gain: 0 },
                    { band: 7, gain: 0 },
                    { band: 8, gain: 0.15 },
                    { band: 9, gain: 0.15 },
                    { band: 10, gain: 0.15 },
                    { band: 11, gain: 0.15 },
                    { band: 12, gain: 0.15 },
                    { band: 13, gain: 0.15 },
                ],
                timescale: {
                    pitch: 0.55,
                },
            });
            player.data.set(`vapor`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled Vaporwave of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        if(data === true)
        {
            player.send({guildId : message.guild.id , op : 'filters'});
            player.data.set(`vapor`,false);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Vaporwave of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}
module.exports = Vaporwave;