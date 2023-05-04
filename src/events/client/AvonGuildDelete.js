const { EmbedBuilder , WebhookClient } = require("discord.js");
const AvonClientEvent = require("../../structures/Eventhandler");

class AvonGuildDelete extends AvonClientEvent{
    get name(){
        return 'guildDelete';
    }
    async run(guild){
        this.client.data2.delete(`noprefix_${guild.id}`);
        this.client.data.delete(`${guild.id}-247`);
        this.client.data.delete(`${guild.id}-autoPlay`);

        let leaveLog = '1065527269675761734';
        const users = await this.client.cluster.broadcastEval(c => c.guilds.cache.filter(x => x.available).reduce((a, g) =>a + g.memberCount, 0)).then(r => r.reduce((acc, memberCount) => acc + memberCount, 0));
        const servers = await this.client.cluster.broadcastEval(c => c.guilds.cache.size).then(r => r.reduce((a, b) => a + b, 0));
        let eme = new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| GUILD LEFT`,iconURL : this.client.user.displayAvatarURL()}).setDescription(
            `**Server Name :** ${guild.name} | **ID :** ${guild.id}
            **MemberCount :** ${guild.memberCount} Members
            **Guild Created :** <t:${Math.round(guild.createdTimestamp/1000)}:R> 
            **Servers Count :** ${servers}
            **Users Count :** ${users}`
        ).setThumbnail(guild.iconURL({dynamic : true})).setTimestamp();
        const web = new WebhookClient({url : `https://discord.com/api/webhooks/1081954851539402836/KIPxjUYlA7Ofk9jlyPrehE4HTpG_xfMhavOkW2iJcEbc6Ys5uwphBAiPvoBjB31moE_J`});
        web.send({embeds : [eme]});
    }
}
module.exports = AvonGuildDelete;