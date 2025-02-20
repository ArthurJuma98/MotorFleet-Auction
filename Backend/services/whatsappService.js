const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client();
client.on("qr", (qr) => qrcode.generate(qr, { small: true }));
client.on("ready", () => console.log("Whatsapp Client Ready"));
client.initialize();

const sendWhatsappMessage = (message) => {
    const phoneNumber = "0790734815"; //test number
    client.sendMessage(`${phoneNumber}@c.us`, message);
};

module.exports = sendWhatsappMessage;