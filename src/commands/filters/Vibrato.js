const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class Vibrato extends AvonCommand{
    get name(){
        return 'vibrato'
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
        try{
        let db = player.data.get(`vib`);
        if(!db || db === false || db === undefined)
        {
            player.send({
                op: 'filters',
                guildId: message.guild.id,
                vibrato : {
                    frequency: 4.0,
                    depth: 0.75
                }
            });
            player.data.set(`vib`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled Vibrato mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(db === true)
        {
            player.send({guildId : message.guild.id, op : 'filters'});
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Vibrato mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
    } catch(e) {
        console.log(e)
    }
    }
}
module.exports = Vibrato;