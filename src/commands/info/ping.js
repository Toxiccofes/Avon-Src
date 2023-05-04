const AvonCommand = require("../../structures/avonCommand");
const {EmbedBuilder} = require(`discord.js`);
class ping extends AvonCommand {
    get name(){
        return 'ping'
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${client.user.username} Ping
       `}).addFields({name : `<a:ping_op:1079400309970964490> **Pong** <a:ping_op:1079400309970964490>`,value : `${client.ws.ping} ms`}).setFooter({text : `Requested By : ${message.author.tag}`}).setThumbnail(message.author.displayAvatarURL({dynamic : true}))]});
    }
}
module.exports = ping;