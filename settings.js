const chalk = require("chalk")
const fs = require("fs")

//aumto presence update
global.autoTyping = false
global.autoRecord = false
global.available = true

global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net',
  lann: 'https://api.betabotz.org'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a', 
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.betabotz.org': 'isi_dulu'
 }
global.keyopenai = "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"

//documents variants
global.doc1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.doc2 = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.doc3 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.doc4 = 'application/zip'
global.doc5 = 'application/pdf'
global.doc6 = 'application/vnd.android.package-archive'

//owmner v card
global.owner = ['918416093656'] //ur owner number
global.ownernomer = "919378043489" //ur owner number2
global.ownername = "꧁Herbert♕꧂" //ur owner name
global.ytname = "YT: HBMods OFC" //ur yt chanel name
global.socialm = "https://herbert70.blogspot.com" //ur github or insta name
global.location = "India, Mizoram, Aizawl" //ur location

//new
global.lann = 'isi_dulu'
global.botname = "HBWABot Mizo"
global.ownernumber = '918416093656'
global.ownername = '꧁Herbert♕꧂'
global.ownerNumber = ["918416093656@s.whatsapp.net"]
global.ownerweb = "https://youtube.com/@HBMods_Channel"
global.websitex = "https://herbert70.blogspot.com"
global.wagc = "https://chat.whatsapp.com/IgV6un73n0J9TfzyVsaBRA"
global.themeemoji = '🖤'
global.wm = "HBWABot Inc."
global.botscript = 'https://github.com/HBMods-OFC/HBWABot-v3' //script link
global.packname = "Sticker By"
global.author = "HBWABot"
global.creator = "918416093656@s.whatsapp.net"
global.prefa = ['','!','.','#','&']
global.sessionName = 'session'
global.hituet = 0


//Hei hi i thlak chuan bot hian hna a thawk dawn lo
//_______________________________________________
global.hbmods = "https://herbert70.blogspot.com/" //
//_______________________________________________




//media target
global.thum = fs.readFileSync("./HBMedia/theme/hbwabot.png") //ur thumb pic
global.log0 = fs.readFileSync("./HBMedia/theme/hbwabot.png") //ur logo pic
global.err4r = fs.readFileSync("./HBMedia/theme/hbwabot.png") //ur error pic
global.thumb = fs.readFileSync("./HBMedia/theme/hbwabot.png") //ur thumb pic
global.defaultpp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60' //default pp wa

//menu image maker
global.flaming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.fluming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=fluffy-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flarun = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=runner-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flasmurf = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=smurfs-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='

//messages
global.mess = {
    success: 'Hei le!', 
    wait: '♲ Nghak lawk rawh..',
    admin: 'He features hi chu admin te chauh hman thei tur a siam a ni!',
    botAdmin: 'Admin min nih tir phawt la, chuan ka ti thei ang!',
    premime: 'Hemi features, premium-ah ka dah bik hi i hman duh chuan owner rawn be rawh',
    owner: 'He features hi a neitu chauh hman thei tura siam a ni!',
    group: 'Hei chu group-ah chauh hman thei tura siam a ni!',
    private: 'Hei chu private chat-ah chauh hman thei tura siam a ni!',
    bot: 'Hei chu kei mah chauh hman thei tur a siam a ni',
    linkm: 'Khawnge a link?',
    endLimit: 'Vawiinah i hman tur i hmang zo tawh, darkar 12 ral hunah i hmang leh thei chauh ang',
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
