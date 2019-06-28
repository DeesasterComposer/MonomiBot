const Discord = require('discord.js');
const client = new Discord.Client();
const random = require('randomize');
const ytdl = require('ytdl-core');
/*const sql = require('sqlite');
sql.open("./score.sqlite");*/

/*Play Audio Function*/
function play(connection, message) {
	var server = servers[message.guild.id];

	server.dispatcher = connection.playStream(ytdl(server.queue[0].url, {
		filter: "audioonly"
	}));

	currentlyPlaying = server.queue[0];

	server.dispatcher.on("end", function () {
		if (loopQueueSetting === true && loopSetting === false) {
			server.queue.push(server.queue[0]);
			server.queue.shift();
		}
		if (loopSetting === false && loopQueueSetting === false) {
			server.queue.shift();
		}
		if (server.queue[0]) {
			play(connection, message);
		} else {
			currentlyPlaying === null;
			loopSetting = false;
			loopQueueSetting = false;
			connection.disconnect();
		}
	});
}

/*Move Array Item Function*/
function move(arr, queueShiftFrom, queueShiftTo, message) {
	while (queueShiftFrom < 0) {
		queueShiftFrom += arr.length;
	}
	while (queueShiftTo < 0) {
		queueShiftTo += arr.length;
	}
	if (queueShiftTo >= arr.length) {
		var x = queueShiftTo - arr.length;
		while ((x--) + 1) {
			arr.push(undefined);
		}
	}
	arr.splice(queueShiftTo, 0, arr.splice(queueShiftFrom, 1)[0]);
	return message.channel.send(`:white_check_mark: Monomi has moved \`${arr[queueShiftTo].title}\` to position ${queueShiftTo}.`);
}

/*Shuffle Array Function*/
function shuffle(array) {
	var currentIndex = array.length;
	var temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

// /*Radio Variables*/
var list = "";
var servers = {};
var loopSetting = false;
var loopQueueSetting = false;
var currentlyPlaying = null;

// /*Murder Mystery Variables*/
MM_InProgress = false;

/*Murder Mystery Generate Overlapping Clues Function*/
function generateOverlapClues(murderer, evidenceClue) {
	if ((murderer.name === "Aiko Hikaru" || murderer.name === "Shiba Mikio") && evidenceClue === "A heart-shaped pin was found at the scene.") {
		falseAnswer1 = students[1];
		falseAnswer2 = students[23];
	}
	if ((murderer.name === "Théo Dubois" || murderer.name === "Kiro Karasu") && evidenceClue === "An arrow was found at the scene.") {
		falseAnswer1 = students[27];
		falseAnswer2 = students[13];
	}
	if ((murderer.name === "Areli Vepkhia" || murderer.name === "Inugami Uzuki") && evidenceClue === "There is a large bite mark on the victim's arm.") {
		falseAnswer1 = students[59];
		falseAnswer2 = students[64];
	}
	if ((murderer.name === "Aika Mahaya" || murderer.name === "Kyoung-mi Park" || murderer.name === "Kumiko Yeun") && evidenceClue === "A microphone with blood on it was found hidden away at the scene.") {
		falseAnswer1 = students[0];
		falseAnswer2 = students[14];
		falseAnswer3 = students[68];
	}
	if ((murderer.name === "Aiko Hikaru" || murderer.name === "Kyoung-mi Park" || murderer.name === "Miyuki Hayashi") && evidenceClue === "There were smears of eye shadow found on the victim.") {
		falseAnswer1 = students[1];
		falseAnswer2 = students[14];
		falseAnswer3 = students[73];
	}
	if ((murderer.name === "Jeong Park" || murderer.name === "Dia Ramos") && evidenceClue === "There were smears of concealer found on the victim.") {
		falseAnswer1 = students[11];
		falseAnswer2 = students[63];
	}
	if ((murderer.name === "Anzu Kofuku" || murderer.name === "Yuuya Michimiya") && evidenceClue === "A few pieces of currency were found in the victim's pocket.") {
		falseAnswer1 = students[4];
		falseAnswer2 = students[56];
	}
	if ((murderer.name === "Shiba Mikio" || murderer.name === "Hoshi Chiura") && evidenceClue === "A suicide note was found next to the victim.") {
		falseAnswer1 = students[23];
		falseAnswer2 = students[9];
	}
	if ((murderer.name === "Jacek Żeglarski" || murderer.name === "Kaipo Uilani Iona") && evidenceClue === "Pellets of animal feed were found near the body.") {
		falseAnswer1 = students[10];
		falseAnswer2 = students[43];
	}
	if ((murderer.name === "Jacek Żeglarski" || murderer.name === "Inugami Uzuki") && evidenceClue === "A leash was fastened around the victim's neck.") {
		falseAnswer1 = students[10];
		falseAnswer2 = students[64];
	}
	if ((murderer.name === "Minako Kaoru" || murderer.name === "Mariko Murakami") && evidenceClue === "A bamboo sword was left at the scene.") {
		falseAnswer1 = students[17];
		falseAnswer2 = students[70];
	}
	if ((murderer.name === "Aemele Dèjré" || murderer.name === "Santo Verdugo Bautista") && evidenceClue === "The victim was found without their clothing.") {
		falseAnswer1 = students[57];
		falseAnswer2 = students[77];
	}
	if ((murderer.name === "Souma Shimizu" || murderer.name === "Santo Verdugo Bautista") && evidenceClue === "A gun was found at the scene.") {
		falseAnswer1 = students[52];
		falseAnswer2 = students[77];
	}
	if ((murderer.name === "Anaelle Hamaan" || murderer.name === "Mariko Murakami" || murderer.name === "Isago Achikita") && evidenceClue === "A scrap of black fabric was found in the victim's palm.") {
		falseAnswer1 = students[2];
		falseAnswer1 = students[70];
		falseAnswer2 = students[82];
	}
	if ((murderer.name === "Anaelle Hamaan" || murderer.name === "Hoshi Chiura") && evidenceClue === "A scrap of orange fabric was found at the scene.") {
		falseAnswer1 = students[2];
		falseAnswer2 = students[9];
	}
	if ((murderer.name === "Areli Vepkhia" || murderer.name === "Inugami Uzuki") && evidenceClue === "There are scratch marks on the victim's abdomen.") {
		falseAnswer1 = students[59];
		falseAnswer2 = students[64];
	}
	if ((murderer.name === "Théo Dubois" || murderer.name === "Kaipo Uilani Iona" || murderer.name === "Ale del Prieto") && evidenceClue === "A feather was found at the scene.") {
		falseAnswer1 = students[27];
		falseAnswer2 = students[43];
		falseAnswer3 = students[32];
	}
	if ((murderer.name === "Ayuma Tanaka" || murderer.name === "Jomei Hoshino" || murderer.name === "Miyuki Hayashi") && evidenceClue === "The scent of something burning lingers at the scene.") {
		falseAnswer1 = students[60];
		falseAnswer2 = students[65];
		falseAnswer3 = students[73];
	}
	if ((murderer.name === "S'ad Ludópata" || murderer.name === "Anzu Kofuku" || murderer.name === "Yuuya Michimiya") && evidenceClue === "Coins were found in the victim's mouth.") {
		falseAnswer1 = students[22];
		falseAnswer2 = students[4];
		falseAnswer3 = students[56];
	}
	if ((murderer.name === "Cheisu Maeda" || murderer.name === "Ale del Prieto") && evidenceClue === "A magnifying glass was found at the scene.") {
		falseAnswer1 = students[7];
		falseAnswer3 = students[32];
	}
	if ((murderer.name === "S'ad Ludópata" || murderer.name === "Ryoushi Nobuori") && evidenceClue === "A mystery novel titled *The Kidnapped* was found at the scene.") {
		falseAnswer1 = students[22];
		falseAnswer2 = students[76];
	}
	if ((murderer.name === "Hachi Hiruma" || murderer.name === "Jomei Hoshino" || "Miyuki Hayashi") && evidenceClue === "The temperature of the room the victim was found in was incredibly high.") {
		falseAnswer1 = students[8];
		falseAnswer2 = students[65];
		falseAnswer3 = students[73];
	}
	if ((murderer.name === "Eiichi Ryozo" || murderer.name === "Saeko Kiyomizu") && (evidenceClue === "A vial of poison was found at the scene." || evidenceClue === "A broken bottle of poison was found at the scene.")) {
		falseAnswer1 = students[36];
		falseAnswer2 = students[50];
	}
	if ((murderer.name === "Jomei Hoshino" || murderer.name === "Miyuki Hayashi") && (evidenceClue === "There were traces of gasoline at the scene.")) {
		falseAnswer1 = students[65];
		falseAnswer2 = students[73];
	}
	if ((murderer.name === "Kazuya Harada" || murderer.name === "Eiji Ryozo" || murderer.name === "Wolfgang Schwarz") && evidenceClue === "A saw was found at the scene.") {
		falseAnswer1 = students[12];
		falseAnswer2 = students[37];
		falseAnswer3 = students[79];
	}
	if ((murderer.name === "Eiji Ryozo" || murderer.name === "Santo Verdugo Bautista" || murderer.name === "Wolfgang Schwarz") && evidenceClue === "The victim was killed with flawless medical precision.") {
		falseAnswer2 = students[37];
		falseAnswer2 = students[77];
		falseAnswer3 = students[79];
	}
	if ((murderer.name === "Anaelle Hamaan" || murderer.name === "Eiji Ryozo") && evidenceClue === "A pair of scissors were found at the scene.") {
		falseAnswer1 = students[2];
		falseAnswer2 = students[37];
	}
	if ((murderer.name === "Anaelle Hamaan" || murderer.name === "Fenikku Hinotama") && evidenceClue === "A scrap of red and blue fabric was found clutched in the victim's hand.") {
		falseAnswer1 = students[2];
		falseAnswer2 = students[38];
	}
	if ((murderer.name === "Hana Kageriri" || murderer.name === "Michel Voigt" || murderer.name === "Daichi Ichihara") && evidenceClue === "A wooden cross was found at the scene.") {
		falseAnswer1 = students[39];
		falseAnswer2 = students[47];
		falseAnswer3 = students[62];
	}
	if ((murderer.name === "Hideo Takayama" || murderer.name === "Tomomi Kashichi") && evidenceClue === "Small pieces of machinery were found at the scene.") {
		falseAnswer1 = students[40];
		falseAnswer2 = students[53];
	}
	if ((murderer.name === "Kouki Yoshida" || murderer.name === "Kirakira Kyuti") && evidenceClue === "There is no evidence of the killer touching the victim.") {
		falseAnswer1 = students[45];
		falseAnswer2 = students[67];
	}
	if ((murderer.name === "Melchor Guadalupe Paz de la Cruz" || murderer.name === "Kirakira Kyuti") && evidenceClue === "A megaphone was found at the scene.") {
		falseAnswer1 = students[72];
		falseAnswer2 = students[67];
	}
	if ((murderer.name === "Yukine Sakurai" || murderer.name === "Kyabetsu Retesu") && evidenceClue === "A lotus petal was found near the victim.") {
		falseAnswer1 = students[29];
		falseAnswer2 = students[46];
	}
	if ((murderer.name === "Kaipo Uilani Iona" || murderer.name === "Kyabetsu Retesu") && evidenceClue === "The footprints appear to be from flip flops.") {
		falseAnswer1 = students[43];
		falseAnswer2 = students[46];
	}
	if ((murderer.name === "Cecilio Gonzalo Calles Cárdenas" || murderer.name === "Inugami Uzuki" || murderer.name === "Wolfgang Schwarz") && evidenceClue === "A patch of a country's flag was found in the pocket of the victim.") {
		falseAnswer1 = students[61];
		falseAnswer2 = students[64];
		falseAnswer3 = students[79];
	}
	if ((murderer.name === "Ryoushi Nobuori" || murderer.name === "Tsuyo Kogiyumi") && evidenceClue === "A torn out page from a book was found at the scene.") {
		falseAnswer1 = students[54];
		falseAnswer2 = students[76];
	}
	if ((murderer.name === "Kagami Hannei" || murderer.name === "Dia Ramos") && evidenceClue === "A gold, hoop earring was found at the scene.") {
		falseAnswer1 = students[42];
		falseAnswer2 = students[63];
	}
	if ((murderer.name === "Minako Kaoru" || murderer.name === "Chika Miyasaki") && evidenceClue === "A custom-made knife was found at the scene.") {
		falseAnswer1 = students[17];
		falseAnswer2 = students[34];
	}
	if ((murderer.name === "Kagami Hannei" || murderer.name === "Cheisu Maeda" || murderer.name === "Souma Shimizu" || murderer.name === "Ale del Prieto") && evidenceClue === "A silver ring was found at the scene.") {
		falseAnswer1 = students[42];
		falseAnswer2 = students[7];
		falseAnswer3 = students[52];
		falseAnswer4 = students[32];
	}
	if ((murderer.name === "Kagami Hannei" || murderer.name === "Anaelle Hamaan" || murderer.name === "Megu Kojima") && evidenceClue === "Shreds from a dress were found at the scene.") {
		falseAnswer1 = students[46];
		falseAnswer2 = students[2];
		falseAnswer3 = students[16];
	}
	if ((murderer.name === "Yukine Sakurai" || murderer.name === "Kyabetsu Retesu" || murderer.name === "Shiba Mikio") && evidenceClue === "Flowers petals were found at the scene.") {
		falseAnswer1 = students[29];
		falseAnswer2 = students[46];
		falseAnswer3 = students[23];
	}
	if ((murderer.name === "Yukine Sakurai" || murderer.name === "Kyabetsu Retesu" || murderer.name === "Megami Himura") && evidenceClue === "Rose petals were found around the victim's body.") {
		falseAnswer1 = students[29];
		falseAnswer2 = students[46];
		falseAnswer3 = students[71];
	}
	if ((murderer.name === "S'ad Ludópata" || murderer.name === "Saeko Kiyomizu" || murderer.name === "Michel Voigt" || murderer.name === "Mariko Murakami") && evidenceClue === "The victim was crucified.") {
		falseAnswer1 = students[22];
		falseAnswer2 = students[50];
		falseAnswer3 = students[47];
		falseAnswer4 = students[70];
	}
	if ((murderer.name === "Jeong Park" || murderer.name === "Miyuki Ataru" || murderer.name === "Rosendo Paulo Ochoa Merlo") && evidenceClue === "A bloody sports ball was found at the scene.") {
		falseAnswer1 = students[11];
		falseAnswer2 = students[18];
		falseAnswer3 = students[49];
	}
	if ((murderer.name === "Mori Hibana" || murderer.name === "Eiichi Ryozo" || murderer.name === "Isha Kalki" || murderer.name === "Shinji Minoru") && evidenceClue === "The victim had recently been drugged or poisoned.") {
		falseAnswer1 = students[19];
		falseAnswer2 = students[36];
		falseAnswer3 = students[41];
		falseAnswer4 = students[78];
	}
	if ((murderer.name === "Aika Mahaya" || murderer.name === "Asahi Fukuzawa" || murderer.name === "Kagami Hannei" || murderer.name === "Tsuyo Kogiyumi" || murderer.name === "Rosendo Paulo Ochoa Merlo") && evidenceClue === "A necklace was found on the victim's body.") {
		falseAnswersOverlap = shuffle([students[0], students[33], students[46], students[49], students[54]]);
		falseAnswer1 = falseAnswersOverlap.shift();
		falseAnswer2 = falseAnswersOverlap.shift();
		falseAnswer3 = falseAnswersOverlap.shift();
		falseAnswer4 = falseAnswersOverlap.shift();
	}
	if ((murderer.name === "Hoshi Chiura" || murderer.name === "Junko Saitou") && evidenceClue === "A death poem was stuffed into the victim's pocket.") {
		falseAnswer1 = students[9];
		falseAnswer2 = students[66];
	}
	if ((murderer.name === "Junko Saitou" || murderer.name === "Megami Himura" || murderer.name === "Anaelle Hamaan") && evidenceClue === "A scrap of striped fabric was found on the floor of the scene.") {
		falseAnswer1 = students[66];
		falseAnswer2 = students[71];
		falseAnswer3 = students[2];
	}
	if ((murderer.name === "Aika Mahaya" || murderer.name === "Rosendo Paulo Ochoa Merlo" || murderer.name === "Junko Saitou") && evidenceClue === "There was a puddle of vomit at the scene.") {
		falseAnswer1 = students[0];
		falseAnswer2 = students[49];
		falseAnswer3 = students[66];
	}
	if ((murderer.name === "Souma Shimizu" || murderer.name === "Kyosuke Maki") && evidenceClue === "A red hair clip was found on the ground of the scene.") {
		falseAnswer1 = students[52];
		falseAnswer2 = students[69];
	}
	if ((murderer.name === "Ara Ayao" || murderer.name === "Megu Kojima" || murderer.name === "Hana Kageriri" || murderer.name === "Tsuyo Kogiyumi") && evidenceClue === "The scent of a sweet perfume lingers at the scene.") {
		falseAnswer1 = students[5];
		falseAnswer2 = students[16];
		falseAnswer3 = students[39];
		falseAnswer4 = students[54];
	}
	if ((murderer.name === "Ara Ayao" || murderer.name === "Eiichi Ryozo" || murderer.name === "Areli Vepkhia" || murderer.name === "Inugami Uzuki" || murderer.name === "Jomei Hoshino" || murderer.name === "Kyosuke Maki" || murderer.name === "Miyuki Hayashi" || murderer.name === "Kotone Fukuzawa") && evidenceClue === "The victim's body is badly mutilated.") {
		falseAnswersOverlap = shuffle([students[5], students[36], students[59], students[64], students[65], students[69], students[73], students[80]]);
		falseAnswer1 = falseAnswersOverlap.shift();
		falseAnswer2 = falseAnswersOverlap.shift();
		falseAnswer3 = falseAnswersOverlap.shift();
		falseAnswer4 = falseAnswersOverlap.shift();
	}
	if ((murderer.name === "Charles Miller" || murderer.name === "Piper McCullough") && evidenceClue === "An American flag was tucked into the victim's clothing.") {
		falseAnswer1 = students[83];
		falseAnswer2 = students[84];
	}
}

/*Murder Mystery Generate Hair Clues Function*/
function generateHairClue(hairMurderer, hairA, hairB, hairC, hairD, hairE) {
	falseHair1 = random([hairA, hairB]);
	falseHair2 = random([hairC, hairD, hairE]);

	suspectHairs = shuffle([hairMurderer, falseHair1, falseHair2]);

	if (suspectHairs[0] != suspectHairs[1] && suspectHairs[0] != suspectHairs[2] && suspectHairs[1] != suspectHairs[2]) {
		hairClue = `There was one strand of **${suspectHairs[0]}**, **${suspectHairs[1]}**, and **${suspectHairs[2]}** hair each found at the scene.`;
	}
	if (suspectHairs[0] === suspectHairs[1] && suspectHairs[1] != suspectHairs[2]) {
		hairClue = `There were two strands of **${suspectHairs[0]}** hair and one strand of **${suspectHairs[2]}** hair found at the scene.`;
	}
	if (suspectHairs[0] === suspectHairs[2] && suspectHairs[1] != suspectHairs[2]) {
		hairClue = `There were two strands of **${suspectHairs[0]}** hair and one strand of **${suspectHairs[1]}** hair found at the scene.`;
	}
	if (suspectHairs[1] === suspectHairs[2] && suspectHairs[0] != suspectHairs[1]) {
		hairClue = `There were two strands of **${suspectHairs[1]}** hair and one strand of **${suspectHairs[0]}** hair found at the scene.`;
	}
	if (suspectHairs[0] === suspectHairs[1] && suspectHairs[1] === suspectHairs[2]) {
		hairClue = `There were three strands of **${suspectHairs[0]}** hair found at the scene.`;
	}
}

/*Murder Mystery Generate Murder Scenario*/
function generateMurderScenario() {
	scenarios = [
		`The victim was found in their dormitory's bathroom, propped against the wall of the shower.`,
		`The victim was found tied up to two pieces of exercise equipment, suspended in the air and bloody.`,
		`The victim was found in the nurse's office on the floor, blood pooling around them from their head.`,
		`The victim was found in the storage closet on the floor, blood pooling around them from their head.`,
		`The victim was found sitting in a chair in the recreation room.`,
		`The victim was found underneath a table in the dining hall, multiple stab wounds in their stomach.`,
		`The victim was found in the beach house with blood surrounding them and a large, blunt force trauma wound to their head.`,
		`The victim was found in the girl's bathroom on the second floor.`,
		`The victim was found in the dojo with a trail of blood leading towards the various weapons on the wall.`,
		`The victim was found in the dance room, crucified on the wall with knives through their hands.`,
		`The victim was found in the library on a couch.`,
		`The victim was found in the sauna, presumably having died from a heat stroke among other causes.`,
		`The victim was found in the greenhouse within a bush.`,
		`The victim was found in a bed in the nurse's office, their stomach was completely sliced open.`,
		`The victim was found in the gymnasium strapped to a wheel with various throwing darts in their body.`,
		`The victim was found in the incinerator, almost unrecognizable.`,
		`The victim was found burning in a bonfire on the beach.`,
		`The victim was found in the dining room, crucified with knives through their wrists.`,
		`The victim was found on the roof of the school, their body completely disemboweled.`,
		`The victim was found crushed underneath a chandelier in the lobby of the school.`,
		`The victim was found in the kitchen, electrocuted to death.`,
		`The victim was found in their dormitory's bed, their throat was slit.`,
		`The victim was found in the locker room, their head presumably having been bashed in to the lockers many times.`,
		`The victim was found in their laboratory, tied to a chair and appearing to have been tortured.`,
	];

	murderScene = random(scenarios);
}

/*Sprites*/
const monomi_01 = "https://i.imgur.com/qPus4i8.png" //Idle
const monomi_02 = "https://i.imgur.com/osGVXUm.png" //Tilted "Oh?"
const monomi_03 = "https://i.imgur.com/9O57oZQ.png" //Questioning
const monomi_04 = "https://i.imgur.com/wlLTX25.png" //Confident
const monomi_05 = "https://i.imgur.com/ykA22jB.png" //Daydreaming
const monomi_06 = "https://imgur.com/fPfgtia.png" //Uwah cute!!
const monomi_07 = "https://imgur.com/tuHesOr.png" //Arms out
const monomi_08 = "https://imgur.com/wcPxyrp.png" //Waving
const monomi_09 = "https://imgur.com/SKefhXW.png" //Rawr
const monomi_10 = "https://imgur.com/xDjEKNi.png" //Angry
const monomi_11 = "https://imgur.com/EzynLHo.png" //Surprised
const monomi_12 = "https://imgur.com/NrOMs4R.png" //Glum
const monomi_13 = "https://imgur.com/cJY8DLk.png" //Mushrooms
const monomi_14 = "https://imgur.com/jPK8YNM.png" //Crying to the left
const monomi_15 = "https://imgur.com/f1mB0oL.png" //Crying to the right
const monomi_16 = "https://imgur.com/RTyr64W.png" //Crying into hands
const monomi_17 = "https://imgur.com/YPP88Kp.png" //Thinking
const monomi_18 = "https://imgur.com/rCfZ2An.png" //Sweating
const monomi_19 = "https://imgur.com/SIlBLpg.png" //Scared
const monomi_20 = "https://imgur.com/P4oFLJf.png" //Roughed up
const monomi_21 = "https://imgur.com/wnKaFml.png" //Blood
const monomi_22 = "https://imgur.com/4Pyqd1A.png" //Dress
const monomi_trial1 = "https://imgur.com/Z5fvnH2.png" //Idle BDSM
const monomi_trial2 = "https://imgur.com/Py6hUco.png" //Titled "Oh?" BDSM
const monomi_trial3 = "https://imgur.com/zA335nU.png" //Questioning BDSM
const monomi_trial4 = "https://imgur.com/aQKQ93N.png" //Waving BDSM
const monomi_trial5 = "https://imgur.com/e4fOibt.png" //Surprised BDSM
const monomi_trial6 = "https://imgur.com/bjsliUH.png" //Glum BDSM
const monomi_trial7 = "https://imgur.com/cP4pGHR.png" //Mushrooms BDSM
const monomi_trial8 = "https://imgur.com/pDtdNiZ.png" //Scared BDSM

client.on("ready", () => { //When Monomi is turned on.
	//Initializes the inbox location.
	const inboxGuild = client.guilds.find('id', '480549161201041418');
	const inboxChannel = inboxGuild.channels.find('name', 'monomi-inbox');
	//Notifies the console and inbox that Monomi has been activated.
	console.log("");
	console.log("Monomi has arrived on the island!");
	console.log("");
	inboxChannel.send("Monomi has been turned on.")
	//Sets Monomi's discord status
	client.user.setPresence({
		status: 'dnd',
		game: {
			name: "Try 'm!help'!"
		}
	});
});

client.on('guildMemberAdd', member => { //Upon the joining of a member to a guild.
	if (member.guild.id != "455218035507331072") return; //Ignore it if the guild isn't the KS server.
	const channel = member.guild.channels.find('name', 'general'); //Set channel to the 'general' channel.
	if (member.bot === true) return; //If the member is a bot, ignore it.
	channel.send({
		embed: { //Send a welcome message,
			color: 15285149,
			description: `Welcome to the classroom, ${member}.\nPlease introduce yourself to the class\nin ${member.guild.channels.find(channel => channel.name === "introduction").toString()}!`,
			"image": {
				"url": monomi_08
			}
		}
	}).then(msg => {
		msg.delete(60000)
	});
	member.addRole(member.guild.roles.find('id', '455218733980450825')); //Give the member the 'Ultimates' role.
});

let prefix = "m!"; //Sets the command prefix to m!
client.on("message", (message) => { //When a message is sent.
	if (message.author.bot === true) return; //If the message is from a bot, ignore it.

	//Initializes the inbox location.
	const inboxGuild = client.guilds.find('id', '480549161201041418');
	const inboxChannel = inboxGuild.channels.find('name', 'monomi-inbox');


	//Rise And Shine, Ursine
	if (message.content.toLowerCase().startsWith("he is all that remains of a once powerful nation")) {
		message.channel.send("Right now, you're on the threshold of an amazing adventure.");
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_09
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}

	//I love you!
	if (message.content.toLowerCase().startsWith("i love you monomi") || message.content.toLowerCase().startsWith("i love you, monomi") || message.content.toLowerCase().startsWith("i love monomi") || message.content.toLowerCase().startsWith("monomi i love you")) {
		inboxChannel.send(`${message.author.username} loves Monomi!`);
		message.channel.send(`I love you too, ${message.author.username}!`);
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_06
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}

	//Monomi Harassment
	if (message.content.toLowerCase().startsWith("i want monomi to fuck me") || message.content.toLowerCase().startsWith("fuck me monomi") || message.content.toLowerCase().startsWith("i want monomi to vore me") || message.content.toLowerCase().startsWith("vore me monomi")) {
		if (message.author.id === "334575513857163266") {
			inboxChannel.send("Twyla has given Monomi her consent if she would like to... do you know what.");
			message.channel.send(`If that's what you want me to do, Twyla-chan... I'll gladly do it...`);
			message.channel.send({
				embed: {
					color: 15285149,
					"image": {
						"url": monomi_17
					}
				}
			}).then(msg => {
				msg.delete(10000)
			});
			return;
		}
		inboxChannel.send(`${message.author.username} has confessed that they would like Monomi to fuck them.`);
		message.channel.send(`Wha-wha?! You want me to do what, ${message.author.username}?`);
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_19
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}
	if (message.content.toLowerCase().startsWith("i want to fuck monomi") || message.content.toLowerCase().startsWith("i want to vore monomi")) {
		if (message.author.id === "334575513857163266") {
			inboxChannel.send("Monomi has given Twyla her consent if she would like to... do you know what.");
			message.channel.send(`If that's what you want to do to me, Twyla-chan... be my guest...`);
			message.channel.send({
				embed: {
					color: 15285149,
					"image": {
						"url": monomi_17
					}
				}
			}).then(msg => {
				msg.delete(10000)
			});
			return;
		}
		inboxChannel.send(`${message.author.username} has confessed that they would like to fuck Monomi.`);
		message.channel.send(`Wha-wha?! You want to do what, ${message.author.username}?`);
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_19
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}
	if (message.content.toLowerCase().startsWith("fuck off monomi") || message.content.toLowerCase().startsWith("fuck you monomi") || message.content.toLowerCase().startsWith("go away monomi") || message.content.toLowerCase().startsWith("die monomi") || message.content.toLowerCase().startsWith("go die monomi") || message.content.toLowerCase().startsWith("monomi die") || message.content.toLowerCase().startsWith("i hate monomi") || message.content.toLowerCase().startsWith("i hate you monomi")) {
		inboxChannel.send(`${message.author.username} told Monomi to fuck off.`);
		message.channel.send(`What did I do? I'm sorry...`);
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_15
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}

	//Johnny Johnny
	if (message.content.toLowerCase().startsWith("monomi monomi")) {
		message.channel.send("Yes papa?");
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_03
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}
	if (message.content.toLowerCase().startsWith("working with monokuma")) {
		message.channel.send("No papa.");
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_18
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}
	if (message.content.toLowerCase().startsWith("eating sugar")) {
		message.channel.send("No papa.");
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_18
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}
	if (message.content.toLowerCase().startsWith("telling lies")) {
		message.channel.send("No papa.");
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_19
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}
	if (message.content.toLowerCase().startsWith("open your mouth")) {
		message.channel.send("Ha ha ha!");
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_04
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}

	//Mouse
	if (message.content.toLowerCase().search("mouse") != -1 || message.content.toLowerCase().search("mice") != -1) {
		inboxChannel.send(`${message.author.username} has scared Monomi with mice.`);
		message.channel.send("Noooooooooo... Not miiiiiiiiice...! They're gonna chew through my ears...!");
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_14
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return;
	}

	//Kill This Clown
	if (message.content.toLowerCase().startsWith("monomi kill this clown") || message.content.toLowerCase().startsWith("monomi, kill this clown")) {
		inboxChannel.send(`${message.author.username} has asked Monomi to kill this clown.`);
		message.channel.send("I'm on it!");
		message.channel.send({
			embed: {
				color: 15285149,
				"image": {
					"url": monomi_04
				}
			}
		}).then(msg => {
			msg.delete(10000)
		});
		return
	}

	/*//SQLite stores levels, adds an XP point for every message, and notifies users when they level up.
	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		if (!row) { //Initializes a row for a user if they do not currently have one.
			sql.run("INSERT INTO scores (userId, points, level, cooldown, hopefragments) VALUES (?, ?, ?, ?, ?)", [message.author.id, 1, 0, 'hi', 0, ]);
		} else { //If they do have one, however.
			let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
			if (curLevel > row.level) {
				row.level = curLevel;
				sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
				if (message.guild.id === "405902161411833856") { //Gaymers
					if (message.channel.name === "rants-and-vents" || message.channel.name === "introductions" || message.channel.name === "announcements-and-server-discussion" || message.channel.name === "rules" || message.channel.name === "server-info") {
						return
					} else {
						message.reply(`you've leveled up to level **${curLevel}**! You're doing great! Keep it up!`);
						message.channel.send({
							embed: {
								color: 15285149,
								"image": {
									"url": monomi_06
								}
							}
						}).then(msg => {
							msg.delete(10000)
						});
					}
				}
			}
			sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
		}
	}).catch(() => { //Initializes a row for a user if they do not currently have one.
		console.error;
		sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER, cooldown TEXT, hopefragments INTEGER)").then(() => {
			sql.run("INSERT INTO scores (userId, points, level, cooldown, hopefragments) VALUES (?, ?, ?, ?, ?)", [message.author.id, 1, 0, 'hi', 0]);
		});
	});*/

	if (!message.content.startsWith(prefix)) return;
	if (message.guild.id === "455218035507331072") { //Kaeno Shinjomu Discord
		if (message.channel.name === "introduction" || message.channel.name === "rules" || message.channel.name === "server-info" || message.channel.name === "announcements") {
			return message.channel.send("Please don't use me in this channel!  Thank you!").then(msg => {
				message.delete(5000);
				msg.delete(5000);
			})
		}
	}
	if (message.guild.id === "405902161411833856") { //Gaymers
		if (message.channel.name === "rants-and-vents" || message.channel.name === "introductions" || message.channel.name === "announcements-and-server-discussion" || message.channel.name === "rules" || message.channel.name === "server-info") {
			return
		}
	}

	//Obtains the arguments and command, respectively, from the message.
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	//Help Command
	if (command === "help" || command === "h") {
		if (args.length > 0) {
			inboxChannel.send(`${message.author.username} has asked for help from Monomi on the "${args[0]}" command.`);
			if (args[0] === 'love' || args[0] === 'ship') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'love'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!love @DiscordUser @DiscordUser`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!ship`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi shows you the love meter between two students!"
							}
						]
					}
				})
			};
			if (args[0] === 'help') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'help'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!help`\n`m!help [command]`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!h`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi gives you a list of all the commands Monomi can perform, as well as being able to detail what a specific command does."
							}
						]
					}
				})
			};
			if (args[0] === 'ping') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'ping'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!ping`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi pings you back!"
							}
						]
					}
				})
			};
			if (args[0] === 'shutdown') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'shutdown'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!shutdown`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!s`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi shuts down!  Only Dee can execute this command."
							}
						]
					}
				})
			};
			if (args[0] === 'execute') {
				message.channel.send({
					embed: {
						color: 13959168,
						author: {
							name: "Monokuma",
							icon_url: "https://i.imgur.com/JxJpD8W.png"
						},
						title: "Command 'execute'",
						fields: [{
								name: ":skull_crossbones: Usage",
								value: "`m!execute @DiscordUser`",
							},
							{
								name: ":skull_crossbones: Description",
								value: "Monokuma executes a person of your choice!"
							}
						]
					}
				})
			};
			if (args[0] === 'ask') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'ask'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!ask [your question]`\n`m!ask who [your question]`\n`m!ask which [choice] or [choice] or ...`\n`m!ask why [your question]`\n`m!ask how [your question]`\n`m!ask where [your question]`\n`m!ask when [your question]`\n`m!ask what [your question]`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi gives you the answers to your questions!"
							}
						]
					}
				})
			};
			if (args[0] === 'hope') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'hope'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!hope`\n`m!hope @DiscordUser`\n`m!hope give @DiscordUser`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Gives someone a hope fragment, which can only be given once every twelve hours.  This command can also be used to see how many hope fragments"
							}
						]
					}
				})
			};
			if (args[0] === 'rank') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'rank'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!rank`\n`m!rank @DiscordUser`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi tells the rank of a student!"
							}
						]
					}
				})
			};
			if (args[0] === 'cow') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'cow'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!cow @DiscordUser`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi turns a student into a cow!"
							}
						]
					}
				})
			};
			if (args[0] === 'chicken') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'chicken'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!chicken @DiscordUser`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi turns a student into a chicken!"
							}
						]
					}
				})
			};
			if (args[0] === 'kill' || args[0] === 'perish' || args[0] === 'destroy') {
				message.channel.send({
					embed: {
						color: 13959168,
						author: {
							name: "Monokuma",
							icon_url: "https://i.imgur.com/JxJpD8W.png"
						},
						title: "Command 'kill'",
						fields: [{
								name: ":skull_crossbones: Usage",
								value: "`m!kill`",
							},
							{
								name: ":skull_crossbones: Aliases",
								value: "`m!perish` `m!destroy`",
							},
							{
								name: ":skull_crossbones: Description",
								value: "Monokuma kills Monomi!"
							}
						]
					}
				})
			};
			if (args[0] === 'credits') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'credits'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!credits`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi tells you who helped make her!"
							}
						]
					}
				})
			};
			if (args[0] === 'roster' || args[0] === 'class' || args[0] === 'r') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'roster'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!roster [class] [student number/student name]`\n`m!roster [class] total`\n`m!roster talents`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!class`\n`m!r`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi gives a list of all of her students!"
							}
						]
					}
				})
			};
			if (args[0] === 'noodle') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'noodle'",
						fields: [{
								name: ":spaghetti: Usage",
								value: "`m!noodle`",
							},
							{
								name: ":spaghetti: Description",
								value: "oh yeah noodle"
							}
						]
					}
				})
			};
			if (args[0] === 'sprites') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'sprites'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!sprites`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi sends a message containing links to masterposts containing the class sprites."
							}
						]
					}
				})
			};
			if (args[0] === 'play' || args[0] === 'p') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'play'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!play [youtube url]`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!p`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi plays a song or adds one to the queue."
							}
						]
					}
				})
			};
			if (args[0] === 'rusdefine') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'rusdefine'",
						thumbnail: {
							"url": "https://imgur.com/3jzc9fM.png"
						},
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!rusdefine`\n`m!rusdefine [word]`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "The Official Ruslan Eun-Kyung Kraus Dictionary! All words made up by Ruslan are kept here."
							}
						]
					}
				})
			};
			if (args[0] === 'remove' || args[0] === 'rm') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'remove'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!remove [number in queue]`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!rm`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi removes a song from the queue!"
							}
						]
					}
				})
			};
			if (args[0] === 'move' || args[0] === 'm') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'move'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!move [move from] [move to]`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!m`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi moves a song through the queue!"
							}
						]
					}
				})
			};
			if (args[0] === 'queue' || args[0] === 'q') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'queue'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!queue`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!q`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi displays the queue!"
							}
						]
					}
				})
			};
			if (args[0] === 'loop' || args[0] === 'l') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'loop'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!loop`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!l`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi loops the current song!"
							}
						]
					}
				})
			};
			if (args[0] === 'loopqueue' || args[0] === 'lq' || args[0] === 'qloop' || args[0] === 'loopq') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'loopqueue'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!loopqueue`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!lq`\n`m!qloop`\n`m!loopq`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi loops the current queue!"
							}
						]
					}
				})
			};
			if (args[0] === 'skip' || args[0] === 'next') {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'roster'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!skip`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!next`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi skips the current song!"
							}
						]
					}
				})
			};
			if (args[0] === "disconnect" || args[0] === "dc" || args[0] === "dis" || args[0] === "d" || args[0] === "clear" || args[0] === "cl" || args[0] === "fuckoff" || args[0] === "leave") {
				message.channel.send({
					embed: {
						color: 13959168,
						title: "Command 'disconnect'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!roster [class number] [student number/student name]`\n`m!roster [class number] total`",
							},
							{
								name: ":heart_exclamation: Aliases",
								value: "`m!dc`\n`m!dis`\n`m!d`\n`m!clear`\n`m!cl`\n`m!leave`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi leaves the classroom!"
							}
						]
					}
				})
			};
			if (args[0] === 'mm') {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'mm'",
						fields: [{
								name: ":heart_exclamation: Usage",
								value: "`m!mm`",
							},
							{
								name: ":heart_exclamation: Description",
								value: "Monomi's Murder Mystery!  A small minigame in which Monomi presents you with a victim and six possible murderers, along with three clues about the murderer.  You have two minutes to figure out who dunnit!"
							}
						]
					}
				})
			};
			if (args[0] === "roomies") {
				message.channel.send({
					embed: {
						color: 15285149,
						title: "Command 'roomies'",
						fields: [{
							name: ":heart_exclamation: Usage",
							value: "`m!roomies`\n`m!roomies [1-12]`\n`m!roomies [student]`",
						},
						{
							name: ":heart_exclamation: Description",
							value: "Monomi gives a list of every room on the killing school ride, as well as descriptions and inhabitants of each!"
						}
						]
					}
				})
			}
		} else {
			inboxChannel.send(`${message.author.username} has asked for help from Monomi.`);
			message.channel.send({
				embed: {
					color: 15285149,
					title: "Type 'm!' followed by a command!",
					description: "Here's a list of commands I can perform for you!  Do `m!help [command]` for more info on a specific command.",
					fields: [{
							name: ":heart_exclamation: Admin",
							value: "`shutdown`"
						},
						{
							name: ":heart_exclamation: Class",
							value: "`roster` `roomies` `sprites`"
						},
						{
							name: ":heart_exclamation: Fun",
							value: "`mm` `rusdefine` `love` `hope` `ask` `execute` `kill` `cow` `chicken` `noodle`"
						},
						{
							name: ":heart_exclamation: Music",
							value: "`play` `remove` `move` `queue` `loop` `loopqueue` `skip` `disconnect`",
						},
						{
							name: ":heart_exclamation: Utility",
							value: "`ping` `rank` `credits`"
						}
					]
				}
			})
		}
	}

	//Admin Commands
	if (command === "shutdown" || command === "s") {
		function shutdown() {
			console.log("");
			console.log("Monomi has left the island!");
			process.exit()
		};
		if (message.author.discriminator == '7134') {
			inboxChannel.send("Monomi has been turned off.")
			message.channel.send("Good night, everyone!  Love love!");
			message.channel.send({
				embed: {
					color: 15285149,
					"image": {
						"url": monomi_05
					}
				}
			}).then(msg => {
				msg.delete(5000)
			});
			setTimeout(shutdown, 6000);
		} else {
			message.channel.send("Only Dee can shut me off, silly!");
			message.channel.send({
				embed: {
					color: 15285149,
					"image": {
						"url": monomi_04
					}
				}
			}).then(msg => {
				msg.delete(10000)
			});
			inboxChannel.send(`${message.author.username} has tried to shut down Monomi.`);
		}
	}
	if (command === "monomisay") {
		if (args[0].toLowerCase() === ".sprites") {
			message.channel.send({
				embed: {
					color: 15285149,
					title: "Native Message Sprites List",
					"image": {
						"url": "https://imgur.com/pitSr1L.png"
					},
					description: "Below is a diagram containing all sprites available for use. Just put the name of the sprite before your message when using the m!nativemsg command to use one!\n\nFor example: \"m!nativemsg spam monomi_08 Hewwo!\""
				}
			});
			return
		};
		if (args.length <= 1) {
			message.channel.send("Please enter valid arguments for this command!  For example: \"m!nativemsg spam Hello world!\".");
			return
		};
		var nativeGuild = client.guilds.find('id', '455218035507331072');
		var nativeChannel = nativeGuild.channels.find('name', args[0].toLowerCase());
		if (nativeChannel === null) {
			message.channel.send("Please use a valid channel name!");
			return
		};
		if (args[1].search("monomi_") != -1) {
			if (args[1] === "monomi_01") {
				var url = monomi_01
			}
			if (args[1] === "monomi_02") {
				var url = monomi_02
			}
			if (args[1] === "monomi_03") {
				var url = monomi_03
			}
			if (args[1] === "monomi_04") {
				var url = monomi_04
			}
			if (args[1] === "monomi_05") {
				var url = monomi_05
			}
			if (args[1] === "monomi_06") {
				var url = monomi_06
			}
			if (args[1] === "monomi_07") {
				var url = monomi_07
			}
			if (args[1] === "monomi_08") {
				var url = monomi_08
			}
			if (args[1] === "monomi_09") {
				var url = monomi_09
			}
			if (args[1] === "monomi_10") {
				var url = monomi_10
			}
			if (args[1] === "monomi_11") {
				var url = monomi_11
			}
			if (args[1] === "monomi_12") {
				var url = monomi_12
			}
			if (args[1] === "monomi_13") {
				var url = monomi_13
			}
			if (args[1] === "monomi_14") {
				var url = monomi_14
			}
			if (args[1] === "monomi_15") {
				var url = monomi_15
			}
			if (args[1] === "monomi_16") {
				var url = monomi_16
			}
			if (args[1] === "monomi_17") {
				var url = monomi_17
			}
			if (args[1] === "monomi_18") {
				var url = monomi_18
			}
			if (args[1] === "monomi_19") {
				var url = monomi_19
			}
			if (args[1] === "monomi_20") {
				var url = monomi_20
			}
			if (args[1] === "monomi_21") {
				var url = monomi_21
			}
			if (args[1] === "monomi_22") {
				var url = monomi_22
			}
			if (args[1] === "monomi_trial1") {
				var url = monomi_trial1
			}
			if (args[1] === "monomi_trial2") {
				var url = monomi_trial2
			}
			if (args[1] === "monomi_trial3") {
				var url = monomi_trial3
			}
			if (args[1] === "monomi_trial4") {
				var url = monomi_trial4
			}
			if (args[1] === "monomi_trial5") {
				var url = monomi_trial5
			}
			if (args[1] === "monomi_trial6") {
				var url = monomi_trial6
			}
			if (args[1] === "monomi_trial7") {
				var url = monomi_trial7
			}
			if (args[1] === "monomi_trial8") {
				var url = monomi_trial8
			}
			nativeChannel.send(message.content.substring(`m!nativemsg ${args[0]} ${args[1]} `.length));
			nativeChannel.send({
				embed: {
					color: 15285149,
					"image": {
						"url": url
					}
				}
			});
			inboxChannel.send(`${message.author.username} made Monomi say, "${message.content.substring(`m!nativemsg ${args[0]} ${args[1]} `.length)}" with the "${args[1]}" sprite.`);
			return
		};
		nativeChannel.send(message.content.substring(`m!monomisay ${args[0]} `.length));
		inboxChannel.send(`${message.author.username} made Monomi say, "${message.content.substring(`m!nativemsg ${args[0]} `.length)}"`)
	}

	//Kaeno Commands
	if (command === "roster" || command === "class" || command === "r") {
		let embed = new Discord.RichEmbed()
			.setColor(13959168)
		
		let pages = [];
		let page = 0;

		studentID = "";
		if (args.length < 1 || args[0] != "1" && args[0] != "2" && args[0] != "3" && args[0] != "4" && args[0].toLowerCase() != "u" && args[0].toLowerCase() != "talents") {
			return message.channel.send("Please specify which class (1, 2, 3, 4, U, or talents) you're checking the roster for!")
		}
		if (args[0] === "1") { //Class 01 (Kaeno Shinjomu Academy, The Killing School Game)
			classList = [
				{ studentID: "Name: Aika Mahaya\nTalent: Digital Composer\nSex: Female\nStatus: Deceased\n\nShoe Size: 9\nHeight: 5'6\"\nWeight: 137\nBlood Type: B\nBirthday: 06/21\nAge: 17", studentIDPicture: "https://imgur.com/sGjckJ3.png" },
				{ studentID: "Name: Anaelle Hamaan\nTalent: Fashion Designer\nSex: Female\nStatus: Unknown\n\nShoe Size: Unavailable\nHeight: 5'2\"\nWeight: 104\nBlood Type: AB\nBirthday: 06/20\nAge: 16", studentIDPicture: "https://imgur.com/4HOZ1QT.png" },
				{ studentID: "Name: Anya Sakaguchi\nTalent: Magician\nSex: Female\nStatus: Deceased\n\nShoe Size: Unavailable\nHeight: 5'4\"\nWeight: 104\nBlood Type: B\nBirthday: 04/10\nAge: 14", studentIDPicture: "" },
				{ studentID: "Name: Ara Ayao\nTalent: Actress\nSex: Female\nStatus: Deceased\n\nShoe Size: 7\nHeight: 5'8\"\nWeight: 115\nBlood Type: B\nBirthday: 08/15\nAge: 17", studentIDPicture: "https://imgur.com/3fZhaHt.png" },
				{ studentID: "Name: Aurélie Cartier\nTalent: Figure Skater\nSex: Female\nStatus: Deceased\n\nShoe Size: 7\nHeight: 5'7\"\nWeight: 115\nBlood Type: A\nBirthday: 01/09\nAge: 17", studentIDPicture: "" },
				{ studentID: "Name: Hachi Hiruma\nTalent: Cryptologist\nSex: Female\nStatus: Deceased\n\nShoe Size: 7.5\nHeight: 5'7\"\nWeight: 139\nBlood Type: A\nBirthday: 11/09\nAge: 17\n\n\nPeed Herself: 13 Times", studentIDPicture: "https://imgur.com/GFrnNjz.png" },
				{ studentID: "Name: Jeong Park\nTalent: Tennis Player\nSex: Female\nStatus: Deceased\n\nShoe Size: 6\nHeight: 5'5\"\nWeight: 105\nBlood Type: O\nBirthday: 05/29\nAge: 16", studentIDPicture: "https://imgur.com/JK7VKYy.png" },
				{ studentID: "Name: Kyoung-mi Park\nTalent: Singer\nSex: Female\nStatus: Deceased\n\nShoe Size: 6\nHeight: 5'5\"\nWeight: 105\nBlood Type: O\nBirthday: 05/29\nAge: 16", studentIDPicture: "https://imgur.com/fZoA401.png" },
				{ studentID: "Name: Megu Kojima\nTalent: Model\nSex: Female\nStatus: Deceased\n\nShoe Size: 6\nHeight: 5'5\"\nWeight: 99\nBlood Type: O\nBirthday: 04/15\nAge: 17", studentIDPicture: "" },
				{ studentID: "Name: Minako Kaoru\nTalent: Swordsman\nSex: Female\nStatus: Deceased\n\nShoe Size: Unavailable\nHeight: 5'8\"\nWeight: 120\nBlood Type: O\nBirthday: 08/07\nAge: 16", studentIDPicture: "" },
				{ studentID: "Name: Mori Hibana\nTalent: Hypnotist\nSex: Female\nStatus: Rescued\n\nShoe Size: 8\nHeight: 5'9\"\nWeight: 131\nBlood Type: B\nBirthday: 05/08\nAge: 17", studentIDPicture: "https://imgur.com/AFaAdCo.png" },
				{ studentID: "Name: Noriko Suzuki\nTalent: Chess Champion\nSex: Female\nStatus: Deceased\n\nShoe Size: 7\nHeight: 5'3\"\nWeight: 110\nBlood Type: A\nBirthday: 06/09\nAge: 14", studentIDPicture: "" },
				{ studentID: "Name: Stella Hunter\nTalent: Fortnite Gamer\nSex: Female\nStatus: Deceased\n\nShoe Size: Unavailable\nHeight: 5'2\"\nWeight: 102\nBlood Type: A\nBirthday: 05/24\nAge: 15\n\n\nFortnite Statistics:\nWins: 5,562\nMatches: 13,192\nWin %: 42.16\nKills: 107,180\nK/D: 14.05", studentIDPicture: "" },
				{ studentID: "Name: Tezuku Imou\nTalent: Boxer\nSex: Female\nStatus: Deceased\n\nShoe Size: Unavailable\nHeight: 5'5\"\nWeight: 146\nBlood Type: O\nBirthday: 10/31\nAge: 16", studentIDPicture: "https://imgur.com/vqxvUSV.png"},
				{ studentID: "Name: Ximena Colomar\nTalent: Hacker\nSex: Female\nStatus: Deceased\n\nShoe Size: 7\nHeight: 5'3\"\nWeight: 132\nBlood Type: O\nBirthday: 02/07\nAge: 17", studentIDPicture: "" },
				{ studentID: "Name: Aiko Hikaru\nTalent: Makeup Artist\nSex: Male\nStatus: Deceased\n\nShoe Size: 8\nHeight: 5'8\"\nWeight: 135\nBlood Type: O\nBirthday: 06/14\nAge: 17", studentIDPicture: "https://imgur.com/9e2GDAr.png" },
				{ studentID: "Name: Anzu Kofuku\nTalent: Counterfeiter\nSex: Male\nStatus: Deceased\n\nShoe Size: Unavailable\nHeight: 5'11\"\nWeight: 159\nBlood Type: AB\nBirthday: 01/25\nAge: 18", studentIDPicture: "" },
				{ studentID: "Name: Cheisu Maeda\nTalent: Detective\nSex: Male\nStatus: Deceased\n\nShoe Size: 11\nHeight: 6'1\"\nWeight: 149\nBlood Type: B\nBirthday: 11/13\nAge: 17", studentIDPicture: "https://imgur.com/IaXHEeK.png" },
				{ studentID: "Name: Hoshi Chiura\nTalent: Astronomer\nSex: Male\nStatus: Deceased\n\nShoe Size: 8\nHeight: 5'5\"\nWeight: 110\nBlood Type: A\nBirthday: 10/31\nAge: 16\n\n\nThree of Sevens:\nHoshi Chiura\nMasayuuki Taisho\nShiba Mikio", studentIDPicture: "https://imgur.com/OBjKPR9.png" },
				{ studentID: "Name: Jacek Żeglarski\nTalent: Animal Caretaker\nSex: Male\nStatus: Deceased\n\nShoe Size: 10\nHeight: 5'8\"\nWeight: 162\nBlood Type: AB\nBirthday: 10/03\nAge: 15", studentIDPicture: "" },
				{ studentID: "Name: Kazuya Harada\nTalent: Woodworker\nSex: Male\nStatus: Deceased\n\nShoe Size: Unavailable\nHeight: 5'9\"\nWeight: 145\nBlood Type: O\nBirthday: 08/13\nAge: 16", studentIDPicture: "" },
				{ studentID: "Name: Kiro Karasu\nTalent: Prince\nSex: Male\nStatus: Deceased\n\nShoe Size: 10\nHeight: 5'10\"\nWeight: 130\nBlood Type: O\nBirthday: 08/17\nAge: 17", studentIDPicture: "https://imgur.com/v7vk5gF.png" },
				{ studentID: "Name: Masayuuki Taisho\nTalent: Balance (Blogger)\nSex: Male\nStatus: Deceased\n\nShoe Size: 9\nHeight: 5'6\"\nWeight: 120\nBlood Type: AB\nBirthday: 11/25\nAge: 16", studentIDPicture: "https://imgur.com/CLYSgcS.png" },
				{ studentID: "Name: Miyuki Ataru\nTalent: Baseball Player\nSex: Male\nStatus: Deceased\n\nShoe Size: Unavailable\nHeight: 6'2\"\nWeight: 140\nBlood Type: B\nBirthday: 07/23\nAge: 17", studentIDPicture:""},
				{ studentID: "Name: Ryu Akahoshi\nTalent: Dancer\nSex: Male\nStatus: Rescued\n\nShoe Size: 10\nHeight: 5'10\"\nWeight: 150\nBlood Type: O\nBirthday: 04/06\nAge: 16", studentIDPicture: "" },
				{ studentID: "Name: S'ad Ludópata\nTalent: Gambler\nSex: Male\nStatus: Deceased\n\nShoe Size: 10\nHeight: 6'0\"\nWeight: 144\nBlood Type: O\nBirthday: 04/10\nAge: 17\n\n\nRoyal Flush:\nCheisu Maeda, Detective (Ace of Spades)\nTenshi Kawada, Therapist (Jack of Spades)\nMasayuuki Taishi, Blogger (King of Diamonds)\nHachi Hiruma, Cryptologist (Queen of Clubs)\nS'ad Ludópata, Gambler (Ten of Clubs)", studentIDPicture: "https://imgur.com/AZzj22b.png" },
				{ studentID: "Name: Shiba Mikio\nTalent: Matchmaker\nSex: Male\nStatus: Rescued\n\nShoe Size: 9\nHeight: 5'10\"\nWeight: 111\nBlood Type: O\nBirthday: 11/04\nAge: 17", studentIDPicture: "https://imgur.com/dYJgZl5.png" },
				{ studentID: "Name: Tenshi Kawada\nTalent: Therapist\nSex: Male\nStatus: Deceased\n\nShoe Size: 10\nHeight: 5'8\"\nWeight: 120\nBlood Type: AB\nBirthday: 06/11\nAge: 17", studentIDPicture: "https://imgur.com/txWQ7vg.png" },
				{ studentID: "Name: Théo Dubois\nTalent: Archer\nSex: Male\nStatus: Rescued\n\nShoe Size: Unavailable\nHeight: 5'7\"\nWeight: 141\nBlood Type: AB\nBirthday: 03/27\nAge: 17", studentIDPicture: "" },
				{ studentID: "Name: Yukine Sakurai\nTalent: Botanist\nSex: Male\nStatus: Rescued\n\nShoe Size: 10.5\nHeight: 5'8\"\nWeight: 135\nBlood Type: O\nBirthday: 12/13\nAge: 16", studentIDPicture: "https://imgur.com/2RJbb52.png" }
			]
			
			if (args.length === 1) { //Class Roster Simple
				message.channel.send("```##  Sex and Name          Talent\n11  F Mori Hibana         Hypnotist\n25  M Ryu Akahoshi        Dancer\n27  M Shiba Mikio         Matchmaker\n29  M Théo Dubois         Archer\n30  M Yukine Sakurai      Botanist\n\n    Mastermind\n23  M Masayuuki Taisho    Balance (Blogger)\n\n    Deceased Students\n1   F Aika Mahaya         Digital Composer\n2   F Anaelle Hamaan      Fashion Designer\n3   F Anya Sakaguchi      Magician\n4   F Ara Ayao            Actress\n5   F Aurélie Cartier     Figure Skater\n6   F Hachi Hiruma        Cryptologist\n7   F Jeong Park          Tennis Player\n8   F Kyoung-mi Park      Singer\n9   F Megu Kojima         Model\n10  F Minako Kaoru        Swordsman\n12  F Noriko Suzuki       Chess Champion\n13  F Stella Hunter       Fortnite Gamer\n14  F Tezuku Imou         Boxer\n15  F Ximena Colomar      Hacker\n16  M Aiko Hikaru         Makeup Artist\n17  M Anzu Kofuku         Counterfeiter\n18  M Cheisu Maeda        Detective\n19  M Hoshi Chiura        Astronomer\n20  M Jacek Żeglarski     Animal Caretaker\n21  M Kazuya Harada       Woodworker\n22  M Kiro Karasu         Prince\n24  M Miyuki Ataru        Baseball Player\n26  M S'ad Ludópata       Gambler\n28  M Tenshi Kawada       Therapist```")
				inboxChannel.send(`${message.author.username} has looked at the first class' roster.`);
				return;
			}
			if (args[1].toLowerCase() === "total") { //Class Roster Total
				message.channel.send("```##  Sex and Name       Shoe Size    Height    Weight    Blood Type    Birthday    Age    Talent\n11  F Mori Hibana      8            5'9\"      132       B             01/04       17     Hypnotist\n25  M Ryu Akahoshi     10           5'10\"     150       O             04/06       16     Dancer\n27  M Shiba Mikio      9            5'10\"     111       O             11/04       17     Matchmaker\n29  M Théo Dubois      *            5'7\"      141       AB            03/27       17     Archer\n30  M Yukine Sakurai   10.5         5'8\"      135       O             12/13       16     Botanist\n\n    Mastermind\n23  M Masayuuki Taisho 9            5'6\"      120       AB            11/25       16     Balance (Blogger)\n\n    Deceased Students\n1   F Aika Mahaya      9            5'6\"      137       B             06/21       17     Digital Composer\n2   F Anaelle Hamaan   *            5'2\"      104       AB            06/20       16     Fashion Designer\n3   F Anya Sakaguchi   *            5'4\"      104       B             04/10       14     Magician\n4   F Ara Ayao         7            5'8\"      115       B             08/15       17     Actress\n5   F Aurélie Cartier  7            5'7\"      115       A             01/09       17     Figure Skater\n6   F Hachi Hiruma     7.5          5'7\"      139       A             11/09       17     Cryptologist\n7   F Jeong Park       6            5'5\"      105       O             05/29       16     Tennis Player\n8   F Kyoung-mi Park   6            5'5\"      105       O             05/29       16     Singer```");
				message.channel.send("```9   F Megu Kojima      6            5'5\"      99        O             04/15       17     Model\n10  F Minako Kaoru     *            5'8\"      120       O             08/07       16     Swordsman\n12  F Noriko Suzuki    7            5'3\"      110       A             06/09       14     Chess Champion\n13  F Stella Hunter    *            5'2\"      102       A             05/24       15     Fortnite Gamer\n14  F Tezuku Imou      *            5'5\"      146       O             10/31       16     Boxer\n15  F Ximena Colomar   7            5'3\"      132       O             02/07       17     Hacker\n16  M Aiko Hikaru      8            5'8\"      135       O             06/14       17     Makeup Artist\n17  M Anzu Kofuku      *            5'11\"     159       AB            01/25       18     Counterfeiter\n18  M Cheisu Maeda     11           6'1\"      149       B             11/13       17     Detective\n19  M Hoshi Chiura     8            5'5\"      110       A             10/31       16     Astronomer\n20  M Jacek Żeglarski  10           5'8\"      162       AB            10/03       15     Animal Caretaker\n21  M Kazuya Harada    *            5'9\"      145       O             08/13       16     Woodworker\n22  M Kiro Karasu      10           5'10\"     130       O             08/17       17     Prince\n24  M Miyuki Ataru     *            6'2\"      140       B             07/23       17     Baseball Player\n26  M S'ad Ludópata    10           6'0\"      144       O             04/10       17     Gambler\n28  M Tenshi Kawada    10           5'8\"      120       AB            06/11       17     Therapist\n\n*Lost due to account deletion.```");
				inboxChannel.send(`${message.author.username} has looked at the full version of the first class' roster.`);
				return;
			}

			let pageAmount = 30;
			let x = 0;
			while (x < pageAmount) {
				thumbnail = classList[x].studentIDPicture;
				if (thumbnail === "") {
					thumbnail = "https://imgur.com/OVPTMGn.png";
				};
				currentPage = {text:classList[x].studentID,thumbnail:thumbnail}
				pages.push(currentPage);
				x++;
			}

			if (args[1] === "1" || args[1].toLowerCase().search("aika") != -1) {page = 1}
			if (args[1] === "2" || args[1].toLowerCase().search("anaelle") != -1) {page = 2}
			if (args[1] === "3" || args[1].toLowerCase().search("anya") != -1) {page = 3}
			if (args[1] === "4" || args[1].toLowerCase().search("ara") != -1) {page = 4}
			if (args[1] === "5" || args[1].toLowerCase().search("aurelie") != -1 || args[1].toLowerCase().search("aurélie") != -1) {page = 5}
			if (args[1] === "6" || args[1].toLowerCase().search("hachi") != -1) {page = 6}
			if (args[1] === "7" || args[1].toLowerCase().search("jeong") != -1) {page = 7}
			if (args[1] === "8" || args[1].toLowerCase().search("kyoung") != -1) {page = 8}
			if (args[1] === "9" || args[1].toLowerCase().search("megu") != -1) {page = 9}
			if (args[1] === "10" || args[1].toLowerCase().search("minako") != -1) {page = 10}
			if (args[1] === "11" || args[1].toLowerCase().search("mori") != -1) {page = 11}
			if (args[1] === "12" || args[1].toLowerCase().search("noriko") != -1) {page = 12}
			if (args[1] === "13" || args[1].toLowerCase().search("stella") != -1) {page = 13}
			if (args[1] === "14" || args[1].toLowerCase().search("tezuku") != -1) {page = 14}
			if (args[1] === "15" || args[1].toLowerCase().search("ximena") != -1) {page = 15}
			if (args[1] === "16" || args[1].toLowerCase().search("aiko") != -1) {page = 16}
			if (args[1] === "17" || args[1].toLowerCase().search("anzu") != -1) {page = 17}
			if (args[1] === "18" || args[1].toLowerCase().search("cheisu") != -1) {page = 18}
			if (args[1] === "19" || args[1].toLowerCase().search("hoshi") != -1) {page = 19}
			if (args[1] === "20" || args[1].toLowerCase().search("jacek") != -1) {page = 20}
			if (args[1] === "21" || args[1].toLowerCase().search("kazuya") != -1) {page = 21}
			if (args[1] === "22" || args[1].toLowerCase().search("kiro") != -1) {page = 22}
			if (args[1] === "23" || args[1].toLowerCase().search("yuuki") != -1) {page = 23}
			if (args[1] === "24" || args[1].toLowerCase().search("miyuki") != -1) {page = 24}
			if (args[1] === "25" || args[1].toLowerCase().search("ryu") != -1) {page = 25}
			if (args[1] === "26" || args[1].toLowerCase().search("s'ad") != -1) {page = 26}
			if (args[1] === "27" || args[1].toLowerCase().search("shiba") != -1) {page = 27}
			if (args[1] === "28" || args[1].toLowerCase().search("tenshi") != -1) {page = 28}
			if (args[1] === "29" || args[1].toLowerCase().search("theo") != -1 || args[1].toLowerCase().search("théo") != -1) {page = 29}
			if (args[1] === "30" || args[1].toLowerCase().search("yukine") != -1 || args[1].toLowerCase().search("who") != -1) {page = 30}
			if (Number.isInteger(args[1] * 1) === true) {
				inboxChannel.send(`${message.author.username} has looked at student ${args[1]}'s file from the first class.`)
			}
			if (Number.isInteger(args[1] * 1) === false) {
				inboxChannel.send(`${message.author.username} has looked at ${args[1].toUpperCase().slice(0, 1)}${args[1].toLowerCase().slice(1)}'s file from the first class.`)
			}

		}
		if (args[0] === "2") { //Class 02 (Hope's Peak Academy/The Mall, The Killing School Trip)
			classList = [
				{ studentID: "Name: Akiko _______\nTalent: Clairvoyent\nSex: Female \nStatus: Rescued\n\nShoe Size: 6.5\nHeight: 5'4\"\nWeight: 103\nBlood Type: B\nBirthday: 03/13\nAge: 16", studentIDPicture: "https://imgur.com/Cpdhi9T.png" },
				{ studentID: "Name: Arisa Shokuhou\nTalent: Opera Singer\nSex: Female\nStatus: Rescued\n\nShoe Size: 6\nHeight: 5'2\"\nWeight: 106\nBlood Type: A\nBirthday: 11/13\nAge: 17", studentIDPicture: "" },
				{ studentID: "Name: Chika Miyasaki\nTalent: Assassin\nSex: Female\nStatus: Contained\n\nShoe Size: 4\nHeight: 5'2\"\nWeight: 92\nBlood Type: A\nBirthday: 03/20\nAge: 16", studentIDPicture: "https://imgur.com/zZmXZ3L.png" },
				{ studentID: "Name: Eiji Ryozo\nTalent: Surgeon\nSex: Female\nStatus: Rescued\n\nShoe Size: 8\nHeight: 5'7\"\nWeight: 111\nBlood Type: B\nBirthday: 11/01\nAge: 16", studentIDPicture: "https://imgur.com/JTrNk47.png" },
				{ studentID: "Name: Hana Kageriri\nTalent: Puppeteer\nSex: Female\nStatus: Rescued\n\nShoe Size: 9\nHeight: 5'5\"\nWeight: 105\nBlood Type: B\nBirthday: 11/12\nAge: 17", studentIDPicture: "https://imgur.com/c210v7y.png" },
				{ studentID: "Name: Kagami Hannei\nTalent: Jeweler\nSex: Female\nStatus: Rescued\n\nShoe Size: 7.5\nHeight: 5'11\"\nWeight: 129\nBlood Type: A\nBirthday: 09/14\nAge: 18", studentIDPicture: "https://imgur.com/PZVqARe.png" },
				{ studentID: "Name: Monika Minami\nTalent: Bomb Maker\nSex: Female\nStatus: Rescued\n\nShoe Size: 6.5\nHeight: 4'9\"\nWeight: 80\nBlood Type: AB\nBirthday: 04/01\nAge: 15", studentIDPicture: "" },
				{ studentID: "Name: Saeko Kiyomizu\nTalent: Maid\nSex: Female\nStatus: Rescued\n\nShoe Size: 6/6.5\nHeight: 5'7\"\nWeight: 110\nBlood Type: O\nBirthday: 09/15\nAge: 17", studentIDPicture: "https://imgur.com/AKg0jAY.png" },
				{ studentID: "Name: Tsuyo Kogiyumi\nTalent: Biologist\nSex: Female\nStatus: Rescued\n\nShoe Size: 6\nHeight: 5'1\"\nWeight: 104\nBlood Type: O\nBirthday: 08/25\nAge: 17", studentIDPicture: "https://imgur.com/jHf6p7i.png" },
				{ studentID: "Name: Yuna Akahoshi\nTalent: Doll Maker\nSex: Female\nStatus: Rescued\n\nShoe Size: 6\nHeight: 5'3\"\nWeight: 110\nBlood Type: A\nBirthday: 06/25\nAge: 15", studentIDPicture: "" },
				{ studentID: "Name: Ale del Prieto\nTalent: Lawyer\nSex: Male\nStatus: Rescued\n\nShoe Size: 6\nHeight: 5'6\"\nWeight: 124\nBlood Type: AB\nBirthday: 05/22\nAge: 18", studentIDPicture: "https://imgur.com/Sag0SRp.png" },
				{ studentID: "Name: Asahi Fukuzawa\nTalent: Violinist\nSex: Male\nStatus: Rescued\n\nShoe Size: 10\nHeight: 5'7\"\nWeight: 124\nBlood Type: O\nBirthday: 08/27\nAge: 18", studentIDPicture: "https://imgur.com/GdXygwN.png" },
				{ studentID: "Name: Chikako Kaetsu\nTalent: Conspiracy Theorist\nSex: Male\nStatus: Rescued\n\nShoe Size: 7.5\nHeight: 5'8\"\nWeight: 142\nBlood Type: O\nBirthday: 04/26\nAge: 18", studentIDPicture: "https://imgur.com/4yEQVlf.png" },
				{ studentID: "Name: Eiichi Ryozo\nTalent: Chemist\nSex: Male\nStatus: Rescued\n\nShoe Size: 10\nHeight: 6'0\"\nWeight: 137\nBlood Type: AB\nBirthday: 06/06\nAge: 18", studentIDPicture: "https://imgur.com/BCdEZNm.png" },
				{ studentID: "Name: Fenikku Hinotama\nTalent: Ringmaster\nSex: Male\nStatus: Rescued\n\nShoe Size: 8\nHeight: 5'1\"\nWeight: 95\nBlood Type: O\nBirthday: 05/29\nAge: 14", studentIDPicture: "https://imgur.com/snh70TO.png" },
				{ studentID: "Name: Hideo Takayama\nTalent: Inventor\nSex: Male\nStatus: Rescued\n\nShoe Size: 10\nHeight: 6'2\"\nWeight: 193\nBlood Type: AB\nBirthday: 12/02\nAge: 18\n\n\nHideo loves AI dick.", studentIDPicture: "https://imgur.com/9WXv5Q9.png" },
				{ studentID: "Name: Isha Kalki\nTalent: Spy\nSex: Male\nStatus: Rescued\n\nShoe Size: 5\nHeight: 5'1\"\nWeight: 95\nBlood Type: O\nBirthday: 05/31\nAge: 16", studentIDPicture: "https://imgur.com/xj1HMXu.png" },
				{ studentID: "Name: Kaipo Uilani Iona\nTalent: Birdwatcher\nSex: Male\nStatus: Rescued\n\nShoe Size: 7\nHeight: 5'2\"\nWeight: 98\nBlood Type: O\nBirthday: 10/13\nAge: 15", studentIDPicture: "https://imgur.com/WQFawIm.png" },
				{ studentID: "Name: Katashi Maeda\nTalent: Swimmer\nSex: Male\nStatus: Rescued\n\nShoe Size: 9\nHeight: 5'8\"\nWeight: 157\nBlood Type: O\nBirthday: 04/20\nAge: 17", studentIDPicture: "" },
				{ studentID: "Name: Kouki Yoshida\nTalent: Lucky Student\nSex: Male\nStatus: Terminated\n\nShoe Size: 9\nHeight: 5'11\"\nWeight: 140\nBlood Type: B\nBirthday: 09/15\nAge: 18", studentIDPicture: "https://imgur.com/jRRhUog.png" },
				{ studentID: "Name: Kyabetsu Retesu\nTalent: Florist\nSex: Male\nStatus: Rescued\n\nShoe Size: 8\nHeight: 5'9\"\nWeight: 147\nBlood Type: AB\nBirthday: 02/17\nAge: 16", studentIDPicture: "https://imgur.com/CgLyIGN.png" },
				{ studentID: "Name: Michel Voigt\nTalent: Theologist\nSex: Male\nStatus: Rescued\n\nShoe Size: 8\nHeight: 5'5\"\nWeight: 119\nBlood Type: A\nBirthday: 12/25\nAge: 16", studentIDPicture: "" },
				{ studentID: "Name: Rosendo Paulo Ochoa Merlo\nTalent: Fútbol Player\nSex: Male\nStatus: Rescued\n\nShoe Size: 5.5\nHeight: 5'1\"\nWeight: 110\nBlood Type: O\nBirthday: 08/10\nAge: 15", studentIDPicture: "https://imgur.com/uwXd769.png" },
				{ studentID: "Name: Sora Kenshin\nAlias: The Silencer\nTalent: Daredevil\nSex: Male\nStatus: Rescued\n\nShoe Size: 11\nHeight: 5'9\"\nWeight: 120\nBlood Type: AB\nBirthday: 06/01\nAge: 17", studentIDPicture: "https://imgur.com/wdNGgRH.png" },
				{ studentID: "Name: Souma Shimizu\nReal Name: Naoki Ishida\nTalent: Manipulator (Poet)\nSex: Male\nStatus: Rescued\n\nShoe Size: 10\nHeight: 5'10\"\nWeight: 130\nBlood Type: AB\nBirthday: 03/20\nAge: 17\n\n\n\nPoems:\nmy stacy left me\nof course, it's a fucking chad\nno one understands\n\ni'll get her back\nand that chad will be wacked\nsouma is better than chad\n\nA poem by Souma.\n\n\nmy heart burns\nbut not for you\nfor stacy\nfuck chad", studentIDPicture: "https://imgur.com/9CoACWR.png" },
				{ studentID: "Name: Tomomi Kashichi\nTalent: Technician\nSex: Male\nStatus: Rescued\n\nShoe Size: 10.5\nHeight: 5'8\"\nWeight: 137\nBlood Type: A\nBirthday: 04/27\nAge: 17", studentIDPicture: "https://imgur.com/OVjt8y0.png" },
				{ studentID: "Name: Yuuya Michimiya\nTalent: Philanthropist\nSex: Male\nStatus: Rescued\n\nShoe Size: 9\nHeight: 5'6\"\nWeight: 148\nBlood Type: AB\nBirthday: 04/13\nAge: 16", studentIDPicture: "" },
				{ studentID: "Name: Eito Ryozo\nTalent: Psychologist\nSex: Male\nStatus: Deceased\n\nShoe Size: N/A\nHeight: N/A\nWeight: N/A\nBlood Type: N/A\nBirthday: N/A\nAge: 14", studentIDPicture: "https://imgur.com/M4cALh8.png" }
			]
		
			if (args.length === 1) {
				message.channel.send("```##  Sex and Name          Talent\n9   F Tsuyo Kogiyumi      Biologist\n12  M Asahi Fukuzawa      Violinist\n15  M Fenikku Hinotama    Ringmaster\n16  M Hideo Takayama      Inventor\n25  M Souma Shimizu       Manipulator (Poet)\n\n    Mastermind\n3   F Chika Miyasaki      Assassin\n\n    Deceased Students\n1   F Akiko _______       Clairvoyant\n2   F Arisa Shokuhou      Opera Singer\n4   F Eiji Ryozo          Surgeon\n5   F Hana Kageriri       Puppeteer\n6   F Kagami Hannei       Jeweler\n7   F Monika Minami       Bomb Maker\n8   F Saeko Kiyomizu      Maid\n10  F Yuna Akahoshi       Doll Maker\n11  M Ale del Prieto      Lawyer\n13  M Chikako Kaetsu      Conspiracy Theorist\n14  M Eiichi Ryozo        Chemist\n17  M Isha Kalki          Spy\n18  M Kaipo Uilani Iona   Birdwatcher\n19  M Katashi Maeda       Swimmer\n20  M Kouki Yoshida       Lucky Student\n21  M Kyabetsu Retesu     Florist\n22  M Michel Voigt        Theologist\n23  M Renzo Ochoa         Fútbol Player\n24  M Sora Kenshin        Daredevil\n26  M Tomomi Kashichi     Technician\n27  M Yuuya Michimiya     Philanthropist```");
				inboxChannel.send(`${message.author.username} has looked at the second class' roster.`);
				return;
			}
			if (args[1].toLowerCase() === "total") {
				message.channel.send("```##  Sex and Name        Shoe Size    Height    Weight    Blood Type    Birthday    Age    Talent\n9   F Tsuyo Kogiyumi    6            5'1\"      104       O             08/25       17     Biologist\n12  M Asahi Fukuzawa    10           5'7\"      124       O             08/27       18     Violinist\n15  M Fenikku Hinotama  8            5'1\"      95        O             05/29       14     Ringmaster\n16  M Hideo Takayama    10           6'2\"      193       AB            12/02       18     Inventor\n25  M Souma Shimizu     10           5'10\"     130       AB            03/20       17     Manipulator (Poet)\n\n    Mastermind\n3   F Chika Miyasaki    4            5'2\"      92        A             03/20       16     Assassin\n\n    Deceased Students\n1   F Akiko _______     6.5          5'4\"      103       B             03/13       16     Clairvoyant\n2   F Arisa Shokuhou    6            5'2\"      106       A             11/13       17     Opera Singer\n4   F Eiji Ryozo        8            5'7\"      111       B             11/01       16     Surgeon\n5   F Hana Kageriri     9            5'5\"      105       B             11/12       17     Puppeteer\n6   F Kagami Hannei     7.5          5'11\"     129       A             09/14       18     Jeweler\n7   F Monika Minami     6.5          4'9\"      80        AB            04/01       15     Bomb Maker\n8   F Saeko Kiyomizu    6/6.5        5'7\"      110       O             09/15       17     Maid```");
				message.channel.send("```\n10  F Yuna Akahoshi     6            5'3\"      110       A             06/25       15     Doll Maker\n11  M Ale del Prieto    6            5'6\"      124       AB            05/22       18     Lawyer\n13  M Chikako Kaetsu    7.5          5'8\"      142       O             04/26       18     Conspiracy Theorist\n14  M Eiichi Ryozo      10           6'0\"      137       AB            06/06       18     Chemist\n17  M Isha Kalki        5            5'1\"      95        O             05/31       16     Spy\n18  M Kaipo Uilani Iona 7            5'2\"      98        O             10/13       15     Birdwatcher\n19  M Katashi Maeda     9            5'8\"      157       O             04/20       17     Swimmer\n20  M Kouki Yoshida     9            5'11\"     140       B             09/15       18     Lucky Student\n21  M Kyabetsu Retesu   8            5'9\"      147       AB            02/17       16     Florist\n22  M Michel Voigt      8            5'5\"      119       A             12/25       16     Theologist\n23  M Renzo Ochoa       5.5          5'1\"      110       O             08/10       15     Fútbol Player\n24  M Sora Kenshin      11           5'9\"      120       AB            06/01       17     Daredevil\n26  M Tomomi Kashichi   10.5         5'8\"      137       A             04/17       17     Technician\n27  M Yuuya Michimiya   9            5'6\"      148       AB            04/13       16     Philanthropist\n```");
				inboxChannel.send(`${message.author.username} has looked at the full version of the second class' roster.`);
				return;
			}

			let pageAmount = 28;
			let x = 0;
			while (x < pageAmount) {
				thumbnail = classList[x].studentIDPicture;
				if (thumbnail === "") {
					thumbnail = "https://imgur.com/OVPTMGn.png";
				};
				currentPage = {
					text: classList[x].studentID,
					thumbnail: thumbnail
				}
				pages.push(currentPage);
				x++;
			}
			
			if (args[1] === "1" || args[1].toLowerCase().search("akiko") != -1) {page = 1}
			if (args[1] === "2" || args[1].toLowerCase().search("arisa") != -1) {page = 2}
			if (args[1] === "3" || (args[1].toLowerCase().search("chika") != -1 && args[1].toLowerCase().search("chikako") === -1)) {page = 3}
			if (args[1] === "4" || args[1].toLowerCase().search("eiji") != -1) {page = 4}
			if (args[1] === "5" || args[1].toLowerCase().search("hana") != -1) {page = 5}
			if (args[1] === "6" || args[1].toLowerCase().search("kagami") != -1 || args[1].toLowerCase().search("bitch") != -1) {page = 6}
			if (args[1] === "7" || args[1].toLowerCase().search("monika") != -1) {page = 7}
			if (args[1] === "8" || args[1].toLowerCase().search("saeko") != -1) {page = 8}
			if (args[1] === "9" || args[1].toLowerCase().search("tsuyo") != -1) {page = 9}
			if (args[1] === "10" || args[1].toLowerCase().search("yuna") != -1) {page = 10}
			if (args[1] === "11" || args[1].toLowerCase().search("ale") != -1) {page = 11}
			if (args[1] === "12" || args[1].toLowerCase().search("asahi") != -1) {page = 12}
			if (args[1] === "13" || args[1].toLowerCase().search("chikako") != -1 || (args[1].toLowerCase().search("chik") != -1 && args[1].toLowerCase().search("chika") === -1)) {page = 13}
			if (args[1] === "14" || args[1].toLowerCase().search("eiichi") != -1) {page = 14}
			if (args[1] === "15" || args[1].toLowerCase().search("fenikku") != -1) {page = 15}
			if (args[1] === "16" || args[1].toLowerCase().search("hideo") != -1) {page = 16}
			if (args[1] === "17" || args[1].toLowerCase().search("isha") != -1) {page = 17}
			if (args[1] === "18" || args[1].toLowerCase().search("kaipo") != -1) {page = 18}
			if (args[1] === "19" || args[1].toLowerCase().search("katashi") != -1) {page = 19}
			if (args[1] === "20" || args[1].toLowerCase().search("kouki") != -1) {page = 20}
			if (args[1] === "21" || args[1].toLowerCase().search("kyabetsu") != -1) {page = 21}
			if (args[1] === "22" || args[1].toLowerCase().search("michel") != -1) {page = 22}
			if (args[1] === "23" || args[1].toLowerCase().search("renzo") != -1 || args[1].toLowerCase().search("rosendo") != -1) {page = 23}
			if (args[1] === "24" || args[1].toLowerCase().search("sora") != -1 || args[1].toLowerCase().search("silencer") != -1 || (args[1].toLowerCase().search("the") != -1 && args[2].toLowerCase().search("silencer") != -1)) {page = 24}
			if (args[1] === "25" || args[1].toLowerCase().search("souma") != -1 || args[1].toLowerCase().search("naoki") != -1) {page = 25}
			if (args[1] === "26" || args[1].toLowerCase().search("tomomi") != -1) {page = 26}
			if (args[1] === "27" || args[1].toLowerCase().search("yuuya") != -1) {page = 27}
			if (args[1].toLowerCase().search("eito") != -1) {page = 28}
			if (args[1].toLowerCase().search("junko") != -1 && args[1].toLowerCase().search("inu") != -1 && message.author.id === "334575513857163266") {
				possibleReplies = ["how long will it take you, Mel...","**Mel.**","jesus christ! How many times is this going to happen, Mel?","I will literally vore you if you do that again, Mel.","***Mel.***","do it one more time, I dare you Mel.","you've got to be doing this on purpose now, right Mel?","I've had it up to here with you, Mel.","stop doing this, Mel!","why do you keep doing this, Mel?"];
				return message.reply(random(possibleReplies));
			}
			if (Number.isInteger(args[1] * 1) === true) {
				inboxChannel.send(`${message.author.username} has looked at student ${args[1]}'s file from the second class.`)
			}
			if (Number.isInteger(args[1] * 1) === false) {
				inboxChannel.send(`${message.author.username} has looked at ${args[1].toUpperCase().slice(0, 1)}${args[1].toLowerCase().slice(1)}'s file from the second class.`)
			}
		}
		if (args[0] === "3") { //Class 03 (Monokuma Train, Killing School Ride)
			classList = [
				{ studentID: "Name: Aemele Dèjré\nTalent: Stalker\nSex: Female\nStatus: Alive\n\nShoe Size: 5\nHeight: 5'5\"\nWeight: 114\nBlood Type: B\nBirthday: 09/01\nAge: 18", studentIDPicture: "https://imgur.com/nxt9OCI.png" },
				{ studentID: "Name: Dia Ramos\nTalent: Cheerleader\nSex: Female\nStatus: Alive\n\nShoe Size: 7.5\nHeight: 5'2\"\nWeight: 117\nBlood Type: O\nBirthday: 08/13\nAge: 18", studentIDPicture: "" },
				{ studentID: "Name: Kumiko Yeun\nStage Name: KUMI!\nTalent: Rock Star\nSex: Female\nStatus: Alive\n\nShoe Size: 6\nHeight: 5'7\"\nWeight: 103\nBlood Type: AB\nBirthday: 06/16\nAge: 18", studentIDPicture: "" },
				{ studentID: "Name: Inugami Uzuki\nTalent: Graffiti Artist\nSex: Female\nStatus: Alive\n\nShoe Size: 8\nHeight: 5'6\"\nWeight: 135\nBlood Type: O\nBirthday: 03/24\nAge: 17", studentIDPicture: "https://imgur.com/ZHW10pn.png" },
				{ studentID: "Name: Isago Achikita\nTalent: Mythologist\nSex: Female\nStatus: Deceased\n\nShoe Size: 6.5\nHeight: 5'5\"\nWeight: 119\nBlood Type: AB\nBirthday: 02/29\nAge: 18", studentIDPicture: "https://imgur.com/KNHhTlL.png" },
				{ studentID: "Name: Junko Saitou\nPen Name: Kisei Keukegen\nTalent: Horror Novelist\nSex: Female\nStatus: Alive\n\nShoe Size: 6\nHeight: 5'5\"\nWeight: 109\nBlood Type: AB\nBirthday: 01/06\nAge: 18", studentIDPicture: "https://imgur.com/TZeW9L7.png" },
				{ studentID: "Name: Kirakira Kyuti\nTalent: Magical Girl\nSex: Female\nStatus: Alive\n\nShoe Size: 6 (Children's)\nHeight: 4'11\"\nWeight: 97\nBlood Type: A\nBirthday: 09/07\nAge: 14", studentIDPicture: "https://imgur.com/zz98AMQ.png" },
				{ studentID: "Name: Mariko Murakami\nTalent: Martial Artist\nSex: Female\nStatus: Alive\n\nShoe Size: 8\nHeight: 5'6\"\nWeight: 125\nBlood Type: AB\nBirthday: 12/12\nAge: 18", studentIDPicture: "https://imgur.com/9RRSa6h.png" },
				{ studentID: "Name: Megami Himura\nTalent: Tragedian\nSex: Female\nStatus: Alive\n\nShoe Size: 7\nHeight: 5'5\"\nWeight: 110\nBlood Type: A\nBirthday: 05/15\nAge: 16", studentIDPicture: "" },
				{ studentID: "Name: Agnès Boniface\nPseudonym: Nikki Cox\nTalent: Adult Film Actress\nSex: Female\nStatus: Alive\n\nShoe Size: 8\nHeight: 5'9\"\nWeight: 131\nBlood Type: B\nBirthday: 09/08\nAge: 19", studentIDPicture: "https://imgur.com/zvw2WGR.png" },
				{ studentID: "Name: Piper McCullough\nTalent: Cadet\nSex: Female\nStatus: Alive\n\nShoe Size: 5\nHeight: 5'1\"\nWeight: 102\nBlood Type: O\nBirthday: 03/23\nAge: 15", studentIDPicture: "https://imgur.com/Zxcprq2.png" },
				{ studentID: "Name: Renata de Santis\nTalent: Heiress\nSex: Female\nStatus: Alive\n\nShoe Size: 7\nHeight: 5'7\"\nWeight: 115\nBlood Type: B\nBirthday: 08/11\nAge: 17", studentIDPicture: "https://imgur.com/Dgij3oX.png" },
				{ studentID: "Name: Areli Vepkhia\nTalent: Lion Tamer\nSex: Male\nStatus: Alive\n\nShoe Size: 12\nHeight: 6'5\"\nWeight: 260\nBlood Type: O\nBirthday: 10/29\nAge: 18", studentIDPicture: "https://imgur.com/4IQsA40.png" },
				{ studentID: "Name: Ayuma Tanaka\nTalent: Counselor\nSex: Male\nStatus: Alive\n\nShoe Size: 9\nHeight: 5'4\"\nWeight: 150\nBlood Type: B\nBirthday: 10/17\nAge: 18", studentIDPicture: "" },
				{ studentID: "Name: Cecilio Gonzalo Calles Cárdenas\nTalent: Pilot\nSex: Male\nStatus: Alive\n\nShoe Size: 8\nHeight: 5'8\"\nWeight: 157\nBlood Type: B\nBirthday: 05/03\nAge: 17", studentIDPicture: "" },
				{ studentID: "Name: Charles Miller\nTalent: Milkman\nSex: Male\nStatus: Deceased\n\nShoe Size: 9\nHeight: 5'11\"\nWeight: 143\nBlood Type: Chocolate\nBirthday: 01/11\nAge: 18", studentIDPicture: "https://imgur.com/YKzsYOU.png" },
				{ studentID: "Name: Daichi Ichihara\nTalent: Satanist\nSex: Male\nStatus: Alive\n\nShoe Size: 9\nHeight: 5'8\"\nWeight: 143\nBlood Type: O\nBirthday: 09/23\nAge: 17", studentIDPicture: "https://imgur.com/qT8oKQu.png" },
				{ studentID: "Name: Federico Navarro\nTalent: Pianist\nSex: Male\nStatus: Alive\n\nShoe Size: 5\nHeight: 5'0\"\nWeight: 99\nBlood Type: A\nBirthday: 02/16\nAge: 15", studentIDPicture: "" },
				{ studentID: "Name: Jomei Hoshino\nTalent: Pyromaniac\nSex: Male\nStatus: Alive\n\nShoe Size: 10\nHeight: 5'11\"\nWeight: 152\nBlood Type: B\nBirthday: 12/17\nAge: 18", studentIDPicture: "https://imgur.com/YywS5LK.png" },
				{ studentID: "Name: Melchor Guadalupe Paz de la Cruz\nTalent: Activist\nSex: Male\nStatus: Alive\n\nShoe Size: 6\nHeight: 5'11\"\nWeight: 110\nBlood Type: A\nBirthday: 02/29\nAge: 17", studentIDPicture: "https://imgur.com/9cVr7mL.png" },
				{ studentID: "Name: Ruslan Eun-Kyung Kraus\nTalent: Luthier\nSex: Male\nStatus: Alive\n\nShoe Size: 10\nHeight: 6'1\"\nWeight: 157\nBlood Type: B\nBirthday: 03/02\nAge: 17", studentIDPicture: "https://imgur.com/8LA7hg8.png" },
				{ studentID: "Name: Ryoushi Nobuori\nTalent: Storyteller\nSex: Male\nStatus: Deceased\n\nShoe Size: 7\nHeight: 5'6\"\nWeight: 111\nBlood Type: A\nBirthday: 12/25\nAge: 16", studentIDPicture: "https://imgur.com/9se7jzq.png" },
				{ studentID: "Name: Santo Verdugo Bautista\nTalent: Coroner\nSex: Male\nStatus: Alive\n\nShoe Size: 10\nHeight: 5'10\"\nWeight: 128\nBlood Type: O\nBirthday: 02/11\nAge: 17", studentIDPicture: "" },
				{ studentID: "Name: Shinji Minoru\nTalent: Physicist\nSex: Male\nStatus: Alive\n\nShoe Size: 9\nHeight: 5'10\"\nWeight: 125\nBlood Type: AB\nBirthday: 01/27\nAge: 18", studentIDPicture: "" },
				{ studentID: "Name: Tenome\nTalent: Ghostwriter\nSex: Male\nStatus: Deceased\n\nShoe Size: ??\nHeight: ?'?\"\nWeight: ???\nBlood Type: ??\nBirthday: ??/??\nAge: 15", studentIDPicture: "https://imgur.com/TM8FYjl.png" },
				{ studentID: "Name: Wolfgang Schwarz\nTalent: Combat Medic\nSex: Male\nStatus: Alive\n\nShoe Size: 11\nHeight: 6'5\"\nWeight: 246\nBlood Type: A\nBirthday: 12/07\nAge: ??", studentIDPicture: "https://imgur.com/zleZ5xc.png" },
			]
			
			if (args.length === 1) {
				message.channel.send("```##  Sex and Name                          Talent\n1   F Aemele Dèjré                        Stalker\n2   F Dia Ramos                           Cheerleader\n3   F Kumiko Yeun                         Rock Star\n4   F Inugami Uzuki                       Graffiti Artist\n6   F Junko Saitou                        Horror Novelist\n7   F Kirakira Kyuti                      Magical Girl\n8   F Mariko Murakami                     Martial Artist\n9   F Megami Himura                       Tragedian\n10  F Nikki Cox                           Teacher\n11  F Piper McCullough                    Cadet\n12  F Renata de Santis                    Heiress\n13  M Areli Vepkhia                       Lion Tamer\n14  M Ayuma Tanaka                        Counselor\n15  M Cecilio Gonzalo Calles Cárdenas     Pilot\n17  M Daichi Ichihara                     Satanist\n18  M Federico Navarro                    Pianist\n19  M Jomei Hoshino                       Pyromaniac\n20  M Melchor Guadalupe Paz de la Cruz    Activist\n21  M Ruslan Eun-Kyung Kraus              Luthier\n23  M Santo Verdugo Bautista              Coroner\n24  M Shinji Minoru                       Physicist\n26  M Wolfgang Schwarz                    Combat Medic\n\n    Mastermind\n    Unknown\n\n    Deceased Students\n5   F Isago Achikita                      Mythologist\n16  M Charles Miller                      Milkman\n22  M Ryoushi Nobuori                     Storyteller\n25  M Tenome                              Ghostwriter```");
				inboxChannel.send(`${message.author.username} has looked at the third class' roster.`);
				return;
			}
			if (args[1] === "total") {
				message.channel.send("```##  Sex and Name         Shoe Size    Height    Weight    Blood Type    Birthday    Age    Talent\n1   F Aemele Dèjré       5            5\'5\"      114       B             09/01       18     Stalker\n2   F Dia Ramos          7.5          5\'2\"      117       O             08/13       18     Cheerleader\n3   F Kumiko Yeun        6            5\'7\"      103       AB            06/16       18     Rock Star\n4   F Inugami Uzuki      8            5\'6\"      135       O             03/24       17     Graffiti Artist\n6   F Junko Saitou       6            5\'5\"      109       AB            01/06       18     Horror Novelist\n7   F Kirakira Kyuti     6 (Child's)  4\'11\"     97        A             09/07       14     Magical Girl\n8   F Mariko Murakami    8            5\'6\"      125       AB            12/12       18     Martial Artist\n9   F Megami Himura      7            5\'5\"      110       A             05/15       16     Tragedian\n10  F Nikki Cox          8            5\'9\"      131       B             09/08       19     Teacher\n11  F Piper McCullough   5            5\'1\"      102       O             03/23       15     Cadet\n12  F Renata de Santis   7            5\'7\"      115       B             08/11       17     Heiress\n13  M Areli Vepkhia      12           6\'5\"      260       O             10/29       18     Lion Tamer```");
				message.channel.send("```14  M Ayuma Tanaka       9            5\'4\"      150       B             10/17       18     Counselor\n15  M Cecilio Cárdenas   8            5\'8\"      157       B             05/03       17     Pilot\n17  M Daichi Ichihara    9            5\'8\"      143       O             09/23       17     Satanist\n18  M Federico Navarro   5            5\'0\"      99        A             02/16       15     Pianist\n19  M Jomei Hoshino      10           5\'11\"     152       B             12/17       18     Pyromaniac\n20  M Melchor de la Cruz 6            5\'11\"     110       A             02/29       17     Activist\n21  M Ruslan Kraus       10           6\'1\"      157       B             03/02       17     Luthier\n23  M Santo Bautista     10           5\'10\"     128       O             02/11       17     Coroner\n24  M Shinji Minoru      9            5\'10\"     125       AB            01/27       18     Physicist\n26  M Wolfgang Schwarz   11           6\'5\"      246       A             12/07       ??     Combat Medic\n\n    Mastermind\n    Unknown\n\n    Deceased Students\n5   F Isago Achikita     6.5          5\'5\"      119       AB            02/29       18     Mythologist\n16  M Charles Miller     9            5\'11\"     143       C             01/11       18     Milkman\n22  M Ryoushi Nobuori    7            5\'6\"      111       A             12/25       16     Storyteller\n25  M Tenome             ??           ?\'?\"      ???       ?             ??/??       15     Ghostwriter```");
				inboxChannel.send(`${message.author.username} has looked at the full version of the third class roster.`);
				return;
			}

			let pageAmount = 26;
			let x = 0;
			while (x < pageAmount) {
				thumbnail = classList[x].studentIDPicture;
				if (thumbnail === "") {
					thumbnail = "https://imgur.com/OVPTMGn.png";
				};
				currentPage = {
					text: classList[x].studentID,
					thumbnail: thumbnail
				}
				pages.push(currentPage);
				x++;
			}

			if (args[1] === "1" || args[1].toLowerCase().search("aemele") != -1) {page = 1}
			if (args[1] === "2" || args[1].toLowerCase().search("dia") != -1) {page = 2}
			if (args[1] === "3" || args[1].toLowerCase().search("kumi") != -1 || args[1].toLowerCase().search("ga") != -1) {page = 3}
			if (args[1] === "4" || args[1].toLowerCase().search("inu") != -1) {page = 4}
			if (args[1] === "5" || args[1].toLowerCase().search("isago") != -1) {page = 5}
			if (args[1] === "6" || args[1].toLowerCase().search("junko") != -1 || args[1].toLowerCase().search("byakko") != -1) {page = 6}
			if (args[1] === "7" || args[1].toLowerCase().search("kira") != -1) {page = 7}
			if (args[1] === "8" || args[1].toLowerCase().search("mariko") != -1) {page = 8}
			if (args[1] === "9" || args[1].toLowerCase().search("megami") != -1) {page = 9}
			if (args[1] === "10" || (args[1].toLowerCase().search("nikki") != -1 || args[1].toLowerCase().search("agnes") != -1)) {page = 10}
			if (args[1] === "11" || args[1].toLowerCase().search("piper") != -1) {page = 11}
			if (args[1] === "12" || args[1].toLowerCase().search("renata") != -1) {page = 12}
			if (args[1] === "13" || args[1].toLowerCase().search("areli") != -1) {page = 13}
			if (args[1] === "14" || args[1].toLowerCase().search("ayuma") != -1) {page = 14}
			if (args[1].toLowerCase().search("cecil") != -1 && args[1].toLowerCase().search("cecilio") === -1) {
				return message.reply("**No.**");
			}
			if (args[1] === "15" || args[1].toLowerCase().search("cecilio") != -1) {page = 15}
			if (args[1] === "16" || args[1].toLowerCase().search("charles") != -1 || args[1].toLowerCase().search("chad") != -1) {page = 16}
			if (args[1] === "17" || args[1].toLowerCase().search("daichi") != -1) {page = 17}
			if (args[1] === "18" || args[1].toLowerCase().search("federico") != -1) {page = 18}
			if (args[1] === "19" || args[1].toLowerCase().search("jomei") != -1) {page = 19}
			if (args[1] === "20" || args[1].toLowerCase().search("mel") != -1 && args[1].toLowerCase().search("aemele") === -1) {page = 20}
			if (args[1] === "21" || args[1].toLowerCase().search("ruslan") != -1) {page = 21}
			if (args[1] === "22" || args[1].toLowerCase().search("ryoushi") != -1) {page = 22}
			if (args[1] === "23" || args[1].toLowerCase().search("santo") != -1) {page = 23}
			if (args[1] === "24" || args[1].toLowerCase().search("shinji") != -1) {page = 24}
			if (args[1] === "25" || args[1].toLowerCase().search("tenome") != -1) {page = 25}
			if (args[1] === "26" || args[1].toLowerCase().search("wolf") != -1) {page = 26}
			if (Number.isInteger(args[1] * 1) === true) {
				inboxChannel.send(`${message.author.username} has looked at student ${args[1]}'s file from the third class.`)
			}
			if (Number.isInteger(args[1] * 1) === false) {
				inboxChannel.send(`${message.author.username} has looked at ${args[1].toUpperCase().slice(0, 1)}${args[1].toLowerCase().slice(1)}'s file from the third class.`)
			}
		}
		if (args[0] === "4") { //Class 04 ()
			classList = [
				{ studentID: "Name: Agnes María Camila Zalweski-Chavarría\nTalent: Voice Actor\nSex: Male\nStatus: Alive\n\nShoe Size: 7\nHeight: 5'2\"\nWeight: 112\nBlood Type: A\nBirthday: 04/21\nAge: 14", studentIDPicture: "" },
				{ studentID: "Name: Miyuki Hayashi\nTalent: Fire Dancer\nSex: Female\nStatus: Alive\n\nShoe Size: 7\nHeight: 5'5\"\nWeight: 120\nBlood Type: B\nBirthday: 05/24\nAge: 18", studentIDPicture: "" }
			]
			
			if (args.length === 1) {
				message.channel.send("Sorry, but we haven't had a fourth class yet!");
				inboxChannel.send(`${message.author.username} has looked at the fourth class' roster.`);
				return;
			}
			if (args[1] === "total") {
				message.channel.send("Sorry, but we haven't had a fourth class yet!");
				inboxChannel.send(`${message.author.username} has looked at the full version of the fourth class' roster.`);
				return;
			}

			let pageAmount = 2;
			let x = 0;
			while (x < pageAmount) {
				thumbnail = classList[x].studentIDPicture;
				if (thumbnail === "") {
					thumbnail = "https://imgur.com/OVPTMGn.png";
				};
				currentPage = {
					text: classList[x].studentID,
					thumbnail: thumbnail
				}
				pages.push(currentPage);
				x++;
			}

			if (args[1] === "NUMBER" || args[1].toLowerCase().search("aggi") != -1 || args[1].toLowerCase().search("agnes") != -1) {page = 1}
			if (args[1] === "NUMBER" || args[1].toLowerCase().search("miyuki") != -1) {page = 2}
			if (Number.isInteger(args[1] * 1) === true) {
				inboxChannel.send(`${message.author.username} has looked at student ${args[1]}'s file from the third class.`)
			}
			if (Number.isInteger(args[1] * 1) === false) {
				inboxChannel.send(`${message.author.username} has looked at ${args[1].toUpperCase().slice(0, 1)}${args[1].toLowerCase().slice(1)}'s file from the third class.`)
			}
		}
		if (args[0].toLowerCase() === "u") { //Ultra Despair Girls Arc
			classList = [
				{ studentID: "Name: Kotone Fukuzawa\nTalent: Anarchist\nSex: Female\nStatus: Alive\n\nShoe Size: 7\nHeight: 5'6\"\nWeight: 121\nBlood Type: AB\nBirthday: 11/04\nAge: 16", studentIDPicture: "https://imgur.com/OTttz9N.png" },
				{ studentID: "Name: Monobi\nStatus: Alive\n\nHeight: Uhh probably pretty short\nWeight: Probably pretty heavy\nBirthday: Uhh some date I guess\nAge: I'd imagine like maybe three years old", studentIDPicture: "https://imgur.com/CiGJlAd.png" }
			]
			
			if (args.length === 1) {
				message.channel.send("Sorry, but we haven't explored the outside world yet!");
				inboxChannel.send(`${message.author.username} has looked at the UDG roster.`);
				return;
			}
			if (args[1] === "total") {
				message.channel.send("Sorry, but we haven't explored the outside world yet!");
				inboxChannel.send(`${message.author.username} has looked at the full version of the UDG roster.`);
				return;
			}

			let pageAmount = 2;
			let x = 0;
			while (x < pageAmount) {
				thumbnail = classList[x].studentIDPicture;
				if (thumbnail === "") {
					thumbnail = "https://imgur.com/OVPTMGn.png";
				};
				currentPage = {text: classList[x].studentID, thumbnail: thumbnail}
				pages.push(currentPage);
				x++;
			}

			if (args[1].toLowerCase().search("kotone") != -1) {page = 1}
			if (args[1].toLowerCase().search("monobi") != -1) {page = 2}
			inboxChannel.send(`${message.author.username} has looked at ${args[1].toUpperCase().slice(0, 1)}${args[1].toLowerCase().slice(1)}'s file.`);
		}
		if (args[0] === "talents") {
			message.channel.send("```Cl.  Talent               Name\n3    Activist             Melchor Guadalupe Paz de la Cruz\n1    Actress              Ara Ayao\n3    Adult Film Actress   Nikki Cox\n1    Animal Caretaker     Jacek Żeglarski\n1    Archer               Théo Dubois\n2    Assassin             Chika Miyasaki\n1    Astronomer           Hoshi Chiura\n1    Balance (Blogger)    Masayuuki Taisho\n1    Baseball Player      Miyuki Ataru\n2    Birdwatcher          Kaipo Uilani Iona\n2    Biologist            Tsuyo Kogiyumi\n1    Blogger (Balance)    Masayuuki Taisho\n2    Bomb Maker           Monika Minami\n1    Botanist             Yukine Sakurai\n1    Boxer                Tezuku Imou\n3    Cadet                Piper McCullough\n3    Cheerleader          Dia Ramos\n2    Chemist              Eiichi Ryozo\n1    Chess Champion       Noriko Suzuki\n2    Clairvoyant          Akiko\n3    Combat Medic         Wolfgang Schwarz\n2    Conspiracy Theorist  Chikako Kaetsu\n3    Coroner              Santo Verdugo Bautista\n3    Counselor            Ayuma Tanaka\n1    Counterfeiter        Anzu Kofuku\n1    Cryptologist         Hachi Hiruma\n1    Dancer               Ryu Akahoshi\n2    Daredevil            Sora Kenshin\n1    Detective            Cheisu Maeda\n1    Digital Composer     Aika Mahaya\n2    Doll Maker           Yuna Akahoshi\n1    Fashion Designer     Anaelle Hamaan\n1    Figure Skater        Aurélie Cartier\nX    Fire Dancer          Miyuki Hayashi\n2    Florist              Kyabetsu Retesu\n1    Fortnite Gamer       Stella Hunter\n2    Fútbol Player        Rosendo Paulo Ochoa Merlo\n1    Gambler              S'ad Ludópata\n3    Ghostwriter          Tenome\n3    Graffiti Artist      Inugami Uzuki\n1    Hacker               Ximena Colomar\n3    Heiress              Renata de Santis\n3    Horror Novelist      Junko Saitou\n1    Hypnotist            Mori Hibana```");
			return message.channel.send("```2    Jeweler              Kagami Hannei\n2    Inventor             Hideo Takayama\n2    Lawyer               Ale del Prieto\n3    Lion Tamer           Areli Vepkhia\n2    Lucky Student        Kouki Yoshida\n3    Luthier              Ruslan Eun-Kyung Kraus\n2    Maid                 Saeko Kiyomizu\n1    Makeup Artist        Aiko Hikaru\n3    Magical Girl         Kirakira Kyuti\n1    Magician             Anya Sakaguchi\n2    Manipulator (Poet)   Souma Shimizu\n3    Martial Artist       Mariko Nakamura\n1    Matchmaker           Shiba Mikio\n3    Milkman              Charles Miller\n1    Model                Megu Kojima\n3    Mythologist          Isago Achikita\n2    Opera Singer         Arisa Shokuhou\n3    Pianist              Federico Navarro\n3    Pilot                Cecilio Gonzalo Calles Cárdenas\n2    Philanthropist       Yuuya Michimiya\n3    Physicist            Shinji Minoru\n2    Poet (Manipulator)   Souma Shimizu\n1    Prince               Kiro Karasu\n2    Puppeteer            Hana Kageriri\n3    Pyromaniac           Jomei Hoshino\n2    Ringmaster           Fenikku Hinotama\n3    Rock Star            Kumiko Yeun\n3    Satanist             Daichi Ichihara\n1    Singer               Kyoung-mi Park\n2    Spy                  Isha Kalki\n3    Stalker              Aemele Dèjré\n3    Storyteller          Ryoushi Nobuori\n2    Surgeon              Eiji Ryozo\n2    Swimmer              Katashi Maeda\n1    Swordsman            Minako Kaoru\n2    Technician           Tomomi Kashichi\n1    Tennis Player        Jeong Park\n2    Theologist           Michel Voigt\n1    Therapist            Tenshi Kawada\n3    Tragedian            Megami Himura\n4    Voice Actor          Agnes María Camila Zalweski-Chavarría\n2    Violinist            Asahi Fukuzawa\n1    Woodworker           Kazuya Harada```");
		}
		if (page === 0) {
			return message.channel.send("I'm sorry, but this student does not exist!  Please make sure that you entered the correct information!")
		}
		embed.setDescription(pages[page - 1].text);
		embed.setThumbnail(pages[page - 1].thumbnail)
		message.channel.send(embed).then(msg => {
			msg.react('◀').then(r => {
				msg.react('▶')

				const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
				const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;

				const backwards = msg.createReactionCollector(backwardsFilter, {
					time: 60000
				});
				const forwards = msg.createReactionCollector(forwardsFilter, {
					time: 60000
				});

				backwards.on('collect', r => {
					if (page === 1) return;
					page--;
					embed.setDescription(pages[page - 1].text);
					embed.setThumbnail(pages[page - 1].thumbnail)
					msg.edit(embed)
				})

				forwards.on('collect', r => {
					if (page === classList.length) return;
					page++;
					embed.setDescription(pages[page - 1].text);
					embed.setThumbnail(pages[page - 1].thumbnail)
					msg.edit(embed)
				})
			})
		})
	}
	if (command === "roomies") {
		let embed = new Discord.RichEmbed()
			.setColor(13959168)
		
		rooms = [
			{
				number: "1",
				description: "Aemele and Junko's room is very dark. On one wall, pictures of various people are found. Another wall seems to be painted to look like a sewer. There is a constant sound of dripping water but upon further examination, it is just a music player on loop. There are two identical twin sized beds on one side of the room with a nightstand beside each. On each stand is a clown-shaped lamp, resembling a popular 2017 movie character. There is a bathroom and a closet on the left wall.",
				people: ["Aemele", "Junko"]
			},
			{
				number: "2",
				description: "Renata, Cecilio, and Daichi's room has a metal, military-style bunk bed that sits on the south side of the room, and a matching single bed on the north. Beside the beds are metal dressers and lockers, meant to serve as storage units for the students. The room is quite modest overall, with cream-painted walls and a simple ivory tile floor. A red pentagram has been spray-painted to the floor. On the wall between the beds, there is an oil painting of what appears to be Monokuma, one half of him dressed in the robes of Jesus, and the other half with a devil horn and pitchfork. A gay pride flag hangs beside the painting, and underneath both of them, like a shrine of sorts, sits a metal nightstand with copes of the Bible and the Satanic Bible on it. The bathroom is beside the door.",
				people: ["Renata", "Cecilio", "Daichi"]
			},
			{
				number: "3",
				description: "Dia and the Tenome's room is extremely modern-looking, to the point of being boring and bland, starting with the walls being a boring, off-white color. Despite the expensive-looking furniture, the colors are dark and muted, adding no personality whatsoever to the room. It is also very cold. Next to the door is a sleek, black coat rack, and on the left wall is a desk, supported by the wall rather than the floor, and a chair with it. On the north wall, there is a queen-sized, black-sheeted bed, and an identical one across from it. The floor is rosewood and a black shag rug covers part of the floor. On the south wall is a wardrobe and dresser, both black in color. On the left wall, by the desk, is the bathroom, which matches the blandness of the main room.",
				people: ["Dia", "Tenome"]
			},
			{
				number: "4",
				description: "Nikki and Federico's room is very reminiscent of a busy elementary classroom. The walls, which were painted to have living crayons and the such, are decorated with inspirational posters, one being Monokuma hanging from a tree with the words 'HANG IN THERE' written on it. There is a rug on the floor, the kind one would find in a classroom, which is very piano-based. There is a cartoon image of a piano in the middle, surrounded by various musical notes. Twin beds are located beside each other, and a bathroom and rather large closet are located on the left wall.",
				people: ["Nikki", "Federico"]
			},
			{
				number: "5",
				description: "Jomei and Ryoushi's room is very fiery—literally. The walls are covered in Hotwheel-looking flame designs. On the south wall is a book shelf, but upon opening the books, one would find that all the pages are burnt. There is a distinct smell of fire and smoke that fills the room at all times, though it is especially prevalent at night. There are two queen beds located opposite to each other and on the left wall, there are two separate closets and a bathroom.",
				people: ["Ryoushi", "Jomei"]
			},
			{
				number: "6",
				description: "Areli, Mariko, and Ruslan's room is best described as a meat locker. Upon entering, visitors are met with a sharp chill. In a corner of the room, bloodied meat hangs, by string from the ceiling, causing a constant dripping sound as the blood slowly drains into a bucket. The room is devoid of almost any color, being mostly entirely white. Three cots lie on the ground, with fur blankets laid upon them to protect students from the cold. There are boxes across from each cot for storage. There is no bathroom.",
				people: ["Areli","Mariko","Ruslan"]
			},
			{
				number: "7",
				description: "Charles and Inugami's room screams American pride. It sticks to freedom's color scheme, which is red, white, and blue. The walls are painted in red and white stripes, and the entirety of the furniture is blue. The floor is hardwood. Spanning most of the left wall is the flag of the United States of America; there is also a mini-fridge, stocked with all types of milk, ranging from chocolate to soy to half-and-half. On the ceiling are glowing stars that glow vibrantly in the dark. There are two dressers on the south wall, fittingly painted red, white, and blue. Two patriotic queen sizes beds complete the look, one underneath the flag and the other on the adjacent wall. The bathroom is located on the empty wall.",
				people: ["Charles", "Inugami"]
			},
			{
				number: "8",
				description: "Melchor and Magami's room is very... dramatic. From the dark, moody lighting to the contrasting ivory furniture, it screams the word. On the other hand, the room is actually rather charming, despite being incredibly visually busy. It looks to be quite the mess, like a show or protest had just occurred. The occasional bright color streaks the wall. A table stands in the middle of the room with a bouquet of a dozen roses, half of them wilted. On the south wall is a bunk bed with a nightstand beside it. On the left wall, there is a closet and bathroom.",
				people: ["Melchor", "Megami"]
			},
			{
				number: "9",
				description: "Ayuma and Santo's room is shrouded in a haunting aura. As soon as you step in, the scent of death is overwhelming, and the colors are extremely dulled down. The floor of the room is tiled. The left wall is lined with fridges, each suspiciously the size of a human body. Cabinets are found across from the fridges, and carry an assortment of medical tools and clothing. In place of beds, there are two dissection tables, complete with a drain in the center to rid of any unnecessary fluids. The floor tiles appear to be stained with blood. There is no bathroom.",
				people: ["Ayuma", "Santo"]
			},
			{
				number: "10",
				description: "Shinji and Wolfgang's room is probably the most normal room on the train. The walls inside are navy blue, giving the room a rather distinguished feel. The periodic table is hung up on the left wall, but almost every element is blacked out. The remaining elements spell out 'LiFeSPan.' A table sits below it with various candles, a Newton's cradle, and a box for first aid. There are two identical twin sized beds as well, separated by two nightstands. The bathroom and closet are located on the left wall.",
				people: ["Shinji", "Wolfgang"]
			},
			{
				number: "11",
				description: "Kumi and Kirakira's room is very cute and soft. The walls are painted a pastel pink hue, and matching carpet covers the floor. The walls are entirely covered in posters of various magical girl characters, and of popular K-Pop girl groups. There are two queen-sized Sailor Moon themed beds with two nightstands in-between them. Across from the beds are a pair of dressers. There is also a spotlight in a corner beside the beds, controlled by a panel by the door. Beside the spotlight is the bathroom, and underneath it is a shelf, where manga, albums, stuffed animals, and a pink stereo are stored.",
				people: ["Kumi", "Kirakira"]
			},
			{
				number: "12",
				description: "Piper and Isago's room is chaotic down to every last detail, it looks as though a tornado ran through the place or, in other words, the Gods have been at war. Various parts of the room are singed and burnt, as though they had been struck by lightning or set on fire. The colors are also eye-bleeding, from the bright assortment of hues on the wall to the vibrant pink carpet. There are two queen beds, each piled high with brightly colored, tack blankets. Cat print, camouflage, whatever you can think of, there is a blanket of it in their room. There are also two wooden dressers in the back of the room, both covered almost entirely in stickers and making it near impossible to tell that they are wooden. Beside them is the bathroom.",
				people: ["Piper", "Isago"]
			}
		]

		if (args[0]) {
			if (args[0] === "1" || args[0].toLowerCase().search("aemele") != -1 || args[0].toLowerCase().search("junko") != -1) {
				page = 1;
			}
			else if (args[0] === "2" || args[0].toLowerCase().search("renata") != -1 || args[0].toLowerCase().search("cecilio") != -1 || args[0].toLowerCase().search("daichi") != -1) {
				page = 2;
			}
			else if (args[0] === "3" || args[0].toLowerCase().search("dia") != -1 || args[0].toLowerCase().search("tenome") != -1) {
				page = 3;
			}
			else if (args[0] === "4" || args[0].toLowerCase().search("nikki") != -1 || args[0].toLowerCase().search("federico") != -1) {
				page = 4;
			}
			else if (args[0] === "5" || args[0].toLowerCase().search("jomei") != -1 || args[0].toLowerCase().search("ryoushi") != -1) {
				page = 5;
			}
			else if (args[0] === "6" || args[0].toLowerCase().search("areli") != -1 || args[0].toLowerCase().search("mariko") != -1 || args[0].toLowerCase().search("ruslan") != -1) {
				page = 6;
			}
			else if (args[0] === "7" || args[0].toLowerCase().search("charles") != -1 || args[0].toLowerCase().search("inu") != -1) {
				page = 7;
			}
			else if (args[0] === "8" || args[0].toLowerCase().search("mel") != -1 || args[0].toLowerCase().search("megami") != -1) {
				page = 8;
			}
			else if (args[0] === "9" || args[0].toLowerCase().search("ayuma") != -1 || args[0].toLowerCase().search("santo") != -1) {
				page = 9;
			}
			else if (args[0] === "10" || args[0].toLowerCase().search("shinji") != -1 || args[0].toLowerCase().search("wolf") != -1) {
				page = 10;
			}
			else if (args[0] === "11" || args[0].toLowerCase().search("kumi") != -1 || args[0].toLowerCase().search("kira") != -1) {
				page = 11;
			}
			else if (args[0] === "12" || args[0].toLowerCase().search("piper") != -1 || args[0].toLowerCase().search("isago") != -1) {
				page = 12;
			}
			else {
				if (Number.isInteger(args[1] * 1) === true) {
					return message.channel.send("I'm sorry, but this room does not exist!  Please make sure that you entered the correct information!")
				}
				else if (Number.isInteger(args[1] * 1) === false) {
					return message.channel.send("I'm sorry, but this student does not exist!  Please make sure that you entered the correct information!")
				}
			}

			room = rooms[page - 1];
			if (room.people.length === 2) {
				roomInhabitants = room.people[0] + " and " + room.people[1];
			}
			else if (room.people.length === 3) {
				roomInhabitants = room.people[0] + ", " + room.people[1] + " and " + room.people[2];
			}
			roomTitle = "Room #" + room.number + ": " + roomInhabitants;

			embed.setDescription(room.description);
			embed.setAuthor(roomTitle);
			return message.channel.send(embed);
		}
		else {
			embed.setAuthor("Killing School Ride Room Arrangements");
			for (x = 0; x < 12; x++) {
				room = rooms[x];
				if (room.people.length === 2) {
					roomInhabitants = room.people[0] + " and " + room.people[1];
				}
				else if (room.people.length === 3) {
					roomInhabitants = room.people[0] + ", " + room.people[1] + " and " + room.people[2];
				}
				embed.addField(`Room #${room.number}`, `${roomInhabitants}`)
			}
			return message.channel.send(embed);
		}
	}
	if (command === "sprites") {
		message.channel.send({
			embed: { //Sends the student's info
				title: "Kaeno Shinjomu Sprite Masterposts",
				description: "Click on a link to view the masterposts containing all sprites for their respective classes.\n\n[**CLASS 01**](https://imgur.com/a/YKlnXcm)\n[**CLASS 01 REVAMPED**](https://imgur.com/a/5HxXTfJ)\n[**CLASS 02**](https://imgur.com/a/W6lSVxl)\n[**CLASS 02 GLITCHED**](https://imgur.com/a/qqOupuD)\n[**ULTRA DESPAIR GIRLS**](https://imgur.com/a/tBC6sWb)\n[**CLASS 03**](https://imgur.com/a/7JX0shS)",
				color: 15285149
			}
		})
		inboxChannel.send(`${message.author.username} has asked Monomi for the class sprites masterposts.`);
		return;
	}

	//Fun Commands
	if (command === "execute") {
		if (message.content.length > 12) {
			var executee = message.content.substring("m!execute ".length);
			if (executee.search("@") != -1) {
				var executeNext = executee.substring("<@&".length).split(">");
				if (message.guild.roles.some(x => x.id === executeNext[0]) === false) {
					if (executee.search("@everyone") != -1) {
						inboxChannel.send(`${message.author.username} has executed everyone!`);
						message.channel.send({
							embed: {
								color: 13959168,
								author: {
									name: "Monokuma",
									icon_url: "https://i.imgur.com/JxJpD8W.png"
								},
								"image": {
									"url": "https://imgur.com/lmCh3FX.gif"
								},
								description: "It appears that the class has voted for the wrong culprit, and thus, the blackened has won!  Time for the punishment!"
							}
						})
					} else {
						if (executee.search("@here") != -1) {
							inboxChannel.send(`${message.author.username} has executed everyone!`);
							message.channel.send({
								embed: {
									color: 13959168,
									author: {
										name: "Monokuma",
										icon_url: "https://i.imgur.com/JxJpD8W.png"
									},
									"image": {
										"url": "https://imgur.com/lmCh3FX.gif"
									},
									description: "It appears that the class has voted for the wrong culprit, and thus, the blackened has won!  Time for the punishment!"
								}
							})
						} else {
							if (message.mentions.members.first().id === "476831906835464205") {
								inboxChannel.send(`${message.author.username} has executed Monomi.`);
								message.channel.send({
									embed: {
										color: 13959168,
										author: {
											name: "Monokuma",
											icon_url: "https://i.imgur.com/JxJpD8W.png"
										},
										"image": {
											"url": "https://cdn.discordapp.com/attachments/480579103167086603/482047064302157824/Danganronpa_1_2_Reload_MONOMI_S_EXECUTION.gif"
										},
										description: "Ooh man, I've been waiting for this!  Bye bye, little sister!"
									}
								})
							} else {
								if (message.guild.id != "455218035507331072") {
									mastermindName = "Dee";
									mastermindId = "105368288170622976";
								}
								if (message.guild.id === "455218035507331072") {
									mastermindName = "Masayuuki Taisho";
									mastermindId = "278147425577730048";
								}
								if (message.mentions.members.first().id === mastermindId) {
									inboxChannel.send(`${message.author.username} has executed ${mastermindName}, the mastermind.`);
									message.channel.send({
										embed: {
											color: 13959168,
											author: {
												name: mastermindName,
												icon_url: client.users.find('id', mastermindId).avatarURL
											},
											"image": {
												"url": "https://imgur.com/LFvOd9P.gif"
											},
											description: `It appears that I, ${mastermindName}, have been proven as being the mastermind! Time for my punishment!`
										}
									})
								} else {
									if (message.author.id === message.mentions.members.first().id) {
										inboxChannel.send(`${message.author.username} has executed themselves.`);
										message.channel.send({
											embed: {
												color: 13959168,
												author: {
													name: "Monokuma",
													icon_url: "https://i.imgur.com/JxJpD8W.png"
												},
												"image": {
													"url": "https://imgur.com/qfwixbO.gif"
												},
												description: `Wow, you're an honest one, aren't you?  Well, let's get this show on! ${message.mentions.members.first()} has been found guilty!  Time for the punishment!`
											}
										})
									} else {
										inboxChannel.send(`${message.author.username} has executed ${client.users.find('id', message.mentions.members.first().id).username}!`);
										message.channel.send({
											embed: {
												color: 13959168,
												author: {
													name: "Monokuma",
													icon_url: "https://i.imgur.com/JxJpD8W.png"
												},
												"image": {
													"url": "https://imgur.com/qfwixbO.gif"
												},
												description: `${message.mentions.members.first()} has been found guilty!  Time for the punishment!`
											}
										})
									}
								}
							}
						}
					}
				} else {
					inboxChannel.send(`${message.author.username} has tried to execute a role.`);
					message.channel.send("Please specify a person, rather than a role!");
				}
			} else {
				inboxChannel.send(`${message.author.username} has tried to execute someone, but failed.`);
				message.channel.send("Please specify who is being executed by using their Discord Tag!");
			}
		} else {
			inboxChannel.send(`${message.author.username} has tried to execute someone, but failed.`);
			message.channel.send("Please specify who is being executed!");
		}
	}
	if (command === "love" || command === "ship") {
		if (args.length > 1) {
			if (args[0].search("@") != -1 && args[1].search("@") != -1) {
				if (args[0].search("@everyone") === -1 && args[1].search("@everyone") === -1) {
					if (args[0].search("@here") === -1 && args[1].search("@here") === -1) {
						if (args[0].search("<@&") === -1 && args[1].search("<@&") === -1) {
							if (args[0] === args[1]) {
								let title = `${client.users.find('id', message.mentions.members.first().id).username} :heart: ${client.users.find('id', message.mentions.members.first().id).username}`;
								message.channel.send({
									embed: {
										color: 15285149,
										title: title,
										description: "Self-love is important!\n\nLove Meter: 100%\n████████████████████████████████████████",
										"image": {
											"url": "https://imgur.com/Ng95j3a.gif"
										}
									}
								});
								inboxChannel.send(`${message.author.username} checked their self-love meter, which was at 100%!`)
							} else {
								meters = ["▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,0%",
									"▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,1%",
									"▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,2%",
									"█▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,3%",
									"█▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,4%",
									"██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,5%",
									"██▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,6%",
									"██▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,7%",
									"███▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,8%",
									"███▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,9%",
									"████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,10%",
									"████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,11%",
									"████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,12%",
									"█████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,13%",
									"█████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,14%",
									"██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,15%",
									"██████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,16%",
									"██████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,17%",
									"███████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,18%",
									"███████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,19%",
									"████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,20%",
									"████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,21%",
									"████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,22%",
									"█████████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,23%",
									"█████████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,24%",
									"██████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,25%",
									"██████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,26%",
									"██████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,27%",
									"███████████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,28%",
									"███████████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,29%",
									"████████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,30%",
									"████████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,31%",
									"████████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,32%",
									"█████████████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,33%",
									"█████████████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,34%",
									"██████████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,35%",
									"██████████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,36%",
									"██████████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,37%",
									"███████████████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,38%",
									"███████████████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,39%",
									"████████████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,40%",
									"████████████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,41%",
									"████████████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,42%",
									"█████████████████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,43%",
									"█████████████████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,44%",
									"██████████████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,45%",
									"██████████████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,46%",
									"██████████████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,47%",
									"███████████████████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,48%",
									"███████████████████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,49%",
									"████████████████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,50%",
									"████████████████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,51%",
									"████████████████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,52%",
									"█████████████████████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,53%",
									"█████████████████████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,54%",
									"██████████████████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,55%",
									"██████████████████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,56%",
									"██████████████████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,57%",
									"███████████████████████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,58%",
									"███████████████████████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,59%",
									"████████████████████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,60%",
									"████████████████████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,61%",
									"████████████████████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁,62%",
									"█████████████████████████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁,63%",
									"█████████████████████████▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁,64%",
									"██████████████████████████▁▁▁▁▁▁▁▁▁▁▁▁▁▁,65%",
									"██████████████████████████▃▁▁▁▁▁▁▁▁▁▁▁▁▁,66%",
									"██████████████████████████▆▁▁▁▁▁▁▁▁▁▁▁▁▁,67%",
									"███████████████████████████▂▁▁▁▁▁▁▁▁▁▁▁▁,68%",
									"███████████████████████████▅▁▁▁▁▁▁▁▁▁▁▁▁,69%",
									"████████████████████████████▁▁▁▁▁▁▁▁▁▁▁▁,70%",
									"████████████████████████████▃▁▁▁▁▁▁▁▁▁▁▁,71%",
									"████████████████████████████▆▁▁▁▁▁▁▁▁▁▁▁,72%",
									"█████████████████████████████▂▁▁▁▁▁▁▁▁▁▁,73%",
									"█████████████████████████████▅▁▁▁▁▁▁▁▁▁▁,74%",
									"██████████████████████████████▁▁▁▁▁▁▁▁▁▁,75%",
									"██████████████████████████████▃▁▁▁▁▁▁▁▁▁,76%",
									"██████████████████████████████▆▁▁▁▁▁▁▁▁▁,77%",
									"███████████████████████████████▂▁▁▁▁▁▁▁▁,78%",
									"███████████████████████████████▅▁▁▁▁▁▁▁▁,79%",
									"████████████████████████████████▁▁▁▁▁▁▁▁,80%",
									"████████████████████████████████▃▁▁▁▁▁▁▁,81%",
									"████████████████████████████████▆▁▁▁▁▁▁▁,82%",
									"█████████████████████████████████▂▁▁▁▁▁▁,83%",
									"█████████████████████████████████▅▁▁▁▁▁▁,84%",
									"██████████████████████████████████▁▁▁▁▁▁,85%",
									"██████████████████████████████████▃▁▁▁▁▁,86%",
									"██████████████████████████████████▆▁▁▁▁▁,87%",
									"███████████████████████████████████▂▁▁▁▁,88%",
									"███████████████████████████████████▅▁▁▁▁,89%",
									"████████████████████████████████████▁▁▁▁,90%",
									"████████████████████████████████████▃▁▁▁,91%",
									"████████████████████████████████████▆▁▁▁,92%",
									"█████████████████████████████████████▂▁▁,93%",
									"█████████████████████████████████████▅▁▁,94%",
									"██████████████████████████████████████▁▁,95%",
									"██████████████████████████████████████▃▁,96%",
									"██████████████████████████████████████▆▁,97%",
									"███████████████████████████████████████▂,98%",
									"███████████████████████████████████████▅,99%",
									"████████████████████████████████████████,100%"
								]
								let loveMeter = random(meters);
								let loveScore = loveMeter.split(",")
								let title = `${client.users.find('id', message.mentions.members.first().id).username} :heart: ${client.users.find('id', message.mentions.members.last().id).username}`
								message.channel.send({
									embed: {
										color: 15285149,
										title: title,
										description: `Love Meter: ${loveScore[1]}\n${loveScore[0]}`,
										"image": {
											"url": "https://imgur.com/Ng95j3a.gif"
										}
									}
								});
								inboxChannel.send(`${message.author.username} checked the love meter of ${client.users.find('id', message.mentions.members.first().id).username} and ${client.users.find('id', message.mentions.members.last().id).username}, which was at ${loveScore[1]}!`)
							}
						} else {
							inboxChannel.send(`${message.author.username} tried to check a love meter involving a role.`)
							message.channel.send("You can't check the love meter of roles! Please specify who your checking the love meter of!")
						}
					} else {
						inboxChannel.send(`${message.author.username} tried to check the love meter of everyone.`)
						message.channel.send("Woah there! You can't check the love meter of *everyone*! Please specify who your checking the love meter of!")
					}
				} else {
					inboxChannel.send(`${message.author.username} tried to check the love meter of everyone.`)
					message.channel.send("Woah there! You can't check the love meter of *everyone*! Please specify who your checking the love meter of!")
				}
			} else {
				inboxChannel.send(`${message.author.username} tried to check a love meter, but didn't specify two people.`)
				message.channel.send("Please specify who your checking the love meter of using their Discord tags!")
			}
		} else {
			inboxChannel.send(`${message.author.username} tried to check a love meter, but didn't specify two people.`)
			message.channel.send("Please specify who your checking the love meter of!")
		}
	}
	if (command === "hope") {
		const hope0 = client.emojis.find("name", "Hope0")
		const hope1 = client.emojis.find("name", "Hope1")
		const hope2 = client.emojis.find("name", "Hope2")
		const hope3 = client.emojis.find("name", "Hope3")
		const hope4 = client.emojis.find("name", "Hope4")
		const hope5 = client.emojis.find("name", "Hope5")
		const hope6 = client.emojis.find("name", "Hope6")
		if (args.length === 0 || args[0].search("<@") === -1) {
			inboxChannel.send(`${message.author.username} tried to check the hope fragments of someone, but failed to specify who.`)
			message.channel.send("Please specify a student!");
			return;
		}
		if (client.users.find('id', message.mentions.members.first().id).bot === true) {
			inboxChannel.send(`${message.author.username} tried to check the hope fragments of a bot.`)
			message.channel.send("You can't have hope fragments with a bot!");
			return;
		}
		if (message.mentions.members.first().id === message.author.id) {
			inboxChannel.send(`${message.author.username} tried to check to how many hope fragments they had with themselves.`)
			message.channel.send("You can't have hope fragments with yourself, silly!");
			return;
		}
		arr_hope = [`You have ${hope0} 0 hope fragments with ${client.users.find('id', message.mentions.members.first().id).username}.\n\nGo introduce yourself!,https://i.imgur.com/vqURCNE.png`,
			`You have ${hope1} 1 hope fragment with ${client.users.find('id', message.mentions.members.first().id).username}.,https://i.imgur.com/Mktu16G.png`,
			`You have ${hope2} 2 hope fragments with ${client.users.find('id', message.mentions.members.first().id).username}.,https://i.imgur.com/4owkJn1.png`,
			`You have ${hope3} 3 hope fragments with ${client.users.find('id', message.mentions.members.first().id).username}.,https://i.imgur.com/cVXpySt.png`,
			`You have ${hope4} 4 hope fragments with ${client.users.find('id', message.mentions.members.first().id).username}.,https://i.imgur.com/C2BFXaI.png`,
			`You have ${hope5} 5 hope fragments with ${client.users.find('id', message.mentions.members.first().id).username}.,https://i.imgur.com/rOXG8SG.png`,
			`You have all ${hope6} 6 hope fragments with ${client.users.find('id', message.mentions.members.first().id).username}.\n\nGreat job!,https://i.imgur.com/SdYnYZ5.png`
		];
		hope = random(arr_hope).split(",");
		message.channel.send({
			embed: {
				color: 15285149,
				title: "Hope Fragments",
				description: hope[0],
				"thumbnail": {
					"url": hope[1]
				}
			}
		});
		inboxChannel.send(`${message.author.username} checked how many hope fragments they had with ${client.users.find('id', message.mentions.members.first().id).username}.`)
	}
	if (command === "ask") {
		if (message.content.length > 6) {
			var question = message.content.substring("m!ask ".length);
			var hasOr = question.toLowerCase().search("or");
			if (hasOr != -1) {
				var arrayOr = question.split(" or ");
				let answerOr = random(arrayOr);
				inboxChannel.send(`${message.author.username} has asked Monomi, "${question}", and Monomi replied with, "${answerOr}"`);
				message.channel.send(`I choose ${answerOr}!`);
			} else {
				var hasWho = question.toLowerCase().search("who");
				if (hasWho != -1) {
					var arrayWho = [`${message.guild.members.random()} did it!`, `It was ${message.guild.members.random()}.`, `${message.guild.members.random()}! It was them!`];
					let answerWho = random(arrayWho);
					inboxChannel.send(`${message.author.username} has asked Monomi, "${question}", and Monomi replied with, "${answerWho}"`);
					message.channel.send(answerWho);
				} else {
					var hasWhy = question.toLowerCase().search("why");
					if (hasWhy != -1) {
						var arrayWhy = ["Oh, you know.", "Because.", "Why not?"];
						let answerWhy = random(arrayWhy);
						inboxChannel.send(`${message.author.username} has asked Monomi, "${question}", and Monomi replied with, "${answerWhy}"`);
						message.channel.send(answerWhy);
					} else {
						var hasHow = question.toLowerCase().search("how");
						if (hasHow != -1) {
							var arrayHow = [
								'https://www.wikihow.com/Act-Like-Sasuke',
								'https://www.wikihow.com/Act-Like-Naruto',
								'https://www.wikihow.com/Get-Rid-of-Weevils-(Flour-Bugs)',
								'https://m.wikihow.com/Sleep-Naked',
								'http://m.wikihow.com/Destroy-a-Relationship-on-Club-Penguin',
								'http://m.wikihow.com/Calculate-Pi-by-Throwing-Frozen-Hot-Dogs',
								'https://www.wikihow.com/Be-a-Christian-Emo',
								'http://www.wikihow.com/Stop-Your-Child-From-Masturbating-in-Public',
								'http://www.wikihow.com/Pretend-You-Have-a-Girlfriend',
								'http://www.wikihow.com/Be-a-Maid-and-Slave-on-Club-Penguin',
								'http://m.wikihow.com/Draw-Adolf-Hitler',
								'http://m.wikihow.com/Pronounce-Meme',
								'https://www.wikihow.com/React-when-Your-Teenager-Is-Wearing-Diapers',
								'https://www.wikihow.com/Keep-From-Being-Afraid-After-Playing-a-Roblox-Horror-Game',
								'http://www.wikihow.com/Act-Like-a-Vampire-at-School',
								'http://m.wikihow.com/Pee-in-a-Bottle',
								'https://www.wikihow.com/Appreciate-Brony-Music',
								'https://www.wikihow.com/Spot-Fake-Ugg-Boots',
								'http://www.wikihow.com/Get-Circumcised',
								'https://www.wikihow.com/Buy-a-Gun-in-San-Diego',
								'http://www.wikihow.com/Run-Like-Naruto',
								'https://www.wikihow.com/Have-Multiple-Personalities-on-Club-Penguin',
								'https://www.wikihow.com/Look-Like-Undertale-Characters-in-Animal-Jam',
								'http://www.wikihow.com/Be-a-Creepy-Person',
								'https://wikihow.com/Show-off-Your-Muscles-Without-It-Seeming-Intentional',
								'https://www.wikihow.com/Frown',
								'http://www.wikihow.com/Get-a-Girl-Pregnant',
								'https://www.wikihow.com/Be-Emo-in-Middle-School',
								'https://www.wikihow.com/Increase-Penis-Size-Using-Herbs',
								'https://www.wikihow.com/Build-a-Gallows',
								'https://www.wikihow.com/Pwn-People-in-Roblox',
								'https://www.wikihow.com/Hold-in-a-Fart',
								'http://www.wikihow.com/Stop-Wet-Dreams',
								'http://m.wikihow.com/Break-up-With-Someone-Who-Has-a-Heart-Condition',
								'http://www.wikihow.com/Be-Pure-Hearted-Like-Goku',
								'https://m.wikihow.com/Cosplay-As-a-Pony',
								'https://www.wikihow.com/Produce-Saliva',
								'http://www.wikihow.com/Die-Peacefully',
								'http://www.wikihow.com/Increase-Your-Ejaculate',
								'http://www.wikihow.com/Train-to-Be-a-Ninja-Easily',
								'https://www.wikihow.com/Stop-a-Goose-Attack',
								'https://www.wikihow.com/Breed-Syrian-Hamsters',
								'https://www.wikihow.com/Cosplay-As-Junko-Enoshima',
								'https://www.wikihow.com/Act-Yandere-Without-Being-Weird',
								'https://www.wikihow.com/Do-an-Evil-Laugh',
								'https://www.wikihow.com/Vomit-While-Driving',
								'https://www.wikihow.com/Solve-a-Problem',
								'https://www.wikihow.com/Prune-Bougainvillea',
								'https://www.wikihow.com/Acquire-Property-Through-Adverse-Possession',
								'https://www.wikihow.com/Drink-Alcohol',
								'https://www.wikihow.com/Do-Nipple-Stimulation-to-Induce-Labor',
								'https://www.wikihow.com/Get-Into-Shape-for-Horseback-Riding',
								'https://www.wikihow.com/Determine-the-Sex-of-a-Dwarf-Hamster',
								'https://www.wikihow.com/Balance-Vaginal-pH',
								'https://www.wikihow.com/Rehydrate-Stale-Tobacco',
								'https://www.wikihow.com/Get-Gasoline-Smell-Out-of-Clothes',
								'https://www.wikihow.com/Get-Over-Being-Used',
								'https://www.wikihow.com/Report-Employers-Who-Hire-Illegal-Immigrants',
								'https://www.wikihow.com/Keep-Roaches-Away-from-Your-Bed',
								'https://www.wikihow.com/Cook-Almonds',
								'https://www.wikihow.com/Be-a-Good-Woman',
								'https://www.wikihow.com/Spot-a-Gold-Digger',
								'https://www.wikihow.com/Deal-With-Porn-Addiction',
								'https://www.wikihow.com/Not-Get-Caught-Looking-at-Porn'
							];
							let answerHow = random(arrayHow);
							inboxChannel.send(`${message.author.username} has asked Monomi, "${question}", and Monomi replied with ${answerHow}`);
							message.channel.send(`Try this: ${answerHow}`);
						} else {
							if (question.toLowerCase().search("do you noodle") != -1) {
								inboxChannel.send(`${message.author.username} asked Monomi if she noodle.  She does.`);
								message.channel.send("Yes, I noodle!");
								return;
							}
							if (question.toLowerCase().search("are you karkalicious") != -1) {
								inboxChannel.send(`${message.author.username} asked Monomi if she was karkalicious.  She doesn't do kismesis.`);
								message.channel.send("Yeah, I don't do kismesis.");
								return;
							}
							if (question.toLowerCase().search("should i mine at night") != -1) {
								inboxChannel.send(`${message.author.username} asked Monomi if they should mine at night or not.`);
								message.channel.send("Don't mine at night!");
								return;
							}
							if (question.toLowerCase().search("mastermind") != -1) {
								inboxChannel.send(`${message.author.username} asked Monomi about the mastermind.`);
								message.channel.send("I can't answer that.");
								return;
							}
							var arrayElse = ['Absolutely!', 'Yup!', 'Yes!', 'Maybe so.', 'Maybe.', 'Oh, you know.', 'No.', 'Nope.', 'Absolutely not!'];
							let answerElse = random(arrayElse);
							inboxChannel.send(`${message.author.username} has asked Monomi, "${question}", and Monomi replied with, "${answerElse}"`);
							message.channel.send(answerElse);
						}
					}
				}
			}
		} else {
			inboxChannel.send(`${message.author.username} tried to ask Monomi something, but failed.`);
			message.channel.send("Please ask a question!");
		}
	}
	if (command === "cow") {
		if (args.length > 0 && args[0].search("@") != -1) {
			if (args[0].search("&") != -1) {
				inboxChannel.send(`${message.author.username} has tried to turn someone into a cow, but failed to specify who.`)
				message.channel.send("Please specify the student that I'm turning into a cow!")
				return
			}
			if (args[0].search("@everyone") != -1 || args[0].search("@here") != -1) {
				inboxChannel.send(`${message.author.username} has tried to turn everyone into a cow.`)
				message.channel.send("No way!  I'm not turning the entire class into cows!");
				return
			}
			if (message.mentions.members.first().id === client.user.id) {
				inboxChannel.send(`${message.author.username} has tried to turn Monomi into a cow.`)
				message.channel.send("Wha-wha?!  I'm not going to turn myself into a cow!");
				return
			}
			if (message.channel.name === "nsfw") {
				inboxChannel.send(`${message.author.username} has turned ${client.users.find('id', message.mentions.members.first().id).username} into Cow Ouma.`)
				message.channel.send({
					embed: {
						color: 15285149,
						"image": {
							"url": 'https://i.imgur.com/65eC9or.png'
						},
						title: `${client.users.find('id', message.mentions.members.first().id).username} has been turned into a cow!`
					}
				});
				return
			}
			inboxChannel.send(`${message.author.username} has turned ${client.users.find('id', message.mentions.members.first().id).username} into a cow.`)
			message.channel.send({
				embed: {
					color: 15285149,
					"image": {
						"url": 'https://imgur.com/g7YyeYN.gif'
					},
					title: `${client.users.find('id', message.mentions.members.first().id).username} has been turned into a cow!`
				}
			});
		} else {
			inboxChannel.send(`${message.author.username} has tried to turn someone into a cow, but failed to specify who.`)
			message.channel.send("Please specify who I'm turning into a cow!")
		}
	}
	if (command === "chicken") {
		if (args.length > 0 && args[0].search("@") != -1) {
			if (args[0].search("&") != -1) {
				inboxChannel.send(`${message.author.username} has tried to turn someone into a chicken, but failed to specify who.`)
				message.channel.send("Please specify the student that I'm turning into a chicken!")
				return
			}
			if (args[0].search("@everyone") != -1 || args[0].search("@here") != -1) {
				inboxChannel.send(`${message.author.username} has tried to turn everyone into a chicken.`)
				message.channel.send("No way!  I'm not turning the entire class into chickens!");
				return
			}
			if (message.mentions.members.first().id === client.user.id) {
				message.channel.send("Wha-wha?!  I'm not going to turn myself into a chicken!");
				return
			}
			inboxChannel.send(`${message.author.username} has turned ${client.users.find('id', message.mentions.members.first().id).username} into a cow.`)
			message.channel.send({
				embed: {
					color: 15285149,
					"image": {
						"url": "https://imgur.com/hiUuUm0.gif"
					},
					title: `${client.users.find('id', message.mentions.members.first().id).username} has been turned into a chicken!`
				}
			});
		} else {
			inboxChannel.send(`${message.author.username} has tried to turn someone into a chicken, but failed to specify who.`)
			message.channel.send("Please specify who I'm turning into a chicken!")
		}
	}
	if (command === "kill" || command === "perish" || command === "destroy") {
		killgifs = ['https://orig00.deviantart.net/d9af/f/2012/214/c/0/monokuma_s_cockscrew_punch_by_reinhan-d59lydy.gif ||| corkscrew punch', //Corkscrew Punch
			'https://orig00.deviantart.net/442e/f/2012/214/8/b/monokuma_s_kick_by_reinhan-d59ly27.gif ||| kick', //Kick
			'https://orig08.deviantart.net/e684/f/2012/214/7/5/monokuma_s_punch_by_reinhan-d59lxpv.gif ||| punch', //Punch
			'https://orig00.deviantart.net/e619/f/2012/214/3/5/monokuma_s_ridicule_punch_by_reinhan-d59lyxk.gif ||| ridicule punch', //Ridicule Punch
			'https://orig00.deviantart.net/01fa/f/2012/214/4/0/monokuma_s_bullet_punch_by_reinhan-d59lzit.gif ||| bullet punch', //Bullet Punch
			'https://www.vgfacts.com/attachments/full/4/8517.gif ||| meteor punch', //Meteor Punch
			'https://orig00.deviantart.net/857e/f/2012/214/3/e/monokuma_s_flash_by_reinhan-d59lzal.gif ||| flash attack', //Flash Attack
			'https://steamuserimages-a.akamaihd.net/ugc/268346916422923137/2D7D0AFADCA2D59A8A48B83ACB7E9058B1E000F7/ ||| Heaven\'s Door punch', //Monokuma's Heaven's Door
		];
		killchoice = random(killgifs);
		killarray = killchoice.split(" ||| ")
		inboxChannel.send(`${message.author.username} has ordered Monokuma to hurt Monomi using his ${killarray[1]}!`)
		message.channel.send({
			embed: {
				color: 13959168,
				author: {
					name: "Monokuma",
					icon_url: "https://i.imgur.com/JxJpD8W.png"
				},
				title: `Monokuma used his ${killarray[1]} on Monomi!`,
				"image": {
					"url": killarray[0]
				}
			}
		})
	}
	if (command === "noodle") {
		message.channel.send("Oh yeah, noodle!")
	}
	if (command === "preg") {
		message.channel.send("Fuck you.", {
			file: "https://imgur.com/M4cALh8.png"
		})
	}
	if (command === ":)") {
		if (!servers[message.guild.id]) servers[message.guild.id] = {
			queue: []
		}
		var server = servers[message.guild.id];

		if (!message.member.voiceChannel) {
			return message.channel.send(":x: You must be in a voice channel to use this command.")
		};

		server.queue.push({
			title: "Something Special",
			url: "https://www.youtube.com/watch?v=ZcoqR9Bwx1Y"
		});
		if (currentlyPlaying === null) {
			message.channel.send(`:notes: Now playing something special.`)
		}
		if (currentlyPlaying != null) {
			message.channel.send(`:notes: Added something special to the queue.`)
		}
		if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
			play(connection, message)
		});
	}
	if (command === "mm") {
		if (MM_InProgress === true) {
			return message.channel.send("A game of Monomi's Murder Mystery is already in progress!");
		};

		MM_InProgress = true;
		const filter = (reaction, user) => {
			if (user.id === client.user.id) {
				return
			};
			if (reaction.emoji.name === correctAnswer) {
				correctness = 1;
			};
			if (reaction.emoji.name != correctAnswer) {
				correctness = 2;
			};
			return ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫"].includes(reaction.emoji.name) === true;
		};
		correctness = 0;
		noIcon = "https://imgur.com/OVPTMGn.png";
		students = [
			/*1*/ /*0*/ {
				name: "Aika Mahaya",
				clues: ["blond", "The murderer left a footprint in size **8 or 9 women's** and size **6 or 7 men's**.", "There was a puddle of vomit at the scene.", "A music note hair pin was found on the ground of the scene.", "A necklace was found on the victim's body.", "A microphone with blood on it was found hidden away at the scene."],
				img: "https://imgur.com/bwCpEuF.png",
				imgDead: "https://imgur.com/sGjckJ3.png"
			},
			/*1*/ /*1*/ {
				name: "Aiko Hikaru",
				clues: ["pink", "The murderer left a footprint in size **10 or 11 women's** and size **8 or 9 men's**.", "A heart-shaped pin was found at the scene.", "There were smears of eye shadow found on the victim."],
				img: "https://imgur.com/obSzp4m.png",
				imgDead: "https://imgur.com/9e2GDAr.png"
			},
			/*1*/ /*2*/ {
				name: "Anaelle Hamaan",
				clues: ["brown", "The murderer did not leave any footprints.", "A scrap of black fabric was found in the victim's palm.", "A pair of scissors were found at the scene.", "The murderer's profile picture is Lisa Simpson.", "Shreds from a dress were found at the scene.", "A scrap of red and blue fabric was found clutched in the victim's hand.", "A scrap of striped fabric was found on the floor of the scene.", "A scrap of orange fabric was found at the scene."],
				img: "https://imgur.com/Yz4wANs.png",
				imgDead: "https://imgur.com/4HOZ1QT.png"
			},
			/*1*/ /*+3+*/ {
				name: "Anya Sakaguchi",
				clues: ["sunset", "The murderer did not leave any footprints.", "", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*+4+*/ {
				name: "Anzu Kofuku",
				clues: ["brown", "The murderer did not leave any footprints.", "A few pieces of currency were found in the victim's pocket.", "Coins were found in the victim's mouth.", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*5*/ {
				name: "Ara Ayao",
				clues: ["black", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "The scent of a sweet perfume lingers at the scene.", "The victim was wounded in six different areas on their body.", "The victim's body is badly mutilated."],
				img: "https://imgur.com/2EO9cr4.png",
				imgDead: "https://imgur.com/3fZhaHt.png"
			},
			/*1*/ /*+6+*/ {
				name: "Aurélie Cartier",
				clues: ["red", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A bloody dance blade was found at the scene.", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*7*/ {
				name: "Cheisu Maeda",
				clues: ["blond", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "A magnifying glass was found at the scene.", "Torn pieces of a burnt note were found at the scene.", "A silver ring was found at the scene."],
				img: "https://imgur.com/j0rMrbk.png",
				imgDead: "https://imgur.com/IaXHEeK.png"
			},
			/*1*/ /*8*/ {
				name: "Hachi Hiruma",
				clues: ["blond", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "On a nearby surface to the victim, there are thirteen notches carved into the wall.", "There were traces of a nicely scented dust at the scene.", "An empty journal was left near the victim.", "The temperature of the room the victim was found in was incredibly high.", "There was a yellow puddle of a mystery liquid found at the scene."],
				img: "https://imgur.com/aEGV6Wc.png",
				imgDead: "https://imgur.com/GFrnNjz.png"
			},
			/*1*/ /*9*/ {
				name: "Hoshi Chiura",
				clues: ["black", "The murderer left a footprint in size **10 or 11 women's** and size **8 or 9 men's**.", "A suicide note was found next to the victim.", "A scrap of orange fabric was found at the scene.", "A death poem was stuffed into the victim's pocket."],
				img: "https://imgur.com/LpnuQFy.png",
				imgDead: "https://imgur.com/OBjKPR9.png"
			},
			/*1*/ /*+10+*/ {
				name: "Jacek Żeglarski",
				clues: ["blond", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "Pellets of animal feed were found near the body.", "A leash was fastened around the victim's neck."],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*11*/ {
				name: "Jeong Park",
				clues: ["black", "The murderer left a footprint in size **5 or 6 women's** and size **3 or 4 men's**.", "A bloody sports ball was found at the scene.", "There were smears of concealer found on the victim."],
				img: "https://imgur.com/oSsUnKC.png",
				imgDead: "https://imgur.com/JK7VKYy.png"
			},
			/*1*/ /*+12+*/ {
				name: "Kazuya Harada",
				clues: ["brown", "The murderer did not leave any footprints.", "A saw was found at the scene.", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*13*/ {
				name: "Kiro Karasu",
				clues: ["platinum blond", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "An arrow was found at the scene.", "There were darts found in the victim's body."],
				img: "https://imgur.com/v7vk5gF.png",
				imgDead: "https://imgur.com/v7vk5gF.png"
			},
			/*1*/ /*14*/ {
				name: "Kyoung-mi Park",
				clues: ["black", "The murderer left a footprint in size **5 or 6 women's** and size **3 or 4 men's**.", "There were smears of eye shadow found on the victim.", "A microphone with blood on it was found hidden away at the scene."],
				img: "https://imgur.com/8Cdt3c4.png",
				imgDead: "https://imgur.com/fZoA401.png"
			},
			/*1*/ /*15*/ {
				name: "Masayuuki Taisho",
				clues: ["white", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "A cat hair pin was found on the ground of the scene.", "A single, red eye contact was found at the scene."],
				img: "https://imgur.com/slaH7mk.png",
				imgDead: "https://imgur.com/CLYSgcS.png"
			},
			/*1*/ /*+16+*/ {
				name: "Megu Kojima",
				clues: ["black", "The murderer left a footprint in size **5 or 6 women's** and size **3 or 4 men's**.", "Shreds from a dress were found at the scene.", "The scent of a sweet perfume lingers at the scene.", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*17*/ {
				name: "Minako Kaoru",
				clues: ["pink", "The murderer did not leave any footprints.", "A custom-made knife was found at the scene.", "A sheath was slung around the victim's body.", "A bamboo sword was left at the scene."],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*+18+*/ {
				name: "Miyuki Ataru",
				clues: ["black", "The murderer did not leave any footprints.", "A bloody sports ball was found at the scene.", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*19*/ {
				name: "Mori Hibana",
				clues: ["brown", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A pendulum was found at the scene.", "The victim had recently been drugged or poisoned."],
				img: "https://imgur.com/AFaAdCo.png",
				imgDead: "https://imgur.com/8gr4Hgg.png"
			},
			/*1*/ /*+20+*/ {
				name: "Noriko Suzuki",
				clues: ["black", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A pawn was found tucked into the victim's pocket.", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*+21+*/ {
				name: "Ryu Akahoshi",
				clues: ["black", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*22*/ {
				name: "S'ad Ludópata",
				clues: ["brown", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "The victim was crucified.", "A pIona string was found at the scene.", "A heart ring was found at the scene.", "A gold-plated ace was found at the scene.", "A mystery novel titled *The Kidnapped* was found at the scene.", "Coins were found in the victim's mouth."],
				img: "https://imgur.com/GxVIfNW.png",
				imgDead: "https://imgur.com/AZzj22b.png"
			},
			/*1*/ /*23*/ {
				name: "Shiba Mikio",
				clues: ["purple", "The murderer left a footprint in size **10 or 11 women's** and size **8 or 9 men's**.", "A suicide note was found next to the victim.", "Flowers petals were found at the scene.", "A heart-shaped pin was found at the scene.", "A love letter was left in the victim's hands."],
				img: "https://imgur.com/dYJgZl5.png",
				imgDead: "https://imgur.com/p51f8Vu.png"
			},
			/*1*/ /*+24+*/ {
				name: "Stella Hunter",
				clues: ["pink", "The murderer did not leave any footprints.", "", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*+25+*/ {
				name: "Tenshi Kawada",
				clues: ["black", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "", ""],
				img: "https://imgur.com/BzUAKy1.png",
				imgDead: "https://imgur.com/txWQ7vg.png"
			},
			/*1*/ /*+26+*/ {
				name: "Tezuku Imou",
				clues: ["green", "The murderer did not leave any footprints.", "", ""],
				img: "https://imgur.com/vqxvUSV.png",
				imgDead: "https://imgur.com/vqxvUSV.png"
			},
			/*1*/ /*27*/ {
				name: "Théo Dubois",
				clues: ["black", "The murderer did not leave any footprints.", "The tip of an arrow was found at the scene.", "An arrow was found at the scene.", "A feather was found at the scene."],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*+28+*/ {
				name: "Ximena Colomar",
				clues: ["purple", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*1*/ /*29*/ {
				name: "Yukine Sakurai",
				clues: ["brown", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "Rose petals were found around the victim's body.", "A lotus petal was found near the victim.", "Who?", "Flowers petals were found at the scene."],
				img: "https://imgur.com/2RJbb52.png",
				imgDead: "https://imgur.com/RQcTnkM.png"
			},
			/*2*/ /*+30+*/ {
				name: "Akiko",
				clues: ["purple", "The murderer left a footprint in size **5 or 6 women's** and size **3 or 4 men's**.", "", ""],
				img: "https://imgur.com/Cpdhi9T.png",
				imgDead: "https://imgur.com/m5AuVzR.png"
			},
			/*2*/ /*+31+*/ {
				name: "Arisa Shokohou",
				clues: ["brown", "The murderer left a footprint in size **5 or 6 women's** and size **3 or 4 men's**.", "", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*2*/ /*32*/ {
				name: "Ale del Prieto",
				clues: ["brown", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A candy wrapper labeled 'Awake' was found at the scene.", "A silver ring was found at the scene.", "A set of defibrillation pads were found on the victim.", "A magnifying glass was found at the scene.", "A feather was found at the scene."],
				img: "https://imgur.com/Sag0SRp.png",
				imgDead: "https://imgur.com/QL0lrYX.png"
			},
			/*2*/ /*+33+*/ {
				name: "Asahi Fukuzawa",
				clues: ["black", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "A necklace was found on the victim's body.", ""],
				img: "https://imgur.com/GdXygwN.png",
				imgDead: "https://imgur.com/Em8I0vn.png"
			},
			/*2*/ /*34*/ {
				name: "Chika Miyasaki",
				clues: ["strawberry blond", "The murderer left a footprint in size **4 or 5 women's** and size **2 or 3 men's**.", "The murder was executed incredibly extravagantly.", "A custom-made knife was found at the scene.", "Cups of strawberry soda were laid out on a table at the scene."],
				img: "https://imgur.com/iuVJkKq.png",
				imgDead: "https://imgur.com/zZmXZ3L.png"
			},
			/*2*/ /*35*/ {
				name: "Chikako Kaetsu",
				clues: ["blue-green", "The murderer left a footprint in size **9 or 10 women's** and size **7 or 8 men's**.", "A cross was carved into the victim's abdomen.", "A red string with tape on one end was found at the scene.", "There are the scribblings of a madman looking for an answer all over the scene."],
				img: "https://imgur.com/4yEQVlf.png",
				imgDead: "https://imgur.com/FWQz2dg.png"
			},
			/*2*/ /*36*/ {
				name: "Eiichi Ryozo",
				clues: ["black", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "The victim's body is badly mutilated.", "The victim had recently been drugged or poisoned.", "A vial of poison was found at the scene.", "A broken bottle of poison was found at the scene."],
				img: "https://imgur.com/BCdEZNm.png",
				imgDead: "https://imgur.com/yT8Hw90.png"
			},
			/*2*/ /*37*/ {
				name: "Eiji Ryozo",
				clues: ["black", "The murderer left a footprint in size **8 or 9 women's** and size **6 or 7 men's**.", "A pair of scissors were found at the scene.", "The victim was killed with flawless medical precision.", "A saw was found at the scene."],
				img: "https://imgur.com/JTrNk47.png",
				imgDead: "https://imgur.com/yXcQod3.png"
			},
			/*2*/ /*38*/ {
				name: "Fenikku Hinotama",
				clues: ["brown", "The murderer left a footprint in size **9 or 10 women's** and size **7 or 8 men's**.", "An empty bottle of soda was found at the scene.", "A rainbow button was found at the scene.", "A bloody baton was found nearby the victim.", "A scrap of red and blue fabric was found clutched in the victim's hand."],
				img: "https://imgur.com/snh70TO.png",
				imgDead: "https://imgur.com/mrkyS90.png"
			},
			/*2*/ /*39*/ {
				name: "Hana Kageriri",
				clues: ["pink", "The murderer left a footprint in size **8 or 9 women's** and size **6 or 7 men's**.", "A wooden cross was found at the scene.", "The scent of a sweet perfume lingers at the scene.", "The victim was covered in a tangle of strings."],
				img: "https://imgur.com/c210v7y.png",
				imgDead: "https://imgur.com/DXvdBWV.png"
			},
			/*2*/ /*+40+*/ {
				name: "Hideo Takayama",
				clues: ["black", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "Small pieces of machinery were found at the scene.", ""],
				img: "https://imgur.com/9WXv5Q9.png",
				imgDead: "https://imgur.com/Fho6zUC.png"
			},
			/*2*/ /*41*/ {
				name: "Isha Kalki",
				clues: ["red", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A yellow hair clip was found on the ground of the scene.", "A black tennis shoe was left behind at the scene.", "The victim had recently been drugged or poisoned."],
				img: "https://imgur.com/xj1HMXu.png",
				imgDead: "https://imgur.com/W40ausU.png"
			},
			/*2*/ /*42*/ {
				name: "Kagami Hannei",
				clues: ["orange", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A crime insignia was carved into the victim's shoulder blade.", "Shreds from a dress were found at the scene.", "A small, dripping trail of blood leads away from the body.", "A silver ring was found at the scene.", "A small bracelet was found at the scene.", "A gold, hoop earring was found at the scene.", "A necklace was found on the victim's body."],
				img: "https://imgur.com/PZVqARe.png",
				imgDead: "https://imgur.com/Z6itjUB.png"
			},
			/*2*/ /*43*/ {
				name: "Kaipo Uilani Iona",
				clues: ["brown", "The murderer left a footprint in size **8 or 9 women's** and size **6 or 7 men's**.", "The footprints appear to be from flip flops.", "Pellets of animal feed were found near the body.", "A feather was found at the scene."],
				img: "https://imgur.com/WQFawIm.png",
				imgDead: "https://imgur.com/ysWxzwW.png"
			},
			/*2*/ /*+44+*/ {
				name: "Katashi Maeda",
				clues: ["blond", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*2*/ /*45*/ {
				name: "Kouki Yoshida",
				clues: ["red", "The murderer left a footprint in size **10 or 11 women's** and size **8 or 9 men's**.", "There is no evidence of the killer touching the victim.", "A red ribbon was found at the scene.", "A penny, heads up, was found at the scene."],
				img: "https://imgur.com/NIZr23N.png",
				imgDead: "https://imgur.com/jRRhUog.png"
			},
			/*2*/ /*46*/ {
				name: "Kyabetsu Retesu",
				clues: ["green", "The murderer left a footprint in size **9 or 10 women's** and size **7 or 8 men's**.", "Rose petals were found around the victim's body.", "Flowers petals were found at the scene.", "The footprints appear to be from flip flops.", "A lotus petal was found near the victim.", "There is an apologetic note laid within the victim's hands, written in Japanese."],
				img: "https://imgur.com/CgLyIGN.png",
				imgDead: "https://imgur.com/bIJp1Pe.png"
			},
			/*2*/ /*47*/ {
				name: "Michel Voigt",
				clues: ["black", "The murderer left a footprint in size **10 or 11 women's** and size **8 or 9 men's**.", "The victim was crucified.", "A wooden cross was found at the scene."],
				img: noIcon,
				imgDead: noIcon
			},
			/*2*/ /*+48+*/ {
				name: "Monika Minami",
				clues: ["blond", "The murderer left a footprint in size **6 or 7 women's** and size **4 or 5 men's**.", "", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*2*/ /*49*/ {
				name: "Rosendo Paulo Ochoa Merlo",
				clues: ["brown", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A bloody sports ball was found at the scene.", "A necklace was found on the victim's body."],
				img: "https://imgur.com/uwXd769.png",
				imgDead: "https://imgur.com/xaeT5eO.png"
			},
			/*2*/ /*50*/ {
				name: "Saeko Kiyomizu",
				clues: ["black", "The murderer left a footprint in size **6 or 7 women's** and size **4 or 5 men's**.", "The victim was crucified.", "A shattered cup of tea was found at the scene.", "A vial of poison was found at the scene.", "A broken bottle of poison was found at the scene."],
				img: "https://imgur.com/AKg0jAY.png",
				imgDead: "https://imgur.com/tejkibh.png"
			},
			/*2*/ /*51*/ {
				name: "Sora Kenshin",
				clues: ["black", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "A laceration was carved into the victim's arm in the shape of a cityscape."],
				img: "https://imgur.com/wdNGgRH.png",
				imgDead: "https://imgur.com/FIblYyB.png"
			},
			/*2*/ /*+52+*/ {
				name: "Souma Shimizu",
				clues: ["brown", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "A red hair clip was found on the ground of the scene.", "A gun was found at the scene.", "A silver ring was found at the scene.", ""],
				img: "https://imgur.com/9CoACWR.png",
				imgDead: "https://imgur.com/KJm9xdB.png"
			},
			/*2*/ /*53*/ {
				name: "Tomomi Kashichi",
				clues: ["brown", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "Small but valuable possessions were taken off of the body, most likely as a keepsake.", "Small pieces of machinery were found at the scene."],
				img: "https://imgur.com/OVjt8y0.png",
				imgDead: "https://imgur.com/7laDvmv.png"
			},
			/*2*/ /*54*/ {
				name: "Tsuyo Kogiyumi",
				clues: ["white", "The murderer left a footprint in size **5 or 6 women's** and size **3 or 4 men's**.", "A shattered test tube was found at the scene.", "The scent of a sweet perfume lingers at the scene.", "A necklace was found on the victim's body.", "A torn out page from a book was found at the scene."],
				img: "https://imgur.com/jHf6p7i.png",
				imgDead: "https://imgur.com/bo05YOC.png"
			},
			/*2*/ /*+55+*/ {
				name: "Yuna Akahoshi",
				clues: ["white", "The murderer left a footprint in size **6 or 7 women's** and size **4 or 5 men's**.", "", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*2*/ /*+56+*/ {
				name: "Yuuya Michimiya",
				clues: ["strawberry blond", "The murderer left a footprint in size **10 or 11 women's** and size **8 or 9 men's**.", "A few pieces of currency were found in the victim's pocket.", "Coins were found in the victim's mouth.", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*57*/ {
				name: "Aemele Dèjré",
				clues: ["green", "The murderer left a footprint in size **4 or 5 women's** and size **2 or 3 men's**.", "The victim was found in their favorite place.", "The victim was found without their clothing.", "The victim is covered in a mixture of sweat and saliva."],
				img: "https://imgur.com/nxt9OCI.png",
				imgDead: "https://imgur.com/igCOVGX.png"
			},
			/*4*/ /*+58+*/ {
				name: "Agnes María Camila Zalweski-Chavarría",
				clues: ["black", "The murderer left a footprint in size **8 or 9 women's** and size **6 or 7 men's**.", "", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*59*/ {
				name: "Areli Vepkhia",
				clues: ["black and white", "The murderer left a footprint in size **13 or 14 women's** and size **11 or 12 men's**.", "The victim's body is badly mutilated.", "There are scratch marks on the victim's abdomen.", "There is a large bite mark on the victim's arm.", "A snapped, orange headband was found at the scene."],
				img: "https://imgur.com/4IQsA40.png",
				imgDead: "https://imgur.com/yhR9yqN.png"
			},
			/*3*/ /*+60+*/ {
				name: "Ayuma Tanaka",
				clues: ["orange", "The murderer left a footprint in size **12 or 13 women's** and size **9 or 10 men's**.", "A golden ring was found near the victim's body.", "The victim was stabbed with a pocket knife.", "The scent of something burning lingers at the scene."],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*61*/ {
				name: "Cecilio Gonzalo Calles Cárdenas",
				clues: ["brown", "The murderer left a footprint in size **10 or 11 women's** and size **8 or 9 men's**.", "A patch of a country's flag was found in the pocket of the victim.", "A pair of goggles was found at the scene.", "The murder was performed very efficiently."],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*62*/ {
				name: "Daichi Ichihara",
				clues: ["red", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "The victim's body was set in the center of a pentagram.", "A wooden cross was found at the scene."],
				img: "https://imgur.com/qT8oKQu.png",
				imgDead: "https://imgur.com/SGynT97.png"
			},
			/*3*/ /*63*/ {
				name: "Dia Ramos",
				clues: ["purple", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A gold, hoop earring was found at the scene.", "An orange scrunchy was found at the scene.", "There were smears of concealer found on the victim."],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*64*/ {
				name: "Inugami Uzuki",
				clues: ["red", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "The victim's body is badly mutilated.", "A mask was found at the scene.", "There are scratch marks on the victim's abdomen.", "Motor oil was found smeared on a nearby surface at the scene.", "Traces of spray paint was found on the victim's arms and hands.", "A leash was fastened around the victim's neck.", "There is a large bite mark on the victim's arm.", "A patch of a country's flag was found in the pocket of the victim."],
				img: "https://imgur.com/ZHW10pn.png",
				imgDead: "https://imgur.com/Qn5Eycg.png"
			},
			/*3*/ /*65*/ {
				name: "Jomei Hoshino",
				clues: ["blue", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "The scent of something burning lingers at the scene.", "The victim's body is badly mutilated.", "The temperature of the room the victim was found in was incredibly high.", "There were traces of gasoline at the scene.", "The victim's body was completely burned.", "A lighter was found at the scene."],
				img: "https://imgur.com/YywS5LK.png",
				imgDead: "https://imgur.com/SaZa5dH.png"
			},
			/*3*/ /*66*/ {
				name: "Junko Saitou",
				clues: ["black", "The murderer left a footprint in size **6 or 7 women's** and size **4 or 5 men's**.", "A death poem was stuffed into the victim's pocket.", "A scrap of striped fabric was found on the floor of the scene.", "There was a puddle of vomit at the scene."],
				img: "https://imgur.com/TZeW9L7.png",
				imgDead: "https://imgur.com/FNk7e3E.png"
			},
			/*3*/ /*67*/ {
				name: "Kirakira Kyuti",
				clues: ["blond", "The murderer left a footprint in size **5 or 6 in children's**.", "There is no evidence of the killer touching the victim.", "A hair clip was found on the ground of the scene.", "A megaphone was found at the scene."],
				img: "https://imgur.com/zz98AMQ.png",
				imgDead: "https://imgur.com/OJF4cgL.png"
			},
			/*3*/ /*+68+*/ {
				name: "Kumiko Yeun",
				clues: ["black", "The murderer left a footprint in size **6 or 7 women's** and size **4 or 5 men's**.", "A microphone with blood on it was found hidden away at the scene.", ""],
				img: noIcon,
				imgDead: noIcon
			},
			/*4*/ /*69*/ {
				name: "Kyosuke Maki",
				clues: ["brown", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**", "A red hair clip was found on the ground of the scene.", "The scent of a strong cologne lingers at the scene.", "The victim's body is badly mutilated."],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*70*/ {
				name: "Mariko Murakami",
				clues: ["purple", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A scrap of black fabric was found in the victim's palm.", "A red hair pin was found at the scene.", "The victim was crucified.", "A bamboo sword was left at the scene."],
				img: "https://imgur.com/9RRSa6h.png",
				imgDead: "https://imgur.com/cAXqJnH.png"
			},
			/*3*/ /*71*/ {
				name: "Megami Himura",
				clues: ["blue", "The murderer left a footprint in size **6 or 7 women's** and size **4 or 5 men's**.", "Rose petals were found around the victim's body.", "Bobby pins were found at the scene.", "A scrap of striped fabric was found on the floor of the scene."],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*+72+*/ {
				name: "Melchor Guadalupe Paz de la Cruz",
				clues: ["brown", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "A megaphone was found at the scene.", ""],
				img: "https://imgur.com/9cVr7mL.png",
				imgDead: "https://imgur.com/PeLVeBZ.png"
			},
			/*_*/ /*73*/ {
				name: "Miyuki Hayashi",
				clues: ["blue", "The murderer left a footprint in size **6 or 7 women's** and size **4 or 5 men's**.", "The temperature of the room the victim was found in was incredibly high.", "The scent of something burning lingers at the scene.", "The victim's body is badly mutilated.", "A purple hair pin was found on the ground of the scene.", "There were smears of eye shadow found on the victim.", "There were traces of gasoline at the scene."],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*+74+*/ {
				name: "Nikki Cox",
				clues: ["orange", "The murderer left a footprint in size **8 or 9 women's** and size **6 or 7 men's**.", "", ""],
				img: "https://i.imgur.com/llvFlee.png",
				imgDead: "https://imgur.com/pu3hvDH.png"
			},
			/*3*/ /*+75+*/ {
				name: "Renata de Santis",
				clues: ["brown", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "", ""],
				img: "https://imgur.com/Dgij3oX.png",
				imgDead: "https://imgur.com/NSiPSIz.png"
			},
			/*3*/ /*76*/ {
				name: "Ryoushi Nobuori",
				clues: ["red-violet", "The murderer left a footprint in size **8 or 9 women's** and size **6 or 7 men's**.", "A mystery novel titled *The Kidnapped* was found at the scene.", "A torn out page from a book was found at the scene.", "A headband was found at the scene.", "A book full of children's stories was found at the scene."],
				img: "https://imgur.com/r9KKua3.png",
				imgDead: "https://imgur.com/9se7jzq.png"
			},
			/*3*/ /*+77+*/ {
				name: "Santo Verdugo Bautista",
				clues: ["brown", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "The victim was found without their clothing.", "The victim was killed with flawless medical precision.", "An El Diablo chicle cigarillo was stuffed into the victim's mouth.", "A single Hummingbird alebrije earring was found at the scene.", "Photos of bodies were found at the scene.", "A gun was found at the scene."],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*78*/ {
				name: "Shinji Minoru",
				clues: ["brown", "The murderer left a foot print in size **11 or 12 women's** and size **9 or 10 men's**.", "A scribbled note was left behind at the scene.", "A blue pen was left behind at the scene.", "The victim had recently been drugged or poisoned."],
				img: noIcon,
				imgDead: noIcon
			},
			/*3*/ /*79*/ {
				name: "Wolfgang Schwarz",
				clues: ["black", "The murderer left a footprint in size **12 or 13 women's** and size **10 or 11 men's**.", "The scene faintly smells of pine trees.", "The victim was killed with flawless medical precision.", "A saw was found at the scene.", "A patch of a country's flag was found in the pocket of the victim.", ""],
				img: "https://imgur.com/zleZ5xc.png",
				imgDead: "https://imgur.com/pBSO3cM.png"
			},
			/*U*/ /*+80+*/ {
				name: "Kotone Fukuzawa",
				clues: ["black", "The murderer left a footprint in size **7 or 8 women's** and size **5 or 6 men's**.", "The victim's body is badly mutilated.", ""],
				img: "https://imgur.com/OTttz9N.png",
				imgDead: "https://imgur.com/sEoHbXr.png"
			},
			/*3*/ /*+81+*/ {
				name: "Ruslan Eun-Kyung Kraus",
				clues: ["brown", "The murderer left a footprint in size **11 or 12 women's** and size **9 or 10 men's**.", "", ""],
				img: "https://imgur.com/8LA7hg8.png",
				imgDead: "https://imgur.com/ffO9rMi.png"
			},
			/*3*/ /*+82+*/ {
				name: "Isago Achikita",
				clues: ["pink", "The murderer left a footprint in size **6 or 7 women's** and size **4 or 5 men's**.", "Traces of gold leaf were found at the scene.", "A scrap of black fabric was found in the victim's palm."],
				img: "https://imgur.com/YHZZoys.png",
				imgDead: "https://imgur.com/KNHhTlL.png"
			},
			/*3*/ /*+83+*/ {
				name: "Piper McCullough",
				clues: ["green", "The murderer left a footprint in size **5 or 6 women's** and size **3 or 4 men's**.", "An American flag was tucked into the victim's clothing.", ""],
				img: "https://imgur.com/Zxcprq2.png",
				imgDead: "https://imgur.com/yuOgons.png"
			},
			/*3*/ /*+84+*/ {
				name: "Charles Miller",
				clues: ["blond", "The murderer left a footprint in size **10 or 11 women's** and size **8 or 9 men's**.", "An American flag was tucked into the victim's clothing.", "A carton of milk was found under the victim's body."],
				img: "https://imgur.com/gbrgAJL.png",
				imgDead: "https://imgur.com/YKzsYOU.png"
			},
			/*3*/ /*+85+*/ {
				name: "Tenome",
				clues: ["gray", "The murderer did not leave any footprints.", "", ""],
				img: "https://imgur.com/7Pr58FI.png",
				imgDead: "https://imgur.com/TM8FYjl.png"
			},
			/*X*/ /*86*/ {
				name: "SECRET TIME BABY!"
			},
			/*87*/ {
				name: "SECRET TIME BABY!"
			},
			/*88*/ {
				name: "SECRET TIME BABY!"
			},
			/*89*/ {
				name: "SECRET TIME BABY!"
			},
			/*90*/ {
				name: "SUICIDE"
			},
			/*91*/ {
				name: "SUICIDE"
			},
			/*92*/ {
				name: "SUICIDE"
			},
			/*93*/ {
				name: "SUICIDE"
			},
			/*94*/ {
				name: "SUICIDE"
			},
			/*95*/ {
				name: "SUICIDE"
			},
			/*96*/ {
				name: "SUICIDE"
			},
			/*97*/ {
				name: "SUICIDE"
			},
			/*98*/ {
				name: "SUICIDE"
			},
			/*99*/ {
				name: "DOUBLE MURDER!!"
			},
			/*100*/ {
				name: "DOUBLE MURDER!!"
			},
			/*101*/ {
				name: "DOUBLE MURDER!!"
			},
			/*102*/ {
				name: "DOUBLE MURDER!!"
			},
			/*103*/ {
				name: "DOUBLE MURDER!!"
			},
			/*104*/ {
				name: "DOUBLE MURDER!!"
			},
			/*105*/ {
				name: "DOUBLE MURDER!!"
			},
			/*106*/ {
				name: "DOUBLE MURDER!!"
			},
			/*107*/ {
				name: "DOUBLE MURDER!!"
			},
			/*108*/ {
				name: "DOUBLE MURDER!!"
			},
			/*109*/ {
				name: "DOUBLE MURDER!!"
			},
			/*110*/ {
				name: "DOUBLE MURDER!!"
			},
		];

		murderer = random(students);

		/*Murders*/
		if (murderer.name != "SECRET TIME BABY!" && murderer.name != "SUICIDE" && murderer.name != "DOUBLE MURDER!!") {
			murdererEvidence = murderer.clues;
			murdererHair = murdererEvidence.shift();
			shoeClue = murdererEvidence.shift();
			evidenceClue = random(murdererEvidence);
			if (evidenceClue === "") { //THIS IS TEMP UNTIL ALL STUDENTS HAVE THEIR APPROPRIATE EVIDENCE.
				evidenceClue = random(murdererEvidence);
				if (evidenceClue === "") {
					evidenceClue = `I'm super sorry, but you've recieved a blank clue!  This will be fixed soon enough, so for now hang in there, tiger!`;
				}
			}

			falseAnswer1 = random(students);
			falseAnswer2 = random(students);
			falseAnswer3 = random(students);
			falseAnswer4 = random(students);
			falseAnswer5 = random(students);

			generateOverlapClues(murderer, evidenceClue);

			victim = random(students);
			while (murderer === victim || victim.name === "SECRET TIME BABY!" || victim.name === "SUICIDE" || victim.name === "DOUBLE MURDER!!") {
				victim = random(students);
			}

			while (falseAnswer1.name === "SECRET TIME BABY!" || falseAnswer1.name === "DOUBLE MURDER!!" || falseAnswer1.name === "SUICIDE" || falseAnswer1 === murderer || falseAnswer1 === victim) {
				falseAnswer1 = random(students);
			}
			while (falseAnswer2.name === "SECRET TIME BABY!" || falseAnswer2.name === "DOUBLE MURDER!!" || falseAnswer2.name === "SUICIDE" || falseAnswer2 === falseAnswer1 || falseAnswer2 === murderer || falseAnswer2 === victim) {
				falseAnswer2 = random(students);
			}
			while (falseAnswer3.name === "SECRET TIME BABY!" || falseAnswer3.name === "DOUBLE MURDER!!" || falseAnswer3.name === "SUICIDE" || falseAnswer3 === falseAnswer1 || falseAnswer3 === falseAnswer2 || falseAnswer3 === murderer || falseAnswer3 === victim) {
				falseAnswer3 = random(students);
			}
			while (falseAnswer4.name === "SECRET TIME BABY!" || falseAnswer4.name === "DOUBLE MURDER!!" || falseAnswer4.name === "SUICIDE" || falseAnswer4 === falseAnswer1 || falseAnswer4 === falseAnswer2 || falseAnswer4 === falseAnswer3 || falseAnswer4 === murderer || falseAnswer4 === victim) {
				falseAnswer4 = random(students);
			}
			while (falseAnswer5.name === "SECRET TIME BABY!" || falseAnswer5.name === "DOUBLE MURDER!!" || falseAnswer5.name === "SUICIDE" || falseAnswer5 === falseAnswer1 || falseAnswer5 === falseAnswer2 || falseAnswer5 === falseAnswer3 || falseAnswer5 === falseAnswer4 || falseAnswer5 === murderer || falseAnswer5 === victim) {
				falseAnswer5 = random(students);
			}

			generateHairClue(murdererHair, falseAnswer1.clues[0], falseAnswer2.clues[0], falseAnswer3.clues[0], falseAnswer4.clues[0], falseAnswer5.clues[0]);

			clues = `1. ${hairClue}\n2. ${shoeClue}\n3. ${evidenceClue}`;

			answers = shuffle([murderer, falseAnswer1, falseAnswer2, falseAnswer3, falseAnswer4, falseAnswer5]);
			if (murderer === answers[0]) {
				correctAnswer = "🇦";
			}
			if (murderer === answers[1]) {
				correctAnswer = "🇧";
			}
			if (murderer === answers[2]) {
				correctAnswer = "🇨";
			}
			if (murderer === answers[3]) {
				correctAnswer = "🇩";
			}
			if (murderer === answers[4]) {
				correctAnswer = "🇪";
			}
			if (murderer === answers[5]) {
				correctAnswer = "🇫";
			}

			generateMurderScenario();

			/*Specific Murders*/
			if (murderer.name === "Jeong Park" && victim.name === "Kyoung-mi Park") {
				murderScene = "Jeong killed Kyoung-mi.";
			}
			if (murderer.name === "Aiko Hikaru" && victim.name === "Jeong Park") {
				murderScene = "Aiko killed Jeong.";
			}
			if (murderer.name === "Tezuku Imou" && victim.name === "Stella Hunter") {
				murderScene = "Tezuku killed Stella.";
			}
			if (murderer.name === "S'ad Ludópata" && victim.name === "Aurélie Cartier") {
				murderScene = "S'ad killed Aurélie.";
			}
			if (murderer.name === "Tenshi Kawada" && victim.name === "Noriko Suzuki") {
				murderScene = "The victim was found laying on a couch in the library.  Her eyes are closed and her face is covered in reddish purple spots.";
			}
			if (murderer.name === "Ara Ayao" && victim.name === "Megu Kojima") {
				murderScene = "The victim was found sprawled out on the bathroom floor with a clean knife nearby. Her eyes have been gouged out and she's covered in cuts and bruises.";
			}
			if (murderer.name === "Hachi Hiruma" && victim.name === "Aika Mahaya") {
				murderScene = "The victim was found lying in a bush in the greenhouse, a bottle of poison next to her in pieces and a knife in a nearby bush.  Her body is completely dry, no moisture whatsoever, and there is no evidence that she was involved in a struggle."
			}
			if (murderer.name === "Hoshi Chiura" && victim.name === "Anya Sakaguchi") {
				murderScene = "Hoshi killed Ayna.";
			}
			if (murderer.name === "Kiro Karasu" && victim.name === "Ximena Colomar") {
				murderScene = "Kiro killed Ximena.";
			}
			if (murderer.name === "Cheisu Maeda" && victim.name === "Masayuuki Taisho") {
				murderScene = "Cheisu killed(?) Masayuuki.";
			}
			if (murderer.name === "Tomomi Kashichi" && victim.name === "Rosendo Paulo Ochoa Merlo") {
				murderScene = "Tomomi killed Renzo.";
			}
			if (murderer.name === "Saeko Kiyomizu" && victim.name === "Katashi Maeda") {
				murderScene = "Saeko killed Katashi.";
			}
			if (murderer.name === "Eiji Ryozo" && victim.name === "Kaipo Uilani Iona") {
				murderScene = "The victim was found on the roof of Kamukura Hotel, with their arms spread out from their sides. His abdomen has been cut open down the middle and his organs have been removed. A splattered trail of blood leads from the body to the roof's exhaust fan, and there are two sets of bloody aprons and gloves near the body. A duffel bag containing a glass bottle, rib shear, and handsaw is also present.";
			}
			if (murderer.name === "Hana Kageriri" && victim.name === "Michel Voigt") {
				murderScene = "Hana killed Michel.";
			}
			if (murderer.name === "Ale del Prieto" && victim.name === "Kagami Hannei") {
				murderScene = "Ale killed Kagami.";
			}
			if (murderer.name === "Sora Kenshin" && victim.name === "Chika Miyasaki") {
				murderScene = "The Silencer killed Chika.";
			}
			if (murderer.name === "Isha Kalki" && victim.name === "Kyabetsu Retesu") {
				murderScene = "Isha assisted Kyabetsu in killing himself.";
			}

			message.channel.send({
				embed: {
					color: 13959168,
					title: `Monomi's Murder Mystery: ${victim.name} was found dead!`,
					"thumbnail": {
						"url": `${victim.imgDead}`
					},
					description: `${murderScene}\n\n**__Clues:__**\n${clues}\n\n**__Who dunnit?__**\nA) ${answers[0].name}\nB) ${answers[1].name}\nC) ${answers[2].name}\nD) ${answers[3].name}\nE) ${answers[4].name}\nF) ${answers[5].name}`
				}
			}).then(msg => {
				msg.react("🇦")
					.then(() => MM_InProgress = true)
					.then(() => msg.react("🇧"))
					.then(() => MM_InProgress = true)
					.then(() => msg.react("🇨"))
					.then(() => MM_InProgress = true)
					.then(() => msg.react("🇩"))
					.then(() => MM_InProgress = true)
					.then(() => msg.react("🇪"))
					.then(() => MM_InProgress = true)
					.then(() => msg.react("🇫"))
					.then(() => MM_InProgress = true)
					.then(() => msg.awaitReactions(filter, {
						max: 1,
						time: 120000,
						errors: ['time']
					}))
					.then(collected => {
						MM_InProgress = false;
						if (correctness === 1) {
							inboxChannel.send({
								embed: {
									color: 15285149,
									title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
									"thumbnail": {
										"url": "https://imgur.com/OokvPxl.png"
									},
									description: `${message.author.username} successfully identified the murderer.`,
									fields: [{
											"name": "Murderer:",
											"value": `${murderer.name}`
										},
										{
											"name": "Victim:",
											"value": `${victim.name}`
										},
										{
											"name": "Incorrect Answers:",
											"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}\n${falseAnswer5.name}`
										}
									]
								}
							})
							return message.channel.send({
								embed: {
									color: 164352,
									title: `Correct!`,
									"thumbnail": {
										"url": murderer.img
									},
									description: `The murderer was ${murderer.name}!`
								}
							})
						};
						if (correctness === 2) {
							inboxChannel.send({
								embed: {
									color: 15285149,
									title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
									"thumbnail": {
										"url": "https://imgur.com/eTreUA6.png"
									},
									description: `${message.author.username} didn't identify the murderer.`,
									fields: [{
											"name": "Murderer:",
											"value": `${murderer.name}`
										},
										{
											"name": "Victim:",
											"value": `${victim.name}`
										},
										{
											"name": "Incorrect Answers:",
											"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}\n${falseAnswer5.name}`
										}
									]
								}
							})
							return message.channel.send({
								embed: {
									color: 13959168,
									title: `Wrong!`,
									"thumbnail": {
										"url": murderer.img
									},
									description: `The murderer was ${murderer.name}!`
								}
							})
						};
					}).catch(() => {
						MM_InProgress = false;
						inboxChannel.send({
							embed: {
								color: 15285149,
								title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
								"thumbnail": {
									"url": "https://imgur.com/eTreUA6.png"
								},
								description: `${message.author.username} ran out of time before identifying the murderer.`,
								fields: [{
										"name": "Murderer:",
										"value": `${murderer.name}`
									},
									{
										"name": "Victim:",
										"value": `${victim.name}`
									},
									{
										"name": "Incorrect Answers:",
										"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}\n${falseAnswer5.name}`
									}
								]
							}
						});
						return message.channel.send({
							embed: {
								color: 13959168,
								title: `You ran out of time!`,
								"thumbnail": {
									"url": murderer.img
								},
								description: `The murderer was ${murderer.name}!`
							}
						})
					})
			})
		}
		/*Secrets*/
		if (murderer.name === "SECRET TIME BABY!") {
			secretMurderers = [
				/*0+*/
				{
					name: "Kaiya Sasaki",
					desc: "Kaiya Sasaki, the *original* botanist.",
					img: noIcon
				},
				/*1+*/
				{
					name: "Eito Ryozo",
					desc: "Iͯͧͤ̀̽͑̃ͫ̎͐͌͋ͬ͆̃̚͜҉̶̡̟̦͉̣̠̱̺̫̟̪̦̦̘̞͟'̧̺̠̝̳͉̪͔̗ͥ̑̈́ͫ̌̇̈́mͧͫ̉̓̚҉̴̨̻̳̲̭̮̩̟̼͙̞̦̮̺ ̷̨̼̘̩͇͉̙͙͙̰̜̲͙̣̯͛̍ͦͧͩ͊̃ͬ̿͞h̵͇̦̦̺̻̻͇ͥ̃́̂͐̏̕e̴ͬ̾̇̄͐̎ͮͨͥ̈ͯ̄̽ͣͯ҉̮̥̠̠̣̹̻͕̳͇͍r͓̙͎̼̠̝͔͍̭̪̯̜͚̖̹̝͛̋̾̐̓ͯͧͤ͛͂͒͘͘͟͞é̴̡͎̘͍͈̟͈͈͎̘̍͒ͩͫ̐ͤ̂͒̆̑̏͋̿͒̿̾.̵̈ͨ̈́͗͏̼̪̮͖̘̦̭̩̭͉̘͍͟͡",
					img: "https://imgur.com/M4cALh8.png"
				},
				/*2+*/
				{
					name: "Luca Schwarz",
					desc: "He was lost to time.",
					img: "https://imgur.com/mz4UEx1.png"
				},
				/*{name:"Monobi",clues:["","",""],img:"https://imgur.com/CiGJlAd.png",imgDead:"https://imgur.com/WPWHetx.png"},
				{name:"Monomi",clues:["","",""],img:"https://imgur.com/OokvPxl.png",imgDead:"https://imgur.com/eTreUA6.png"},
				{name:"Monokuma",clues:["","",""],img:"https://imgur.com/TBfkvBA.png",imgDead:"https://imgur.com/o3o1RNN.png"}*/
			];

			secretScenario = random(secretMurderers);

			while (secretScenario.name === "SECRET TIME BABY!" || secretScenario.name === "SUICIDE" || secretScenario.name === "DOUBLE MURDER!!") {
				secretScenario = random(students);
			}

			MM_InProgress = false;
			return message.channel.send({
				embed: {
					color: 13959168,
					title: `Monomi's Murder Mystery: A Secret!`,
					"thumbnail": {
						"url": `${secretScenario.img}`
					},
					description: `${secretScenario.desc}`
				}
			})
		}
		/*Suicides*/
		if (murderer.name === "SUICIDE") {

			murderer = random(students);
			victim = random(students);
			while (victim.name === "SECRET TIME BABY!" || victim.name === "SUICIDE" || victim.name === "DOUBLE MURDER!!") {
				victim = random(students);
			}

			MM_InProgress = false;
			return message.channel.send({
				embed: {
					color: 13959168,
					title: `Monomi's Murder Mystery: ${victim.name} was found dead!`,
					"thumbnail": {
						"url": `${victim.imgDead}`
					},
					description: `Wowwee!  This isn't a secret, but it's certainly an incomplete feature!  Cases of suicide will be coming as soon as Dee can figure out a way to implement the idea!`
				}
			})
		}
		/*Double Murders*/
		if (murderer.name === "DOUBLE MURDER!!") {
			doubleMurderRandomize = [
				"two murderers",
				"two murderers",
				"two murderers",
				"two murderers",
				"two murderers",
				"two murderers",
				"one murderer",
				"one murderer",
				"one murderer",
				"one murderer",
				"one murderer",
				"one murderer",
				"murder-suicide",
				"murder-suicide",
			]
			murderType = random(doubleMurderRandomize);

			if (murderType === "two murderers") {
				murderer1 = random(students);
				while (murderer1.name === "SECRET TIME BABY!" || murderer1.name === "SUICIDE" || murderer1.name === "DOUBLE MURDER!!") {
					murderer1 = random(students);
				}
				murdererEvidence = murderer1.clues;
				murdererHairBackup = {
					clues: [murderer1.clues[0]]
				};
				murdererHair = murdererEvidence.shift();
				shoeClue = murdererEvidence.shift();
				evidenceClue = random(murdererEvidence);
				if (evidenceClue === "") { //THIS IS TEMP UNTIL ALL STUDENTS HAVE THEIR APPROPRIATE EVIDENCE.
					evidenceClue = random(murdererEvidence);
					if (evidenceClue === "") {
						evidenceClue = `I'm super sorry, but you've recieved a blank clue!  This will be fixed soon enough, so for now hang in there, tiger!`;
					}
				}

				murderer2 = random(students);
				victim1 = random(students);
				victim2 = random(students);

				while (murderer1 === murderer2 || murderer2.name === "SECRET TIME BABY!" || murderer2.name === "SUICIDE" || murderer2.name === "DOUBLE MURDER!!") {
					murderer2 = random(students);
				}
				while (murderer1 === victim1 || murderer2 === victim1 || victim1.name === "SECRET TIME BABY!" || victim1.name === "SUICIDE" || victim1.name === "DOUBLE MURDER!!") {
					victim1 = random(students);
				}
				while (murderer1 === victim2 || murderer2 === victim2 || victim1 === victim2 || victim2.name === "SECRET TIME BABY!" || victim2.name === "SUICIDE" || victim2.name === "DOUBLE MURDER!!") {
					victim2 = random(students);
				}

				falseAnswer1 = random(students);
				falseAnswer2 = random(students);
				falseAnswer3 = random(students);
				falseAnswer4 = random(students);

				generateOverlapClues(murderer1, evidenceClue);

				while (falseAnswer1.name === "SECRET TIME BABY!" || falseAnswer1.name === "DOUBLE MURDER!!" || falseAnswer1 === murderer1 || falseAnswer1 === murderer2 || falseAnswer1 === victim1 || falseAnswer1 === victim2) {
					falseAnswer1 = random(students);
				}
				while (falseAnswer2.name === "SECRET TIME BABY!" || falseAnswer2.name === "DOUBLE MURDER!!" || falseAnswer2.name === "SUICIDE" || falseAnswer2 === falseAnswer1 || falseAnswer2 === murderer1 || falseAnswer2 === murderer2 || falseAnswer2 === victim1 || falseAnswer2 === victim2) {
					falseAnswer2 = random(students);
				}
				while (falseAnswer3.name === "SECRET TIME BABY!" || falseAnswer3.name === "DOUBLE MURDER!!" || falseAnswer3.name === "SUICIDE" || falseAnswer3 === falseAnswer1 || falseAnswer3 === falseAnswer2 || falseAnswer3 === murderer1 || falseAnswer3 === murderer2 || falseAnswer3 === victim1 || falseAnswer3 === victim2) {
					falseAnswer3 = random(students);
				}
				while (falseAnswer4.name === "SECRET TIME BABY!" || falseAnswer4.name === "DOUBLE MURDER!!" || falseAnswer4.name === "SUICIDE" || falseAnswer4 === falseAnswer1 || falseAnswer4 === falseAnswer2 || falseAnswer4 === falseAnswer3 || falseAnswer4 === murderer1 || falseAnswer4 === murderer2 || falseAnswer4 === victim1 || falseAnswer4 === victim2) {
					falseAnswer4 = random(students);
				}

				generateHairClue(murdererHair, murderer2.clues[0], falseAnswer1.clues[0], falseAnswer2.clues[0], falseAnswer3.clues[0], falseAnswer4.clues[0]);

				clues = `1. ${hairClue}\n2. ${shoeClue}\n3. ${evidenceClue}`;

				answers = shuffle([murderer1, murderer2, falseAnswer1, falseAnswer2, falseAnswer3, falseAnswer4]);
				if (murderer1 === answers[0]) {
					correctAnswer = "🇦";
				}
				if (murderer1 === answers[1]) {
					correctAnswer = "🇧";
				}
				if (murderer1 === answers[2]) {
					correctAnswer = "🇨";
				}
				if (murderer1 === answers[3]) {
					correctAnswer = "🇩";
				}
				if (murderer1 === answers[4]) {
					correctAnswer = "🇪";
				}
				if (murderer1 === answers[5]) {
					correctAnswer = "🇫";
				}

				generateMurderScenario();

				/*Specific Murders Go Here*/

				message.channel.send({
					embed: {
						color: 13959168,
						title: `Monomi's Murder Mystery: ${victim1.name} was found dead!`,
						"thumbnail": {
							"url": `${victim1.imgDead}`
						},
						description: `${murderScene}\n\n**__Clues:__**\n${clues}\n\n**__Who dunnit?__**\nA) ${answers[0].name}\nB) ${answers[1].name}\nC) ${answers[2].name}\nD) ${answers[3].name}\nE) ${answers[4].name}\nF) ${answers[5].name}`
					}
				}).then(msg => {
					msg.react("🇦")
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇧"))
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇨"))
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇩"))
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇪"))
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇫"))
						.then(() => MM_InProgress = true)
						.then(() => msg.awaitReactions(filter, {
							max: 1,
							time: 120000,
							errors: ['time']
						}))
						.then(collected => {
							if (correctness === 1) {
								message.channel.send({
									embed: {
										color: 164352,
										title: `Correct!`,
										"thumbnail": {
											"url": murderer1.img
										},
										description: `The murderer was ${murderer1.name}!\n\nHowever, it appears that this was a double murder!`
									}
								})

								murdererEvidence = murderer2.clues;
								murdererHair = murdererEvidence.shift();
								shoeClue = murdererEvidence.shift();
								evidenceClue = random(murdererEvidence);
								if (evidenceClue === "") { //THIS IS TEMP UNTIL ALL STUDENTS HAVE THEIR APPROPRIATE EVIDENCE.
									evidenceClue = random(murdererEvidence);
									if (evidenceClue === "") {
										evidenceClue = `I'm super sorry, but you've recieved a blank clue!  This will be fixed soon enough, so for now hang in there, tiger!`;
									}
								}

								generateHairClue(murdererHair, murdererHairBackup, falseAnswer1.clues[0], falseAnswer2.clues[0], falseAnswer3.clues[0], falseAnswer4.clues[0]);

								clues = `1. ${hairClue}\n2. ${shoeClue}\n3. ${evidenceClue}`;

								answers = shuffle([murderer2, falseAnswer1, falseAnswer2, falseAnswer3, falseAnswer4]);
								if (murderer2 === answers[0]) {
									correctAnswer = "🇦";
								}
								if (murderer2 === answers[1]) {
									correctAnswer = "🇧";
								}
								if (murderer2 === answers[2]) {
									correctAnswer = "🇨";
								}
								if (murderer2 === answers[3]) {
									correctAnswer = "🇩";
								}
								if (murderer2 === answers[4]) {
									correctAnswer = "🇪";
								}

								generateMurderScenario();

								setTimeout(function () {
									message.channel.send({
										embed: {
											color: 13959168,
											title: `Monomi's Murder Mystery: ${victim2.name} was found dead!`,
											"thumbnail": {
												"url": `${victim2.imgDead}`
											},
											description: `${murderScene}\n\n**__Clues:__**\n${clues}\n\n**__Who dunnit?__**\nA) ${answers[0].name}\nB) ${answers[1].name}\nC) ${answers[2].name}\nD) ${answers[3].name}\nE) ${answers[4].name}\nF) Same Murderer`
										}
									}).then(msg => {
										msg.react("🇦")
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇧"))
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇨"))
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇩"))
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇪"))
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇫"))
											.then(() => MM_InProgress = true)
											.then(() => msg.awaitReactions(filter, {
												max: 1,
												time: 120000,
												erros: ['time']
											}))
											.then(collected => {
												MM_InProgress = false;
												if (correctness === 1) {
													inboxChannel.send({
														embed: {
															color: 15285149,
															title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
															"thumbnail": {
																"url": "https://imgur.com/OokvPxl.png"
															},
															description: `${message.author.username} successfully identified the murderers.`,
															fields: [{
																	"name": "Murderers:",
																	"value": `${murderer1.name} and ${murderer2.name}`
																},
																{
																	"name": "Victims:",
																	"value": `${victim1.name} and ${victim2.name}`
																},
																{
																	"name": "Incorrect Answers:",
																	"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}`
																}
															]
														}
													})
													return message.channel.send({
														embed: {
															color: 164352,
															title: `Correct!`,
															"thumbnail": {
																"url": murderer2.img
															},
															description: `The murderer was ${murderer2.name}!`
														}
													})
												};
												if (correctness === 2) {
													inboxChannel.send({
														embed: {
															color: 15285149,
															title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
															"thumbnail": {
																"url": "https://imgur.com/eTreUA6.png"
															},
															description: `${message.author.username} didn't identify the second murderer.`,
															fields: [{
																	"name": "Murderers:",
																	"value": `${murderer1.name} and ${murderer2.name}`
																},
																{
																	"name": "Victims:",
																	"value": `${victim1.name} and ${victim2.name}`
																},
																{
																	"name": "Incorrect Answers:",
																	"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}`
																}
															]
														}
													})
													return message.channel.send({
														embed: {
															color: 13959168,
															title: `Wrong!`,
															"thumbnail": {
																"url": murderer2.img
															},
															description: `The murderer was ${murderer2.name}!`
														}
													})
												};
											}).catch(() => {
												MM_InProgress = false;
												inboxChannel.send({
													embed: {
														color: 15285149,
														title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
														"thumbnail": {
															"url": "https://imgur.com/eTreUA6.png"
														},
														description: `${message.author.username} ran out of time before identifying the second murderer.`,
														fields: [{
																"name": "Murderers:",
																"value": `${murderer1.name} and ${murderer2.name}`
															},
															{
																"name": "Victims:",
																"value": `${victim1.name} and ${victim2.name}`
															},
															{
																"name": "Incorrect Answers:",
																"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}`
															}
														]
													}
												})
												return message.channel.send({
													embed: {
														color: 13959168,
														title: `You ran out of time!`,
														"thumbnail": {
															"url": murderer2.img
														},
														description: `The murderer was ${murderer2.name}!`
													}
												})
											})
									})
								}, 2000)
							};
							if (correctness === 2) {
								MM_InProgress = false;
								inboxChannel.send({
									embed: {
										color: 15285149,
										title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
										"thumbnail": {
											"url": "https://imgur.com/eTreUA6.png"
										},
										description: `${message.author.username} didn't identify the first murderer.`,
										fields: [{
												"name": "Murderers:",
												"value": `${murderer1.name} and ${murderer2.name}`
											},
											{
												"name": "Victims:",
												"value": `${victim1.name} and ${victim2.name}`
											},
											{
												"name": "Incorrect Answers:",
												"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}`
											}
										]
									}
								})
								return message.channel.send({
									embed: {
										color: 13959168,
										title: `Wrong!`,
										"thumbnail": {
											"url": murderer1.img
										},
										description: `The murderer was ${murderer1.name}!`
									}
								})
							}
						}).catch(() => {
							MM_InProgress = false;
							inboxChannel.send({
								embed: {
									color: 15285149,
									title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
									"thumbnail": {
										"url": "https://imgur.com/eTreUA6.png"
									},
									description: `${message.author.username} ran out of time before identifying the first murderer.`,
									fields: [{
											"name": "Murderers:",
											"value": `${murderer1.name} and ${murderer2.name}`
										},
										{
											"name": "Victims:",
											"value": `${victim1.name} and ${victim2.name}`
										},
										{
											"name": "Incorrect Answers:",
											"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}`
										}
									]
								}
							})
							return message.channel.send({
								embed: {
									color: 13959168,
									title: `You ran out of time!`,
									"thumbnail": {
										"url": murderer1.img
									},
									description: `The murderer was ${murderer1.name}!`
								}
							})
						})
				})
			}
			if (murderType === "one murderer") {
				murderer = random(students);
				while (murderer.name === "SECRET TIME BABY!" || murderer.name === "SUICIDE" || murderer.name === "DOUBLE MURDER!!") {
					murderer = random(students);
				}
				murdererEvidence = murderer.clues;
				murdererHair = murdererEvidence.shift();
				shoeClue = murdererEvidence.shift();
				murdererEvidence = shuffle(murdererEvidence);
				evidenceClue = murdererEvidence.shift();
				if (evidenceClue === "") { //THIS IS TEMP UNTIL ALL STUDENTS HAVE THEIR APPROPRIATE EVIDENCE.
					evidenceClue = random(murdererEvidence);
					if (evidenceClue === "") {
						evidenceClue = `I'm super sorry, but you've recieved a blank clue!  This will be fixed soon enough, so for now hang in there, tiger!`;
					}
				}

				victim1 = random(students);
				victim2 = random(students);

				while (murderer === victim1 || victim1.name === "SECRET TIME BABY!" || victim1.name === "SUICIDE" || victim1.name === "DOUBLE MURDER!!") {
					victim1 = random(students);
				}
				while (murderer === victim2 || victim1 === victim2 || victim2.name === "SECRET TIME BABY!" || victim2.name === "SUICIDE" || victim2.name === "DOUBLE MURDER!!") {
					victim2 = random(students);
				}

				falseAnswer1 = random(students);
				falseAnswer2 = random(students);
				falseAnswer3 = random(students);
				falseAnswer4 = random(students);
				falseAnswer5 = random(students);

				generateOverlapClues(murderer, evidenceClue);

				while (falseAnswer1.name === "SECRET TIME BABY!" || falseAnswer1.name === "DOUBLE MURDER!!" || falseAnswer1.name === "SUICIDE" || falseAnswer1 === murderer || falseAnswer1 === victim1 || falseAnswer1 === victim2) {
					falseAnswer1 = random(students);
				}
				while (falseAnswer2.name === "SECRET TIME BABY!" || falseAnswer2.name === "DOUBLE MURDER!!" || falseAnswer2.name === "SUICIDE" || falseAnswer2 === falseAnswer1 || falseAnswer2 === murderer || falseAnswer2 === victim1 || falseAnswer2 === victim2) {
					falseAnswer2 = random(students);
				}
				while (falseAnswer3.name === "SECRET TIME BABY!" || falseAnswer3.name === "DOUBLE MURDER!!" || falseAnswer3.name === "SUICIDE" || falseAnswer3 === falseAnswer1 || falseAnswer3 === falseAnswer2 || falseAnswer3 === murderer || falseAnswer3 === victim1 || falseAnswer3 === victim2) {
					falseAnswer3 = random(students);
				}
				while (falseAnswer4.name === "SECRET TIME BABY!" || falseAnswer4.name === "DOUBLE MURDER!!" || falseAnswer4.name === "SUICIDE" || falseAnswer4 === falseAnswer1 || falseAnswer4 === falseAnswer2 || falseAnswer4 === falseAnswer3 || falseAnswer4 === murderer || falseAnswer4 === victim1 || falseAnswer4 === victim2) {
					falseAnswer4 = random(students);
				}
				while (falseAnswer5.name === "SECRET TIME BABY!" || falseAnswer5.name === "DOUBLE MURDER!!" || falseAnswer5.name === "SUICIDE" || falseAnswer5 === falseAnswer1 || falseAnswer5 === falseAnswer2 || falseAnswer5 === falseAnswer3 || falseAnswer5 === falseAnswer4 || falseAnswer5 === murderer || falseAnswer5 === victim1 || falseAnswer5 === victim2) {
					falseAnswer5 = random(students);
				}

				generateHairClue(murdererHair, falseAnswer1.clues[0], falseAnswer2.clues[0], falseAnswer3.clues[0], falseAnswer4.clues[0], falseAnswer5.clues[0]);

				clues = `1. ${hairClue}\n2. ${shoeClue}\n3. ${evidenceClue}`;

				answers = shuffle([murderer, falseAnswer1, falseAnswer2, falseAnswer3, falseAnswer4, falseAnswer5]);
				if (murderer === answers[0]) {
					correctAnswer = "🇦";
				}
				if (murderer === answers[1]) {
					correctAnswer = "🇧";
				}
				if (murderer === answers[2]) {
					correctAnswer = "🇨";
				}
				if (murderer === answers[3]) {
					correctAnswer = "🇩";
				}
				if (murderer === answers[4]) {
					correctAnswer = "🇪";
				}
				if (murderer === answers[5]) {
					correctAnswer = "🇫";
				}

				generateMurderScenario();

				/*Specific Murders Go Here*/

				message.channel.send({
					embed: {
						color: 13959168,
						title: `Monomi's Murder Mystery: ${victim1.name} was found dead!`,
						"thumbnail": {
							"url": `${victim1.imgDead}`
						},
						description: `${murderScene}\n\n**__Clues:__**\n${clues}\n\n**__Who dunnit?__**\nA) ${answers[0].name}\nB) ${answers[1].name}\nC) ${answers[2].name}\nD) ${answers[3].name}\nE) ${answers[4].name}\nF) ${answers[5].name}`
					}
				}).then(msg => {
					msg.react("🇦")
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇧"))
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇨"))
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇩"))
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇪"))
						.then(() => MM_InProgress = true)
						.then(() => msg.react("🇫"))
						.then(() => MM_InProgress = true)
						.then(() => msg.awaitReactions(filter, {
							max: 1,
							time: 120000,
							errors: ['time']
						}))
						.then(collected => {
							if (correctness === 1) {
								message.channel.send({
									embed: {
										color: 164352,
										title: `Correct!`,
										"thumbnail": {
											"url": murderer.img
										},
										description: `The murderer was ${murderer.name}!\n\nHowever, it appears that this was a double murder!`
									}
								})

								evidenceClue = random(murdererEvidence);
								if (evidenceClue === "") { //THIS IS TEMP UNTIL ALL STUDENTS HAVE THEIR APPROPRIATE EVIDENCE.
									evidenceClue = random(murdererEvidence);
									if (evidenceClue === "") {
										evidenceClue = `I'm super sorry, but you've recieved a blank clue!  This will be fixed soon enough, so for now hang in there, tiger!`;
									}
								}

								generateHairClue(murdererHair, falseAnswer1.clues[0], falseAnswer2.clues[0], falseAnswer3.clues[0], falseAnswer4.clues[0], falseAnswer5.clues[0]);

								clues = `1. ${hairClue}\n2. ${shoeClue}\n3. ${evidenceClue}`;

								answers = shuffle([falseAnswer1, falseAnswer2, falseAnswer3, falseAnswer4, falseAnswer5]);
								correctAnswer = "🇫";

								generateMurderScenario();

								setTimeout(function () {
									message.channel.send({
										embed: {
											color: 13959168,
											title: `Monomi's Murder Mystery: ${victim2.name} was found dead!`,
											"thumbnail": {
												"url": `${victim2.imgDead}`
											},
											description: `${murderScene}\n\n**__Clues:__**\n${clues}\n\n**__Who dunnit?__**\nA) ${answers[0].name}\nB) ${answers[1].name}\nC) ${answers[2].name}\nD) ${answers[3].name}\nE) ${answers[4].name}\nF) Same Murderer`
										}
									}).then(msg => {
										msg.react("🇦")
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇧"))
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇨"))
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇩"))
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇪"))
											.then(() => MM_InProgress = true)
											.then(() => msg.react("🇫"))
											.then(() => MM_InProgress = true)
											.then(() => msg.awaitReactions(filter, {
												max: 1,
												time: 120000,
												erros: ['time']
											}))
											.then(collected => {
												MM_InProgress = false;
												if (correctness === 1) {
													inboxChannel.send({
														embed: {
															color: 15285149,
															title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
															"thumbnail": {
																"url": "https://imgur.com/OokvPxl.png"
															},
															description: `${message.author.username} successfully identified the murderer.`,
															fields: [{
																	"name": "Murderer:",
																	"value": `${murderer.name}`
																},
																{
																	"name": "Victims:",
																	"value": `${victim1.name} and ${victim2.name}`
																},
																{
																	"name": "Incorrect Answers:",
																	"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}\n${falseAnswer5.name}`
																}
															]
														}
													})
													return message.channel.send({
														embed: {
															color: 164352,
															title: `Correct!`,
															"thumbnail": {
																"url": murderer.img
															},
															description: `The murderer was ${murderer.name}!`
														}
													})
												};
												if (correctness === 2) {
													inboxChannel.send({
														embed: {
															color: 15285149,
															title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
															"thumbnail": {
																"url": "https://imgur.com/eTreUA6.png"
															},
															description: `${message.author.username} didn't identify the murderer.`,
															fields: [{
																	"name": "Murderer:",
																	"value": `${murderer.name}`
																},
																{
																	"name": "Victims:",
																	"value": `${victim1.name} and ${victim2.name}`
																},
																{
																	"name": "Incorrect Answers:",
																	"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}\n${falseAnswer5.name}`
																}
															]
														}
													})
													return message.channel.send({
														embed: {
															color: 13959168,
															title: `Wrong!`,
															"thumbnail": {
																"url": murderer.img
															},
															description: `The murderer was ${murderer.name}!`
														}
													})
												};
											}).catch(() => {
												message.channel.send("Yuh");
												MM_InProgress = false;
												inboxChannel.send({
													embed: {
														color: 15285149,
														title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
														"thumbnail": {
															"url": "https://imgur.com/eTreUA6.png"
														},
														description: `${message.author.username} ran out of time before identifying the murderer.`,
														fields: [{
																"name": "Murderer:",
																"value": `${murderer.name}`
															},
															{
																"name": "Victims:",
																"value": `${victim1.name} and ${victim2.name}`
															},
															{
																"name": "Incorrect Answers:",
																"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}\n${falseAnswer5.name}`
															}
														]
													}
												})
												return message.channel.send({
													embed: {
														color: 13959168,
														title: `You ran out of time!`,
														"thumbnail": {
															"url": murderer.img
														},
														description: `The murderer was ${murderer.name}!`
													}
												})
											})
									})
								}, 2000)
							};
							if (correctness === 2) {
								MM_InProgress = false;
								inboxChannel.send({
									embed: {
										color: 15285149,
										title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
										"thumbnail": {
											"url": "https://imgur.com/eTreUA6.png"
										},
										description: `${message.author.username} didn't identify the murderer.`,
										fields: [{
												"name": "Murderer:",
												"value": `${murderer.name}`
											},
											{
												"name": "Victims:",
												"value": `${victim1.name} and ${victim2.name}`
											},
											{
												"name": "Incorrect Answers:",
												"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}\n${falseAnswer5.name}`
											}
										]
									}
								})
								return message.channel.send({
									embed: {
										color: 13959168,
										title: `Wrong!`,
										"thumbnail": {
											"url": murderer.img
										},
										description: `The murderer was ${murderer.name}!`
									}
								})
							}
						}).catch(() => {
							MM_InProgress = false;
							inboxChannel.send({
								embed: {
									color: 15285149,
									title: `A game of Monomi's Murder Mystery was played by ${message.author.username}.`,
									"thumbnail": {
										"url": "https://imgur.com/eTreUA6.png"
									},
									description: `${message.author.username} ran out of time before identifying the murderer.`,
									fields: [{
											"name": "Murderer:",
											"value": `${murderer.name}`
										},
										{
											"name": "Victims:",
											"value": `${victim1.name} and ${victim2.name}`
										},
										{
											"name": "Incorrect Answers:",
											"value": `${falseAnswer1.name}\n${falseAnswer2.name}\n${falseAnswer3.name}\n${falseAnswer4.name}\n${falseAnswer5.name}`
										}
									]
								}
							})
							return message.channel.send({
								embed: {
									color: 13959168,
									title: `You ran out of time!`,
									"thumbnail": {
										"url": murderer.img
									},
									description: `The murderer was ${murderer.name}!`
								}
							})
						})
				})
			}
			if (murderType === "murder-suicide") {
				murderer = random(students);
				while (murderer.name === "SECRET TIME BABY!" || murderer.name === "SUICIDE" || murderer.name === "DOUBLE MURDER!!") {
					murderer = random(students);
				}

				victim = random(students);
				while (victim.name === "SECRET TIME BABY!" || victim.name === "SUICIDE" || victim.name === "DOUBLE MURDER!!" || victim === murderer) {
					victim = random(students);
				}

				MM_InProgress = false;
				return message.channel.send({
					embed: {
						color: 13959168,
						title: `Monomi's Murder Mystery: ${victim.name} was found dead!`,
						"thumbnail": {
							"url": `${victim.imgDead}`
						},
						description: `Wowwee!  This isn't a secret, but it's certainly an incomplete feature!  Cases of murder-suicides will be coming as soon as Dee can figure out a way to implement the idea!`
					}
				})
			}
		}
	}
	if (command === "rusdefine") {
		dictionary = [
			{
				word: "acomfort",
				syllables: "a·com·fort",
				pronounce: "/āˈkəmfərt/",
				types: "noun",
				definition: "a state without comfort.",
				synonymof: ["discomfort"],
				origin: ["a- (none)", "comfort"]
			},
			{
				word: "acomfort",
				syllables: "a·com·fort",
				pronounce: "/āˈkəmfərt/",
				types: "verb",
				definition: "make (someone) feel a lack of comfort.",
				synonymof: ["discomfort"],
				origin: ["a- (none)", "comfort"]
			},
			{
				word: "acomfortment",
				syllables: "a·com·fort·ment",
				pronounce: "/āˈkəmfərtmənt/",
				types: "noun",
				definition: "the ability to be uncomfortable in a situation.",
				synonymof: false,
				origin: ["acomfort"]
			},
			{
				word: "anxieffy",
				syllables: "an·xi·ef·fy",
				pronounce: "/aNGˈzīəfī/",
				types: "verb",
				definition: "to induce someone or something with anxiety.",
				synonymof: ["scare","terrificate","startle","stress out"],
				origin: ["anxiety"]
			},
			{
				word: "articling",
				syllables: "ar·ti·cling",
				pronounce: "/ˈärdəkliNG/",
				types: "noun",
				definition: "a covering designed to go over something, typically a person's body.",
				synonymof: ["cover", "jacket", "sleeve"],
				origin: ["article", "cling"]
			},
			{
				word: "bequip",
				syllables: "be·quip",
				pronounce: "/bəˈkwip, bēˈkwip/",
				types: "verb",
				definition: "harass or bully someone.",
				synonymof: ["harass", "bully", "oppress"],
				origin: ["quip"]
			},
			{
				word: "bonnific",
				syllables: "bon·ni·fic",
				pronounce: "/ˈbänēfik/",
				types: "adjective",
				definition: "to be of a pleasant nature.",
				synonymof: ["excellent", "magnificent", "good", "terrific"],
				origin: ["bonne (fr)", "terrific"]
			},
			{
				word: "chewery",
				syllables: "chew·er·y",
				pronounce: "/CHo͞o(ə)rē/",
				types: "noun",
				definition: "a place where people eat.",
				synonymof: ["cafeteria", "canteen", "restaurant", "buffet"],
				origin: ["chew", "brewery"]
			},
			{
				word: "circumming",
				syllables: "cir·cum·ming",
				pronounce: "/ˈsərkəmˌmiNG, ˈsərkəmiNG/",
				types: "noun",
				definition: "one's current state.",
				synonymof: ["circumstance", "happenstance", "situation"],
				origin: ["circumstance", "happening"]
			},
			{
				word: "compride",
				syllables: "com·pride",
				pronounce: "/ˈkämˌprīd/",
				types: "noun",
				definition: "a person that one holds in high regard.",
				synonymof: ["role model", "comrade", "friend", "companion"],
				origin: ["comrade", "pride"]
			},
			{
				word: "cudpanion",
				syllables: "cud pan ion",
				pronounce: "/ˈkədˈpanyən/",
				types: "noun",
				definition: "a friend who is highly affectionate.",
				synonymof: ["friend","*moirail*","companion","buddy"],
				origin: ["cuddle","companion"]
			},
			{
				word: "decaint",
				syllables: "dec·aint",
				pronounce: "/ˈdēkānt/",
				types: "verb",
				definition: "make something decorative.",
				synonymof: ["detail", "decorate", "ornament", "adorn"],
				origin: ["decorate", "paint"]
			},
			{
				word: "delecticious",
				syllables: "de·lec·ti·cious",
				pronounce: "/dəˈlektiSHəs/",
				types: "adjective",
				definition: "to be of good taste.",
				synonymof: ["delicious", "delectable", "appetizing"],
				origin: ["delicious", "delectable"]
			},
			{
				word: "detell",
				syllables: "de·tell",
				pronounce: "/dəˈtel/",
				types: "verb",
				definition: "explain in detail.",
				synonymof: ["describe", "tell"],
				origin: ["detail", "tell"]
			},
			{
				word: "difert",
				syllables: "di·fert",
				pronounce: "/dəˈfərt, dīˈfərt/",
				types: "verb",
				definition: "differ from the original source.",
				synonymof: ["differ"],
				origin: ["divert", "differ"]
			},
			{
				word: "diffultuous",
				syllables: "dif·ful·tu·ous",
				pronounce: "/ˈdifəlCHo͞oəs/",
				types: "adjective",
				definition: "requiring greater effort than a typical task.",
				synonymof: ["difficult","challenging","strenuous","demanding"],
				origin: ["difficult", "tumultuous"]
			},
			{
				word: "dislocational",
				syllables: "dis·lo·ca·tion·al",
				pronounce: "/ˈdisləˌkāSH(ə)n(ə)l, disˈlōˌkāSH(ə)n(ə)l/",
				types: "adjective",
				definition: "to not be able to be located due to changing positions too frequently.",
				synonymof: false,
				origin: ["dislocate", "locational"]
			},
			{
				word: "enpain",
				syllables: "en·pain",
				pronounce: "/inˈpān, enˈpān/",
				types: "verb",
				definition: "to be inflicted with pain.",
				synonymof: ["pain","hurt"],
				origin: false
			},
			{
				word: "enplormatory",
				syllables: "en·plor·ma·tor·y",
				pronounce: "/inˈplôrməˌtôrē, enˈplôrməˌtôrē/",
				types: "adjective",
				definition: "grand and impressive.",
				synonymof: ["grand", "impressive", "large", "astonishing"],
				origin: false
			},
			{
				word: "euphorize",
				syllables: "eu·phor·ize",
				pronounce: "/yo͞oˈfôrīz/",
				types: "verb",
				definition: "make something or someone happy, typically to a high degree.",
				synonymof: ["cheer", "gladden", "hearten","glücken"],
				origin: ["euphoria"]
			},
			{
				word: "explorrigate",
				syllables: "ex·plor·ri·gate",
				pronounce: "/ikˈsplôrəˌɡāt/",
				types: "verb",
				definition: "to look at something thoroughly as to take in all of its details, typically a place.",
				synonymof: ["explore", "investigate", "inspect", "survey"],
				origin: ["explore", "investigate"]
			},
			{
				word: "flower-scramble",
				syllables: "flo·wer-scram·ble",
				pronounce: "/ˈflou(ə)rˈskrambəl/",
				types: "noun",
				definition: "an assortment of flowers, typically in an art piece.",
				synonymof: ["patch of flowers", "flowerbed"],
				origin: false
			},
			{
				word: "gluckened",
				syllables: "glück·ened",
				pronounce: "/glǘckenˈlītnd/",
				types: "adjective",
				definition: "made happy.",
				synonymof: ["euphorized", "gladdened","cheered up"],
				origin: ["glücklich (Grmn)","enlightened"]
			},
			{
				word: "grimendous",
				syllables: "gri·men·dous",
				pronounce: "/ɡriˈmendəs/",
				types: "adjective",
				definition: "very great in grimness.",
				synonymof: ["dreadful","frightening","scary"],
				origin: ["grim","tremendous"]
			},
			{
				word: "hardcoming",
				syllables: "hard·com·ing",
				pronounce: "/härdˈkəmiNG/",
				types: "noun",
				definition: "something that is difficult to overcome.",
				synonymof: ["obstacle","hardship","complication"],
				origin: ["hardship","coming"]
			},
			{
				word: "imparable",
				syllables: "im·par·a·ble",
				pronounce: "/iˈmpärəb(ə)l/",
				types: "adjective",
				definition: "cannot be replaced.",
				synonymof: ["priceless", "irreplaceable"],
				origin: false
			},
			{
				word: "interrogate",
				syllables: "in·ter·ro·gate",
				pronounce: "/inˈterəˌɡət/",
				types: "noun",
				definition: "a question of interrogative nature.",
				synonymof: ["question"],
				origin: ["interrogate"]
			},
			{
				word: "keepance",
				syllables: "kee·pance",
				pronounce: "/kēpəns/",
				types: "noun",
				definition: "and act of keeping something.",
				synonymof: false,
				origin: ["keep"]
			},
			{
				word: "kinspring",
				syllables: "kin·spr·ing",
				pronounce: "/kinspriNG/",
				types: "noun",
				definition: "a child.",
				synonymof: ["child", "offspring", "kin"],
				origin: ["kin", "offspring"]
			},
			{
				word: "lesserly",
				syllables: "less·er·ly",
				pronounce: "/ˈlesərlē/",
				types: "adverb",
				definition: "in a manner that is lesser to something else.",
				synonymof: [""],
				origin: [""]
			},
			{
				word: "logion",
				syllables: "lo·gion",
				pronounce: "/lōjin/",
				types: "noun",
				definition: "a place covering a large area of land that isn't confined to political boundaries of countries.",
				synonymof: false,
				origin: ["location", "region"]
			},
			{
				word: "matrimarial",
				syllables: "ma·tri·mar·i·al",
				pronounce: "/ˈmatrəˈmerēəl/",
				types: "adjective",
				definition: "of or relating to marriage.",
				synonymof: ["marital", "matrimonial"],
				origin: ["matrimony", "marital"]
			},
			{
				word: "novemation",
				syllables: "no·ve·ma·tion",
				pronounce: "/ˈnōvəˈmāSH(ə)n/",
				types: "noun",
				definition: "a book of considerable length.",
				synonymof: ["novel", "war and peace"],
				origin: ["novel", "animation"]
			},
			{
				word: "occupanion",
				syllables: "occ·u·pan·ion",
				pronounce: "/ˌäkyəˈpanyən/",
				types: "noun",
				definition: "an item or object belonging to someone.",
				synonymof: ["belonging", "possession", "property"],
				origin: ["occupancy", "companion"]
			},
			{
				word: "occuzen",
				syllables: "occ·u·zen",
				pronounce: "/ˌäkyəˈzən/",
				types: "noun",
				definition: "someone that occupies a place.",
				synonymof: ["occupant", "resident", "denizen", "citizen"],
				origin: ["occupant", "denizen"]
			},
			{
				word: "paraphenomenal",
				syllables: "para·phe·nom·e·nal",
				pronounce: "/ˈperəˌfəˈnämənəl/",
				types: "adjective",
				definition: "to be of a nature that is seemingly supernatural yet partially explainable.",
				synonymof: false,
				origin: ["paranormal", "phenomenal"]
			},
			{
				word: "pixelography",
				syllables: "pix·el·og·ra·phy",
				pronounce: "/ˈpiksəläɡrəfē/",
				types: "noun",
				definition: "a collection of digital images that, when put together, form an animated image.",
				synonymof: ["video","gif","animation"],
				origin: ["pixel","-ography"]
			},
			{
				word: "publishment",
				syllables: "pub·lish·ment",
				pronounce: "/ˈpəbliSHmənt/",
				types: "noun",
				definition: "the action of publishing of something or being published.",
				synonymof: false,
				origin: ["publish", "complement"]
			},
			{
				word: "ranquish",
				syllables: "ran·quish",
				pronounce: "/rānˈkwiSH/",
				types: "noun",
				definition: "bitter or resentful suffering.",
				synonymof: false,
				origin: ["rancor","anguish"]
			},
			{
				word: "ranquish",
				syllables: "ran·quish",
				pronounce: "/rānˈkwiSH/",
				types: "verb",
				definition: "be very bitterly suffering over something.",
				synonymof: false,
				origin: ["rancor","anguish"]
			},
			{
				word: "ranquishment",
				syllables: "ran·quish·ment",
				pronounce: "/rānˈkwiSHmənt/",
				types: "noun",
				definition: "something or someone that causes one to be ranquished.",
				synonymof: false,
				origin: ["ranquish"]
			},
			{
				word: "say-so",
				syllables: "say·so",
				pronounce: "/ˈsā ˌsō/",
				types: "noun",
				definition: "a claim, typically without evidence.",
				synonymof: ["claim","statement"],
				origin: false
			},
			{
				word: "schegenda",
				syllables: "sche·gen·da",
				pronounce: "/ˈskeˈjendə/",
				types: "noun",
				definition: "a plan that is set to take place over a period of time.",
				synonymof: ["plan", "agenda", "program", "schedule"],
				origin: ["schedule", "agenda"]
			},
			{
				word: "spendable",
				syllables: "spend·able",
				pronounce: "/spendəb(ə)l/",
				types: "noun",
				definition: "currency.",
				synonymof: ["money", "spense", "currency"],
				origin: false
			},
			{
				word: "spendable",
				syllables: "spend·able",
				pronounce: "/spendəb(ə)l/",
				types: "adjective",
				definition: "to be able to be spent.",
				synonymof: false,
				origin: false
			},
			{
				word: "spense",
				syllables: "spense",
				pronounce: "/spens/",
				types: "noun",
				definition: "currency.",
				synonymof: ["money", "currency", "spendable"],
				origin: ["expense", "spend"]
			},
			{
				word: "splourishment",
				syllables: "splour·ish·ment",
				pronounce: "/splôriSHmənt/",
				types: "noun",
				definition: "the rapid growth of something.",
				synonymof: false,
				origin: ["splash", "flourish"]
			},
			{
				word: "talentual",
				syllables: "tal·en·tu·al",
				pronounce: "/ˈtalən(t)SH(o͞o)əl/",
				types: "adjective",
				definition: "of or relating to a talent that something or someone has.",
				synonymof: false,
				origin: ["talent"]
			},
			{
				word: "terrificate",
				syllables: "ter·ri·fi·cate",
				pronounce: "/ˈterəfəˌkāt/",
				types: "verb",
				definition: "to induce a sense of terror or dread onto someone.",
				synonymof: ["scare","spook","terrify"],
				origin: ["terrify","allocate"]
			},
			{
				word: "thieverize",
				syllables: "thie·ver·ize",
				pronounce: "/THēvəˌrīz/",
				types: "verb",
				definition: "to steal something or from someone.",
				synonymof: ["steal","snatch","take","theive"],
				origin: ["theive","-ize"]
			},
			{
				word: "think-not-know-not",
				syllables: "think-not-know-not",
				pronounce: "/THiNGk-nät-nō-nät/",
				types: "adjective; phrase of think",
				definition: "an expression of speech meaning that someone or something is not aware of something obvious before them.",
				synonymof: false,
				origin: false
			},
			{
				word: "togoing",
				syllables: "to·go·ing",
				pronounce: "/to͞oˈɡōiNG/",
				types: "noun",
				definition: "the path that something or someone takes to get somewhere.",
				synonymof: ["path", "journey", "route"],
				origin: ["going to"]
			},
			{
				word: "venquire",
				syllables: "ven·quire",
				pronounce: "/ˈvenˈkwīr/",
				types: "verb",
				definition: "to ask (someone) with confidence about what the answer will be.",
				synonymof: ["ask", "inquire"],
				origin: ["venture", "inquire"]
			},
			{
				word: "verunym",
				syllables: "ver·u·nym",
				pronounce: "/ˈvero͞oˌnim/",
				types: "noun",
				definition: "the true name of something or someone.",
				synonymof: false,
				origin: ["veru- (ltn)", "-nym"]
			},
			//Template {word:"",syllables:"",pronounce:"//",types:"",definition:"",synonymof:[""],origin:[""]},
		];

		var words = [];
		for (x in dictionary) {
			if (words.toString().search(dictionary[x].word) != -1) {
				continue
			};
			words.push(dictionary[x].word);
			x++;
		};
		dictionarySize = words.length;

		let embed = new Discord.RichEmbed()
			.setColor(13959168)
			.setAuthor("Official Ruslan Eun-Kyung Kraus Dictionary", "https://imgur.com/3jzc9fM.png")
			.setFooter(`RusDefine | This dictionary contains ${dictionarySize} words.`);

		if (!args[0]) { //List of words in dictionary.
			let pages = [];
			let pageAmount = parseInt(words.length / 20);
			if ((words.length % 20) != 0) {
				pageAmount++;
			}
			while (pageAmount != 0) {
				let currentPage = '';
				let y = 1;
				while (words.length != 0 && y <= 20) {
					if (words.length === 0) {
						break;
					}
					if (y === 21) {
						break;
					}
					y++;
					currentPage = currentPage + "· " + words.shift() + "\n";
				}
				pages.push(currentPage);
				pageAmount--;
			}

			let page = 1;


			embed.setDescription(pages[page - 1]);
			embed.setFooter(`RusDefine | Page ${page} of ${pages.length} | This dictionary contains ${dictionarySize} words.`)
			message.channel.send(embed).then(msg => {
				msg.react('◀').then(r => {
					msg.react('▶')

					const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
					const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;

					const backwards = msg.createReactionCollector(backwardsFilter, {
						time: 60000
					});
					const forwards = msg.createReactionCollector(forwardsFilter, {
						time: 60000
					});

					backwards.on('collect', r => {
						if (page === 1) return;
						page--;
						embed.setDescription(pages[page - 1]);
						embed.setFooter(`RusDefine | Page ${page} of ${pages.length} | This dictionary contains ${dictionarySize} words.`)
						msg.edit(embed)
					})

					forwards.on('collect', r => {
						if (page === pages.length) return;
						page++;
						embed.setDescription(pages[page - 1]);
						embed.setFooter(`RusDefine | Page ${page} of ${pages.length} | This dictionary contains ${dictionarySize} words.`)
						msg.edit(embed)
					})
				})
			})
		} else { //Specific word.
			var words = [];
			for (x in dictionary) {
				words.push(dictionary[x].word);
				x++;
			};

			if (words.toString().search(args[0].toLowerCase()) === -1) { //Word not in dictionary
				return message.channel.send(`I'm sorry, but it would appear that the word \"${args[0].toLowerCase()}\" does not exist inside of the dictionary. Make sure that you typed it correctly!`)
			}

			entryFields = [];
			for (x in words) {
				if (words[x].toString() === args[0].toLowerCase()) {
					requestedWord = dictionary[x];
					descData = "**" + requestedWord.syllables + "** " + requestedWord.pronounce;
					words.splice(words[x], 1, { word: 'hi' });
					fieldData = "1. " + requestedWord.definition;
					if (requestedWord.synonymof != false) {
						fieldData = fieldData + "\nsynonyms: ";
						for (y in requestedWord.synonymof) {
							fieldData = fieldData + requestedWord.synonymof[y] + ", ";
						};
						fieldData = fieldData.substring(0, fieldData.length - 2) + ".";
					};
					embed.addField(`${requestedWord.types}`, `${fieldData}`);
					continue;
				};
				continue;
			};

			if (requestedWord.origin != false) {
				descData = descData + "\norigin: "
				for (x in requestedWord.origin) {
					descData = descData + requestedWord.origin[x] + ", ";
				}
				descData = descData.substring(0, descData.length - 2) + ".";
			};

			embed.setDescription(descData);
			return message.channel.send(embed);
		}
	}

	//Utility Commands
	if (command === "ping") {
		inboxChannel.send(`${message.author.username} has pinged!`);
		message.channel.send("Pong!");
		return MM_InProgress = false;
	}
	/*if (command === "rank") {
		if (message.content.search("476831906835464205") != -1) return;
		if (message.content.search("<@!") != -1 && message.content.search(message.author.id) === -1) {
			sql.get(`SELECT * FROM scores WHERE userId ="${message.mentions.members.first().id}"`).then(row => {
				message.channel.send(`${client.users.find('id', message.mentions.members.first().id).username}'s current level is ${row.level} and they have ${row.points} experience!`);
			}).catch(() => {
				sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER, cooldown STRING, hopefragments INTEGER)").then(() => {
					sql.run("INSERT INTO scores (userId, points, level, cooldown, hopefragments) VALUES (?, ?, ?, ?, ?)", [message.mentions.members.first().id, 1, 0, 'hi', 0]);
				});
				message.channel.send(`${client.users.find('id', message.mentions.members.first().id).username}'s current level is ${row.level} and they have ${row.points} experience!`);
			})
			inboxChannel.send(`${message.author.username} has asked Monomi about ${client.users.find('id', message.mentions.members.first().id).username}'s rank!`)
		}
		if (message.content.search(message.author.id) != -1 || args.length === 0 || (args.length > 0 && message.content.search("@") === -1)) {
			sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
				message.channel.send(`Your current level is ${row.level} and you have ${row.points} experience!`);
			}).catch(() => {
				sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER, cooldown STRING, hopefragments INTEGER)").then(() => {
					sql.run("INSERT INTO scores (userId, points, level, cooldown, hopefragments) VALUES (?, ?, ?, ?, ?)", [message.author.id, 1, 0, 'hi', 0]);
				});
				message.channel.send(`Your current level is ${row.level} and you have ${row.points} experience!`);
			})
			inboxChannel.send(`${message.author.username} has asked Monomi about their rank!`)
		}
		if (message.content.search("@everyone") != -1 || message.content.search("@here") != -1) {
			inboxChannel.send(`${message.author.username} has tried to check the rank of everyone.`)
			message.channel.send("You can't check everyone's level!")
		}
	}*/
	if (command === "credits") {
		message.channel.send({
			embed: {
				color: 15285149,
				title: "MonomiBot Credits",
				fields: [{
					name: ":heart_exclamation: Coded by:",
					value: "Dee!"
				}]
			}
		})
	}

	//Radio
	if (!servers[message.guild.id]) servers[message.guild.id] = {
		queue: []
	}
	var server = servers[message.guild.id];
	if (command === "play" || command === "p") {
		if (!args[0]) {
			return message.channel.send(":x: Please provide a link to your music.")
		};
		if (!message.member.voiceChannel) {
			return message.channel.send(":x: You must be in a voice channel to use this command.")
		};
		if (!ytdl.validateURL(args[0])) {
			return message.channel.send(":x: Please provide a valid YouTube URL.")
		};

		ytdl.getInfo(args[0], function (err, info) {

			videoTitle = info.title;
			videoUrl = info.video_url;

			server.queue.push({
				title: videoTitle,
				url: videoUrl
			});
			if (currentlyPlaying === null) {
				message.channel.send(`:notes: Now playing \`${info.title}\`.`)
			}
			if (currentlyPlaying != null) {
				message.channel.send(`:notes: Added \`${info.title}\` to the queue.`)
			}
			if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
				play(connection, message)
			});
			inboxChannel.send(`${message.author.username} asked Monomi to play \`${info.title}\`.`)
		})
	}
	if (command === "remove" || command === "rm") {
		if (!message.member.voiceChannel) {
			return message.channel.send(":x: You must be in a voice channel to use this command.")
		};
		if (!message.guild.voiceConnection) {
			return message.channel.send(":x: Monomi isn't currently in any voice channels, use `m!radio play [song]` to summon Monomi.")
		};
		if (args[0] && Number.isInteger(args[0] * 1) === true) {
			x = args[0] * 1;
			if (server.queue[x]) {
				message.channel.send(`:white_check_mark: \`${server.queue[x].title}\` has been removed from the queue.`);
				server.queue.splice(x, 1);
				inboxChannel.send(`${message.author.username} asked Monomi to remove a song.`)
				return;
			} else {
				return message.channel.send(":x: This song does not exist within the queue, please make sure you entered the correct number.")
			}
		}
		return message.channel.send(":x: Please specify which song you would like to remove.");
	}
	if (command === "move" || command === "m") {
		if (!args[1]) {
			return message.channel.send(":x: Please specify which item you're moving and to where.")
		};
		var queueShiftFrom = parseInt(args[0], 10);
		var queueShiftTo = parseInt(args[1], 10);

		if (Number.isInteger(queueShiftFrom) === false || Number.isInteger(queueShiftTo) === false) {
			return message.channel.send(":x: The positions provided to Monomi are not integers, please use valid positions.")
		};
		if (queueShiftFrom === 0 || queueShiftTo === 0) {
			return message.channel.send(":x: You cannot move the song that is currently playing.")
		};
		if (server.queue.length < queueShiftFrom || server.queue.length < queueShiftTo) {
			return message.channel.send(":x: The positions provided to Monomi are not in the queue, please use valid positions.")
		};

		inboxChannel.send(`${message.author.username} asked Monomi to move a song in the queue.`)

		move(server.queue, queueShiftFrom, queueShiftTo, message);
	}
	if (command === "queue" || command === "q") {
		if (!message.guild.voiceConnection) {
			return message.channel.send(":x: Monomi isn't currently in any voice channels, use `m!radio play [song]` to summon Monomi.")
		};
		var upNext = "";
		inboxChannel.send(`${message.author.username} asked Monomi for the queue.`)
		if (server.queue.length > 1) {
			for (x in server.queue) {
				upNext += `\`${x}.\` [${server.queue[x].title}](${server.queue[x].url})\n\n`
			}
			upNext = upNext.substring(`\`0.\` [${server.queue[0].title}](${server.queue[0].url})\n\n`.length);
			message.channel.send({
				embed: {
					color: 15474730,
					title: "Current Queue:",
					fields: [{
							name: "\n__Now Playing:__",
							value: `[${currentlyPlaying.title}](${currentlyPlaying.url})\n\n`
						},
						{
							name: ":arrow_down_small: __Up Next:__ :arrow_down_small:",
							value: `${upNext}`
						}
					]
				}
			});
			return;
		} else {
			message.channel.send({
				embed: {
					color: 15474730,
					title: "Current Queue:",
					fields: [{
						name: "__Now Playing:__",
						value: `[${currentlyPlaying.title}](${currentlyPlaying.url})`
					}]
				}
			});
			return;
		}
	}
	if (command === "loop" || command === "l") {
		if (!message.member.voiceChannel) {
			return message.channel.send(":x: You must be in a voice channel to use this command.")
		};
		if (!message.guild.voiceConnection) {
			return message.channel.send(":x: Monomi isn't currently in any voice channels, use `m!radio play [song]` to summon Monomi.")
		};
		if (loopSetting === false) {
			message.channel.send(":repeat_one: Monomi will now play this song on loop.");
			loopSetting = true;
			inboxChannel.send(`${message.author.username} asked Monomi to play the current song on loop.`)
			return;
		}
		if (loopSetting === true) {
			message.channel.send(":no_entry_sign: Monomi will no longer play the song on loop.");
			loopSetting = false;
			inboxChannel.send(`${message.author.username} asked Monomi to stop playing the current song on loop.`)
			return;
		}
	}
	if (command === "loopqueue" || command === "lq" || command === "qloop" || command === "loopq") {
		if (!message.member.voiceChannel) {
			return message.channel.send(":x: You must be in a voice channel to use this command.")
		};
		if (!message.guild.voiceConnection) {
			return message.channel.send(":x: Monomi isn't currently in any voice channels, use `m!radio play [song]` to summon Monomi.")
		};
		if (loopQueueSetting === false) {
			message.channel.send(":repeat: Monomi will now play this queue on loop.");
			loopQueueSetting = true;
			inboxChannel.send(`${message.author.username} asked Monomi to play the current queue on loop.`)
			return;
		}
		if (loopQueueSetting === true) {
			message.channel.send(":no_entry_sign: Monomi will no longer play the queue on loop.");
			loopQueueSetting = false;
			inboxChannel.send(`${message.author.username} is asked Monomi to stop playing the current queue on loop.`)
			return;
		}
	}
	if (command === "skip" || command === "next") {
		if (!message.member.voiceChannel) {
			return message.channel.send(":x: You must be in a voice channel to use this command.")
		};
		if (server.dispatcher) {
			message.channel.send(`:fast_forward: As per request, Monomi has skipped \`${currentlyPlaying.title}\`.`)
			server.dispatcher.end();
			inboxChannel.send(`${message.author.username} asked Monomi to skip the current song.`)
			return;
		}
		return message.channel.send(":x: Monomi isn't currently in any voice channels, use `m!radio play [song]` to summon Monomi.");
	}
	if (command === "disconnect" || command === "dc" || command === "dis" || command === "d" || command === "clear" || command === "cl" || command === "fuckoff" || command === "leave") {
		if (!message.member.voiceChannel) {
			return message.channel.send(":x: You must be in a voice channel to use this command.")
		};
		if (!message.guild.voiceConnection) {
			return message.channel.send(":x: Monomi isn't currently in any voice channels, use `m!radio play [song]` to summon Monomi.")
		};
		for (var i = server.queue.length; i > -1; i--) {
			server.queue.pop();
		}
		message.channel.send(":door: Monomi has left the classroom.");
		currentlyPlaying = null;
		inboxChannel.send(`${message.author.username} asked Monomi to stop playing music and leave.`)
		return message.guild.voiceConnection.disconnect();
	}
});

client.login(process.env.BOT_TOKEN)