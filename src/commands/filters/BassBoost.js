const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class BassBoost extends AvonCommand{
    get name(){
        return 'bassboost'
    }
    get aliases(){
        return ['bass'];
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get vote(){
        return true;
    }
    get cat(){
        return 'filters'
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        try{
            let db = player.data.get(`bass`);
            if(!db || db === false || db === undefined)
            {
                player.send({
                    op : 'filters',
                    guildId : message.guild.id,
                    equalizer: [
                        { band: 0, gain: 0.10 },
                        { band: 1, gain: 0.10 },
                        { band: 2, gain: 0.05 },
                        { band: 3, gain: 0.05 },
                        { band: 4, gain: -0.05 },
                        { band: 5, gain: -0.05 },
                        { band: 6, gain: 0 },
                        { band: 7, gain: -0.05 },
                        { band: 8, gain: -0.05 },
                        { band: 9, gain: 0 },
                        { band: 10, gain: 0.05 },
                        { band: 11, gain: 0.05 },
                        { band: 12, gain: 0.10 },
                        { band: 13, gain: 0.10 },
                    ]
                });
                player.data.set(`bass`,true);
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled BassBoost mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
            }
            if(data === true)
            {
                player.send({
                    op : 'filters',
                    guildId : message.guild.id,
                });
                player.data.set(`bass`,false);
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled BassBoost mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
            }
        }
        catch(e){
            console.log(e)
        }
    }
}
module.exports = BassBoost;