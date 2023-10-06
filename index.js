const { modul } = require('./module');
const moment = require('moment-timezone');
const { baileys, boom, chalk, fs, figlet, FileType, path, pino, process, PhoneNumber, axios, yargs, _ } = modul;
const { Boom } = boom
const {
	default: HBWABotIncConnect,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useMultiFileAuthState,
	delay,
	fetchLatestBaileysVersion,
	generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    getAggregateVotesInPollMessage,
    proto
} = require("@whiskeysockets/baileys")
const { color, bgcolor } = require('./lib/color')
const colors = require('colors')
const { start } = require('./lib/spinner')
const { uncache, nocache } = require('./lib/loader')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./lib/myfunc')

const prefix = ''

global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {}, 
game: {},
others: {},
users: {},
chats: {},
settings: {},
...(global.db || {})
}

const owner = JSON.parse(fs.readFileSync('./database/owner.json'))

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

require('./HBWABot-v3.js')
nocache('../HBWABot-v3.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

async function HBWABotIncBot() {
	const {  saveCreds, state } = await useMultiFileAuthState(`./${sessionName}`)
    	const HBWABotInc = HBWABotIncConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: [`${botname}`,'Safari','3.0'],
        auth: state,
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg.message || undefined
            }
            return {
                conversation: "HBWABot Here"
            }
        }
    })

    store.bind(HBWABotInc.ev)

HBWABotInc.ev.on('connection.update', async (update) => {
	const {
		connection,
		lastDisconnect
	} = update
try{
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete Session and Scan Again`);
				HBWABotIncBot()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				HBWABotIncBot();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				HBWABotIncBot();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				HBWABotIncBot()
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Scan Again And Run.`);
				HBWABotIncBot();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				HBWABotIncBot();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				HBWABotIncBot();
			} else HBWABotInc.end(`Unknown DisconnectReason: ${reason}|${connection}`)
		}
		if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			console.log(color(`\n🌿Connecting...`, 'yellow'))
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			console.log(color(` `,'magenta'))
            console.log(color(`🌿Connected to => ` + JSON.stringify(HBWABotInc.user, null, 2), 'yellow'))
			await delay(1999)
            console.log(chalk.yellow(`\n\n               ${chalk.bold.blue(`[ ${botname} ]`)}\n\n`))
            console.log(color(`< ================================================== >`, 'cyan'))
	        console.log(color(`\n${themeemoji} YT CHANNEL: HBMods OFC `,'magenta'))
            console.log(color(`${themeemoji} GITHUB: HBMods-OFC `,'magenta'))
            console.log(color(`${themeemoji} INSTAGRAM: Herbert_Suantak2 `,'magenta'))
            console.log(color(`${themeemoji} WA NUMBER: ${owner}`,'magenta'))
            console.log(color(`${themeemoji} CREDIT: ${wm}\n`,'magenta'))
		}
	
} catch (err) {
	  console.log('Error in Connection.update '+err)
	  HBWABotIncBot();
	}
	
})

await delay(5555) 
start('2',colors.bold.white('\n\nMessage nghak mek a ni..'))

HBWABotInc.ev.on('creds.update', await saveCreds)

    // Anti Call
    HBWABotInc.ev.on('call', async (HerbertPapa) => {
    let botNumber = await HBWABotInc.decodeJid(HBWABotInc.user.id)
    let HerbertBotNum = db.settings[botNumber].anticall
    if (!HerbertBotNum) return
    console.log(HerbertPapa)
    for (let HerbertFucks of HerbertPapa) {
    if (HerbertFucks.isGroup == false) {
    if (HerbertFucks.status == "offer") {
    let HerbertBlokMsg = await HBWABotInc.sendTextWithMentions(HerbertFucks.from, `*HBWABot* hian ${HerbertFucks.isVideo ? `video` : `voice` } call ka dawng thei lo , chu vangin @${HerbertFucks.from.split('@')[0]} block i ni. Unblock i duh chuan a rang lamin owner hi va bia ang che`)
    HBWABotInc.sendContact(HerbertFucks.from, global.owner, HerbertBlokMsg)
    await sleep(8000)
    await HBWABotInc.updateBlockStatus(HerbertFucks.from, "block")
    }
    }
    }
    })

HBWABotInc.ev.on('messages.upsert', async chatUpdate => {
try {
const kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (!HBWABotInc.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
const m = smsg(HBWABotInc, kay, store)
require('./HBWABot-v3')(HBWABotInc, m, chatUpdate, store)
} catch (err) {
console.log(err)}})

	// detect group update
		HBWABotInc.ev.on("groups.update", async (json) => {
			try {
ppgroup = await HBWABotInc.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
			console.log(json)
			const res = json[0];
			if (res.announce == true) {
				await sleep(2000)
				HBWABotInc.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nAdmin in group a close e, Tun a tangin admin te chauh group-ah message an thawn thei tawh ang !`,
				});
			} else if (res.announce == false) {
				await sleep(2000)
				HBWABotInc.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nAdmin in group a open leh tawha, Tun a tangin participate zawng zawng ten message an send leh thei tawh ang!`,
				});
			} else if (res.restrict == true) {
				await sleep(2000)
				HBWABotInc.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nGroup info chu admin te chauh edit theia dah a ni!`,
				});
			} else if (res.restrict == false) {
				await sleep(2000)
				HBWABotInc.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nGroup info chu participant zawng zawng te edit thei tura dah a ni!`,
				});
			} else if(!res.desc == ''){
				await sleep(2000)
				HBWABotInc.sendMessage(res.id, { 
					text: `「 Group Settings Change 」\n\n*Group description hi thlak a ni:*\n\n${res.desc}`,
				});
      } else {
				await sleep(2000)
				HBWABotInc.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\n*Group hming thlak a ni* he tiang hian👇\n\n*${res.subject}*`,
				});
			} 
			
		});
		
HBWABotInc.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await HBWABotInc.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await HBWABotInc.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await HBWABotInc.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
//welcome\\
              let nama = await HBWABotInc.getName(num)
memb = metadata.participants.length

Kon = await getBuffer(`https://i.imgur.com/27d2RH6.mp4`)

Tol = await getBuffer(`https://i.imgur.com/27d2RH6.mp4`)
                if (anu.action == 'add') {
                    HBWABotInc.sendMessage(anu.id, { video : Kon, contextInfo: { mentionedJid: [num] }, caption: `Hi @${num.split("@")[0]},\nKei hi HBWABot ka ni a,\n*${metadata.subject} Group-ah hian kan lo lawm a che*\n\n*Group Description :*\n ${metadata.desc}\n\n\n*©HBWABot*`, gifPlayback: true })
                }
            }
        } catch (err) {
            console.log(err)
        }
    })

    // respon cmd pollMessage
    async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "HBWABot Here"
        }
    }
    HBWABotInc.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                HBWABotInc.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })

HBWABotInc.sendTextWithMentions = async (jid, text, quoted, options = {}) => HBWABotInc.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

HBWABotInc.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

HBWABotInc.ev.on('contacts.update', update => {
for (let contact of update) {
let id = HBWABotInc.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

HBWABotInc.getName = (jid, withoutContact  = false) => {
id = HBWABotInc.decodeJid(jid)
withoutContact = HBWABotInc.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = HBWABotInc.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === HBWABotInc.decodeJid(HBWABotInc.user.id) ?
HBWABotInc.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

HBWABotInc.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

HBWABotInc.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await HBWABotInc.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await HBWABotInc.getName(
          i + "@s.whatsapp.net"
        )}\nFN:${
          global.ownername
        }\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Hmet la be rawh\nitem2.EMAIL;type=INTERNET:
 ${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:IG\nitem4.ADR:;;India;Mizoram Aizawl ;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	HBWABotInc.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }

HBWABotInc.setStatus = (status) => {
HBWABotInc.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

HBWABotInc.public = true

HBWABotInc.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await HBWABotInc.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

HBWABotInc.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await HBWABotInc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}

HBWABotInc.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await HBWABotInc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

HBWABotInc.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await HBWABotInc.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

HBWABotInc.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

HBWABotInc.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

HBWABotInc.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'}
filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data}}

HBWABotInc.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await HBWABotInc.getFile(path, true)
let { mime, ext, res, data, filename } = types
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }}
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await HBWABotInc.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}

HBWABotInc.sendText = (jid, text, quoted = '', options) => HBWABotInc.sendMessage(jid, { text: text, ...options }, { quoted })

HBWABotInc.serializeM = (m) => smsg(HBWABotInc, m, store)

HBWABotInc.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
HBWABotInc.sendMessage(jid, buttonMessage, { quoted, ...options })
}

HBWABotInc.sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
let message = await prepareWAMessageMedia({ image: gam }, { upload: HBWABotInc.waUploadToServer })
const tod = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"productId": "9999",
"title": title,
"description": desc,
"currencyCode": "INR",
"priceAmount1000": "100000",
"url": `${websitex}`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `${ownernumber}@s.whatsapp.net`
}
}, options)
return HBWABotInc.relayMessage(jid, tod.message, {messageId: tod.key.id})
} 

HBWABotInc.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
HBWABotInc.relayMessage(jid, template.message, { messageId: template.key.id })
}

HBWABotInc.sendButImg = async (jid, path, teks, fke, but) => {
let img = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let fjejfjjjer = {
image: img, 
jpegThumbnail: img,
caption: teks,
fileLength: "1",
footer: fke,
buttons: but,
headerType: 4,
}
HBWABotInc.sendMessage(jid, fjejfjjjer, { quoted: m })
}

            /**
             * Send Media/File with Automatic Type Specifier
             * @param {String} jid
             * @param {String|Buffer} path
             * @param {String} filename
             * @param {String} caption
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Boolean} ptt
             * @param {Object} options
             */
HBWABotInc.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
                let type = await HBWABotInc.getFile(path, true)
                let { res, data: file, filename: pathFile } = type
                if (res && res.status !== 200 || file.length <= 65536) {
                    try { throw { json: JSON.parse(file.toString()) } }
                    catch (e) { if (e.json) throw e.json }
                }
                const fileSize = fs.statSync(pathFile).size / 1024 / 1024
                if (fileSize >= 1800) throw new Error(' The file size is too large\n\n')
                let opt = {}
                if (quoted) opt.quoted = quoted
                if (!type) options.asDocument = true
                let mtype = '', mimetype = options.mimetype || type.mime, convert
                if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
                else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
                else if (/video/.test(type.mime)) mtype = 'video'
                else if (/audio/.test(type.mime)) (
                    convert = await toAudio(file, type.ext),
                    file = convert.data,
                    pathFile = convert.filename,
                    mtype = 'audio',
                    mimetype = options.mimetype || 'audio/ogg; codecs=opus'
                )
                else mtype = 'document'
                if (options.asDocument) mtype = 'document'

                delete options.asSticker
                delete options.asLocation
                delete options.asVideo
                delete options.asDocument
                delete options.asImage

                let message = {
                    ...options,
                    caption,
                    ptt,
                    [mtype]: { url: pathFile },
                    mimetype,
                    fileName: filename || pathFile.split('/').pop()
                }
                /**
                 * @type {import('@adiwajshing/baileys').proto.WebMessageInfo}
                 */
                let m
                try {
                    m = await HBWABotInc.sendMessage(jid, message, { ...opt, ...options })
                } catch (e) {
                    console.error(e)
                    m = null
                } finally {
                    if (!m) m = await HBWABotInc.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options })
                    file = null // releasing the memory
                    return m
                }
            }

//HBWABotInc.sendFile = async (jid, media, options = {}) => {
        //let file = await HBWABotInc.getFile(media)
        //let mime = file.ext, type
        //if (mime == "mp3") {
          //type = "audio"
          //options.mimetype = "audio/mpeg"
          //options.ptt = options.ptt || false
        //}
        //else if (mime == "jpg" || mime == "jpeg" || mime == "png") type = "image"
        //else if (mime == "webp") type = "sticker"
        //else if (mime == "mp4") type = "video"
        //else type = "document"
        //return HBWABotInc.sendMessage(jid, { [type]: file.data, ...options }, { ...options })
      //}

HBWABotInc.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return HBWABotInc.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return HBWABotInc.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return HBWABotInc.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return HBWABotInc.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return HBWABotInc.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }
      
      /**
     * 
     * @param {*} jid 
     * @param {*} name 
     * @param [*] values 
     * @returns 
     */
    HBWABotInc.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return HBWABotInc.sendMessage(jid, { poll: { name, values, selectableCount }}) }

return HBWABotInc

}

HBWABotIncBot()

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
