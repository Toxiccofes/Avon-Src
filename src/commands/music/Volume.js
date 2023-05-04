const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Volume extends AvonCommand{
    get name(){
        return 'volume'
    }
    get aliases(){
        return ['vol','volu']
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
        try{
        let player = client.poru.players.get(message.guild.id);
        if(!player){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| I am not playing Anything` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(!args[0])
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Current Volume of the player is ${player.volume * 100}%` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        let vol = Number(args[0])
        if(vol < 0 || vol > 200){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Given args must lie between <0 - 200>` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(player.volume * 100 === vol){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Volume is already set to ${vol}`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        await player.setVolume(vol / 1);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Player's Volume has been changed to ${vol}%` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        } catch(e) {
            console.log(e)
        }
    }
}
module.exports = Volume;