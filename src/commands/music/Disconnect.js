const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Disconnect extends AvonCommand{
    get name(){
        return 'disconnect'
    }
    get aliases(){
        return ['dc','leave']
    }
    get player(){
        return false;
    }
    get cat(){
        return 'music'
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix){
        let player = client.poru.players.get(message.guild.id);
        if(!player)
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| There is no player for this guild`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        else{
            player.destroy()
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Destroyed the player and left the voice channel`,iconURL : message.author.displayAvatarURL({dynamic : true})})]}
        )}
    }
}
module.exports = Disconnect;