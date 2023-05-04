const delay = require("delay");
const { EmbedBuilder , ButtonBuilder , ActionRowBuilder , ButtonStyle } = require("discord.js");
const AvonClientEvent = require("../../structures/Eventhandler");

class PlayerEmpty extends AvonClientEvent{
    get name(){
        return 'playerEmpty';
    }
    async run(player){
        let db = await this.client.data.get(`${player.guildId}-autoPlay`);
        if(!db || db === null) this.client.data.set(`${player.guildId}-autoPlay`,`disbaled`);
        if(db === `enabled`)
        {
           let identifier = player.queue.current.identifier || player.queue.previous.identifier;
           const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
           let result = await player.search(search,{requester : this.client.user});
           player.queue.add(result.tracks[Math.floor(Math.random() * Math.floor(result.tracks.length))]);
           player.play();
        }
        if(db === `disabled`){
            let ch = this.client.channels.cache.get(player.textId);
        let guild = this.client.guilds.cache.get(player.guildId);
        let em = new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Queue Concluded` , iconURL : guild.iconURL({dynamic : true})});
        let but1 = new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://top.gg/bot/904317141866647592/vote`).setLabel(`Vote`);
        let row = new ActionRowBuilder().addComponents(but1);
        ch.send({embeds : [em],components : [row]});
        }
        let data = await this.client.data.get(`${player.guildId}-247`);
        if(!data || data === null) this.client.data.set(`${player.guildId}-247`,`disabled`);
        if(data === `enabled`) return;
        if(data === `disabled`)
        {
            await delay(180000);
            player.destroy();
            let ch = this.client.channels.cache.get(player.textId);
            if(!ch)
            {
                let channel =await this.client.channels.fetch(player.textId);
                if(!channel) return;
                else ch = channel;
            }
            ch.send({embeds : [
                new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | Enable 247 mode of ${this.client.user.username} to make me stay in voice channel.`)
            ]});
        }
    }
}
module.exports = PlayerEmpty;