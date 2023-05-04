const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const AvonClientEvent = require(`../../structures/Eventhandler`);
const moment = require(`moment`);
require(`moment-duration-format`);
class TrackStart extends AvonClientEvent{
    get name(){
        return 'playerStart'
    }
    async run(player,track){
        let url = track.uri;
        if(url.includes("youtube.com"))
        {
            url = this.client.config.server
        }
        let emb = new EmbedBuilder().setColor(this.client.config.color).setDescription(`[${track.title}](${url}) By [${track.author}](${url}) [${moment.duration(player.queue.current.length).format("hh:mm:ss")}]`).setAuthor({name : `| Now Playing` , iconURL : track.requester.displayAvatarURL({dynamic:true})}).setThumbnail(track.requester.displayAvatarURL({dynamic:true}))
        const channel = this.client.channels.cache.get(player.textId);
        let duration = moment.duration(player.queue.current.length).format("hh:mm:ss");
        if(duration < 30)
        {
            player.skip();
            return channel.send({embeds : [
                new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.settings} I am skipping this track as its duration is less than 30 seconds`)
            ]});
        }
        let but1 = new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel(`Stop`).setCustomId(`pl1`);
        let but2 = new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel(`Pause`).setCustomId(`pl2`);
        let but3 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(`Loop`).setCustomId(`pl3`);
        let but4 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Previous`).setCustomId(`pl4`);
        let but5 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Skip`).setCustomId(`pl5`);
        let ro = new ActionRowBuilder().addComponents(but1,but2,but3,but4,but5);
        if(channel){
            return channel?.send({embeds : [emb],components : [ro]}).then(x => player.data.set("music",x));
        }
    }
}
module.exports = TrackStart;