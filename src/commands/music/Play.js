const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const ms = require("ms");
const { KazagumoTrack } = require(`kazagumo`);
const AvonCommand = require(`../../structures/avonCommand`);
class Play extends AvonCommand{
    get name(){
        return 'play'
    }
    get aliases(){
        return ['p','play']
    }
    get cat(){
        return 'music'
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix){
        try{
            if(!args[0]){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`__**Command Usage**__ \n \`\`\`js\n${prefix}play <songurl>\`\`\``)]})
            }
            let channel = message.member.voice.channel;
            var player = client.poru.players.get(message.guild.id);
            if(!player){
                player = await client.poru.createPlayer({
                    guildId : message.guild.id,
                    voiceId : channel.id,
                    textId : message.channel.id,
                    deaf : true,
                    volume : 100,
                    shardId : message.guild.shardId
                });
            }

            let query = args.join(" ");
            player.setTextChannel(message.channel.id);
            if(query.startsWith('https://'))
            {
                if(query.includes(`youtube`))
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| I don't resolve youtube links anymore due to Youtube's TOS Violation`,iconURL : message.author.displayAvatarURL({dynamic: true})})]});
                }
                if(query.includes(`youtu.be`))
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| I don't resolve youtube links anymore due to Youtube's TOS Violation`,iconURL : message.author.displayAvatarURL({dynamic: true})})]});
                }
                if(query.includes(`spotify`))
                {
                    try{
                    await client.lavasfy.requestToken();
                    let node = client.lavasfy.nodes.get('Avon');
                    let result = await node.load(query);
                    if(result.loadType === `LOAD_FAILED`)
                    {
                        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Failed while loading`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
                    }
                    if(result.loadType === `PLAYLIST_LOADED`)
                    {
                        let songs = [];
                        for(let i = 0; i < result.tracks.length; i++)
                        {
                            let convert = new KazagumoTrack(result.tracks[i],message.author);
                            songs.push(convert);
                        }
                        player.queue.add(songs);
                        if(!player.playing && !player.paused) player.play();
                        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Playlist to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** \`${result.tracks.length}\` **Songs from** *${result.playlistInfo.name}* \n ${client.emoji.users} **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** ${ms(result.tracks.reduce((a,v) => a+v.info.length,0))}`)]})
                    }
                    if(result.loadType === `TRACK_LOADED`|| result.loadType === `SEARCH_RESULT`)
                    {
                        let convertedTrack = new KazagumoTrack(result.tracks[0],message.author);
                        player.queue.add(convertedTrack);
                        if(!player.playing && !player.paused) player.play();
                        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Added Song to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** [${result.tracks[0].info.title}](${result.tracks[0].info.uri}) \n ${client.emoji.users} **Requester :** [${message.author}]`)]});
                    }
                } catch(e) { console.log(e) }
                }
                else{
                    let result = await player.search(query , {requester : message.author});
                    if(!result.tracks.length)
                    {
                        return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No results were found`,iconURL : message.author.displayAvatarURL({dynamic : true})})],components : []});
                    }
                    if(result.type === `PLAYLIST`)
                    {
                        for(let track of result.tracks)
                        {
                            player.queue.add(track);
                            if(!player.playing && !player.paused) player.play();
                            return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Playlist To Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** \`${result.tracks.length}\` Songs from *${result.playlistName}* \n **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** \`${ms(result.playlistInfo.length)}\``)],components : []});
                        }
                    }
                    else{
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return interaction.update({components : [],embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Song to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** [${result.tracks[0].title}](${client.config.server}) \n ${client.emoji.users} **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** ${ms(result.tracks[0].length)}`)]});
                    }
                }
            }

            let emb = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Choose the search engine you want to use`,iconURL : message.author.displayAvatarURL({dynamic : true})});
            let b1 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Default`).setCustomId(`def`);
            let b2 = new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(`<:spotify_avon:1065634374906814525>`).setCustomId(`spoti`);
            let b3 = new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`deez`).setEmoji(`<:Deezer_avon:1065634451603861545>`);
            let b4 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`sc`).setEmoji(`<:Soundcloud_avon:1065634569262473277>`);
            let ro = new ActionRowBuilder().addComponents(b1,b2,b3,b4);

            let msg = await message.channel.send({embeds : [emb] , components : [ro]});

            let co = await msg.createMessageComponentCollector({
                filter : (b) => {
                    if(b.user.id === message.author.id) return true;
                    else{
                        return b.reply({content : `${client.emoji.cross} | You are not the author of this command`,ephemeral : true});
                    }
                },
                time : 600000 * 5
            });

            co.on('collect',async(interaction) => {
                if(interaction.isButton())
                {
                    if(interaction.user.id !== message.author.id) return interaction.deferUpdate();
                    try{
                    if(interaction.customId === `def`)
                    {
                        let result = await player.search(query , {requester : message.author});
                        if(!result.tracks.length)
                        {
                            return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No results were found`,iconURL : message.author.displayAvatarURL({dynamic : true})})],components : []});
                        }
                        if(result.type === `PLAYLIST`)
                        {
                            for(let track of result.tracks)
                            {
                                player.queue.add(track);
                                if(!player.playing && !player.paused) player.play();
                                return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Playlist To Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** \`${result.tracks.length}\` Songs from *${result.playlistName}* \n **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** \`${ms(result.playlistInfo.length)}\``)],components : []});
                            }
                        }
                        else{
                            player.queue.add(result.tracks[0]);
                            if(!player.playing && !player.paused) player.play();
                            return interaction.update({components : [],embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Song to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** [${result.tracks[0].title}](${client.config.server}) \n ${client.emoji.users} **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** ${ms(result.tracks[0].length)}`)]});
                        }
                    }
                    if(interaction.customId === `spoti`)
                    {
                        let result = await player.search(query , {engine : `spotify`,requester : message.author});
                        if(!result.tracks.length)
                        {
                            return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No results were found`,iconURL : message.author.displayAvatarURL({dynamic : true})})],components : []});
                        }
                        if(result.type === `PLAYLIST`)
                        {
                            for(let track of result.tracks)
                            {
                                let tr = new KazagumoTrack(track.getRaw(),message.author);
                                player.queue.add(tr);
                                if(!player.playing && !player.paused) player.play();
                                return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Playlist To Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** \`${result.tracks.length}\` Songs from *${result.playlistName}* \n **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** \`${ms(result.playlistInfo.length)}\``)],components : []});
                            }
                        }
                        else{
                            let re = new KazagumoTrack(result.tracks[0].getRaw(),message.author);
                            player.queue.add(re);
                            if(!player.playing && !player.paused) player.play();
                            return interaction.update({components : [],embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Song to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** [${result.tracks[0].title}](${client.config.server}) \n ${client.emoji.users} **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** ${ms(result.tracks[0].length)}`)]});
                        }
                    }
                    if(interaction.customId === `deez`)
                    {
                        let result = await player.search(query , {engine : `deezer`,requester : message.author});
                        if(!result.tracks.length)
                        {
                            return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No results were found`,iconURL : message.author.displayAvatarURL({dynamic : true})})],components : []});
                        }
                        if(result.type === `PLAYLIST`)
                        {
                            for(let track of result.tracks)
                            {
                                player.queue.add(track);
                                if(!player.playing && !player.paused) player.play();
                                return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Playlist To Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** \`${result.tracks.length}\` Songs from *${result.playlistName}* \n **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** \`${ms(result.playlistInfo.length)}\``)],components : []});
                            }
                        }
                        else{
                            player.queue.add(result.tracks[0]);
                            if(!player.playing && !player.paused) player.play();
                            return interaction.update({components : [],embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Song to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** [${result.tracks[0].title}](${client.config.server}) \n ${client.emoji.users} **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** ${ms(result.tracks[0].length)}`)]});
                        }
                    }
                    if(interaction.customId === `sc`)
                    {
                        let result = await player.search(query , {engine : `soundcloud`,requester : message.author});
                        if(!result.tracks.length)
                        {
                            return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No results were found`,iconURL : message.author.displayAvatarURL({dynamic : true})})],components : []});
                        }
                        if(result.type === `PLAYLIST`)
                        {
                            for(let track of result.tracks)
                            {
                                player.queue.add(track);
                                if(!player.playing && !player.paused) player.play();
                                return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Playlist To Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** \`${result.tracks.length}\` Songs from *${result.playlistName}* \n **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** \`${ms(result.playlistInfo.length)}\``)],components : []});
                            }
                        }
                        else{
                            player.queue.add(result.tracks[0]);
                            if(!player.playing && !player.paused) player.play();
                            return interaction.update({components : [],embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Song to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} **Added** [${result.tracks[0].title}](${client.config.server}) \n ${client.emoji.users} **Requester :** [${message.author}] \n ${client.emoji.time} **Duration :** ${ms(result.tracks[0].length)}`)]});
                        }
                    }
                } catch(e) { }
                }
            });
            co.on('end',async() => {
                return;
            })
        } catch(e) { }
    }
}
module.exports = Play;