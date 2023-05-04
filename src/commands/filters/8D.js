const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Rotation extends AvonCommand{
    get name(){
        return '8d'
    }
    get aliases(){
        return []
    }
    get player(){
        return true
    }
    get vote(){
        return true;
    }
    get cat(){
        return 'filters'
    }
    get inVoice(){
        return true
    }
    get sameVoice(){
        return true
    }
    async run(client,message,args,prefix,player){
        try{
        let data = player.data.get('8d');
        if(!data || data === false || data === undefined){
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                rotation : { rotationHz : 0.2 }
            });
            player.data.set(`8d`,true)
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled 8d mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(data === true){
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                rotation : { rotationHz : null }
            });
            player.data.set(`8d`,false);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled 8d mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    } catch(e) { console.log(e)}
}
}
module.exports = Rotation;