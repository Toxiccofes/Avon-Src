const { ActivityType } = require("discord.js");
const AvonClientEvent = require("../../structures/Eventhandler");
class AvonReady extends AvonClientEvent{
    get name(){
        return 'ready';
    }
    async run(){
        console.log(`${this.client.user.username} is Online!`);
        let statuses = [`${this.client.config.prefix}help`,`${this.client.config.prefix}play`]
        setInterval(() => {
            let status = statuses[Math.floor(Math.random()*statuses.length)];		
              this.client.user.setPresence({
                  activities: [
                      {
                          name: status,
                          type: ActivityType.Listening
                      }
                  ],
                  status: "dnd"
              });
          }, 5000);
        this.client.guilds.cache.forEach(async x => {
            let data =  await this.client.data.get(`${x.id}-247`);
            if(!data || data === null)  this.client.data.set(`${x.id}-247`,`disabled`)  ;
            if(data === `disabled`) return;
            if(data === `enabled`)
            {
                try{
                    await this.client.poru.createPlayer({
                        guildId : x.id,
                        voiceId : await this.client.data.get(`${x.id}-voice`),
                        textId : await this.client.data.get(`${x.id}-text`),
                        volume : 100,
                        shardId : x.shardId,
                        deaf : true
                    });
                }
                catch(e){
                    this.client.data.set(`${x.id}-247`,`disabled`);
                    this.client.data.delete(`${x.id}-text`);
                    this.client.data.delete(`${x.id}-voice`);
                }
            }
        })
    }
}
module.exports = AvonReady;