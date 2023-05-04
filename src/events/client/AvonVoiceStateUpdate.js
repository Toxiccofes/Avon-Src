const { EmbedBuilder } = require("discord.js");
const  delay  = require(`delay`);
const AvonClientEvent = require("../../structures/Eventhandler");

class AvonVoiceStateUpdate extends AvonClientEvent{
    get name(){
        return 'voiceStateUpdate';
    }
    async run(os,ns){
        let player = this.client.poru.players.get(ns.guild.id || os.guild.id);
        if(!player) return;
        if(os.id === this.client.user.id) return;
        if(!ns.guild.members.cache.get(this.client.user.id).voice.channelId || !os.guild.members.cache.get(this.client.user.id).voice.channelId) return;
        if(!os.guild.members.me.voice.channel || !ns.guild.members.me.voice.channel){
            player.destroy();
        }
        if(ns.guild.members.me.serverMute === true) ns.guild.members.me.voice.setMute(false);
    }
}
module.exports = AvonVoiceStateUpdate;