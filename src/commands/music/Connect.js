const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Connect extends AvonCommand{
    get name(){
        return 'connect'
    }
    get aliases(){
        return ['join','conn']
    }
    get player(){
        return false;
    }
    get inVoice(){
        return true;
    }
    get cat(){
        return 'music'
    }
    get sameVoice(){
        return false;
    }
    async run(client,message,args,prefix){
        let player = client.poru.players.get(message.guild.id);
        if(message.guild.members.me.voice.channel)
        {
            if(player)
            {
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`| I am already connected to ${message.guild.members.me.voice.channel}`)]})
            }
            else if(!player)
            {
                message.guild.members.me.voice.disconnect();

                if(message.guild.members.me.permissionsIn(message.member.voice.channel).has([PermissionsBitField.Flags.Connect,PermissionsBitField.Flags.Speak]))
                {
                    await client.poru.createPlayer({
                        guildId : message.guild.id,
                        textId : message.channel.id,
                        voiceId : message.member.voice.channel.id,
                        volume : 100,
                        deaf : true,
                        shardId : message.guild.shardId
                    });
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Connected to your voice channel`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
                }
                else{
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Missing Connect or Speak permissions on your voice channel`,iconURL : message.author.displayAvatarURL({dynamic:true})})]});
                }
            }
        }
        else{
            await client.poru.createPlayer({
                guildId : message.guild.id,
                textId : message.channel.id,
                voiceId : message.member.voice.channel.id,
                volume : 100,
                deaf : true,
                shardId : message.guild.shardId
            });
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Connected to your voice channel`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
    }
}
module.exports = Connect;