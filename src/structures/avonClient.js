const { Client , GatewayIntentBits , Collection , WebhookClient, Partials , EmbedBuilder } = require(`discord.js`);
const { Guilds , MessageContent , GuildInvites , GuildVoiceStates , GuildMessages , DirectMessages } = GatewayIntentBits;
const { User , Channel , Reaction , Message , GuildMember } = Partials;
const { errors } = require(`../../config.json`);
const { Database } = require("quickmongo");
const { ClusterClient , getInfo } = require(`discord-hybrid-sharding`);
const AvonEvents = require("./avonEvents");
const AvonCommands = require("./CommandHandler");
const config = require(`../../config.json`);
const Shoukaku = require("./Shoukaku");
const Lavasfy = require("./Lavasfy");
const web = new WebhookClient({url : errors});
class Avon extends Client {
    constructor(){
        super({
            intents : [Guilds,MessageContent,GuildInvites,GuildMessages,DirectMessages,GuildVoiceStates],
            shardCount : getInfo().TOTAL_SHARDS,
            shards : getInfo().SHARD_LIST,
            partials : [Channel,User,Reaction,Message,GuildMember],
            allowedMentions : {
                repliedUser : true,
                parse : ['everyone','roles','users']
            }
        });
        this.cluster = new ClusterClient(this);
        this.data = new Database(config.mongourl);
        this.data.connect();
        this.data2 = new Database(config.mongourl2);
        this.data2.connect();
        this.poru = new Shoukaku(this);   
        this.lavasfy = new Lavasfy(this);
        this.poru.shoukaku.on('ready',(name) => { console.log(`[SHOUKAKU] => Node ${name} is connected`) } )
        this.poru.shoukaku.on('error',(name,error) => { console.log(`[SHOUKAKU] => Node ${name} got some error : ${error}`) })
        this.poru.shoukaku.on('close',(name,code,reason) => {console.log(`[SHOUKAKU] => Node ${name} got closed due to reason : ${reason} and Code : ${code}`)})
        this.poru.shoukaku.on('debug',(name,info) => {console.log(`[SHOUKAKU] => Node ${name} Debugging : ${info}`)})
        this.poru.shoukaku.on('disconnect', (name, players, moved) => {
            if (moved) return;
            console.warn(`[SHOUKAKU] => Node ${name}: Disconnected`);
        });
        this.poru.on("playerClosed",(player) => {
            player.destroy();
            console.log(player);
        })
        this.emoji = require(`${process.cwd()}/emoji.json`);
        this.config = require(`${process.cwd()}/config.json`);
        this.AvonCommands = new AvonCommands(this).loadCommands();
        this.events = new AvonEvents(this).loadEvents();
        this.login(this.config.token);
        process.on('unhandledRejection',async(er) => {
            console.error(er);
            web.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`\`\`\`js\n${er}\`\`\``)]});
        });
        process.on('uncaughtException',async(err) => {
            console.error(err);
            web.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`\`\`\`js\n${err}\`\`\``)]});
        });
    }
    
}
module.exports = Avon;