const { PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, messageLink, WebhookClient } = require("discord.js");
const AvonClientEvent = require(`../../structures/Eventhandler`);
class AvonGuildCreate extends AvonClientEvent{
    get name(){
        return 'guildCreate'
    }
    async run(guild){
        try{
        this.client.data.set(`${guild.id}-247`,`disabled`);
        this.client.data.set(`${guild.id}-autoPlay`,`disabled`);
        this.client.data2.set(`noprefix_${guild.id}`,[]);
            let owner = await guild?.fetchOwner();
    let embed = new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| GUILD JOINED`,iconURL : this.client.user.displayAvatarURL()}).setDescription(
        `**Server Name :** ${guild.name} | **ID :** ${guild.id}
        **MemberCount :** ${guild.memberCount} Members
        **Guild Created :** <t:${Math.round(guild.createdTimestamp/1000)}:R> | **Guild Joined :** <t:${Math.round(guild.joinedTimestamp/1000)}:R>
        **Owner Info** : ${guild.members.cache.get(owner.id) ? guild.members.cache.get(owner.id).user.tag : 'Hoga koi mujhe kya'}
        **Servers Count :** ${this.client.guilds.cache.size}
        **Users Count :** ${this.client.guilds.cache.reduce((a,b) => a + b.memberCount,0)}`
    ).setThumbnail(guild.iconURL({dynamic : true}));
    const web = new WebhookClient({url : `https://discord.com/api/webhooks/1081954851539402836/KIPxjUYlA7Ofk9jlyPrehE4HTpG_xfMhavOkW2iJcEbc6Ys5uwphBAiPvoBjB31moE_J`});
    web.send({embeds : [embed]});
        
    } catch(e) { console.log(e) }
}
}
module.exports = AvonGuildCreate;