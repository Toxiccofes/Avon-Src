const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Previous extends AvonCommand{
    get name()
    {
        return 'previous';
    }
    get aliases(){
        return ['prev'];
    }
    get cat(){
        return 'music';
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        if(player.queue.previous === null){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Previous song available` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }else{
            player.queue.unshift(player.queue.previous);
            player.skip();
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Playing previous track`})]})
        }
    }
}
module.exports = Previous;