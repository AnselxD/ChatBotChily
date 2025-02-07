const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const path = require("path")
const fs = require("fs")

function readFileSyncWithCheck(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, "utf8")
    } else {
        console.error(`Error: File not found - ${filePath}`)
        return ''
    }
}

const direcCochabambaPath = path.join(__dirname, "mensajes", "direcCochabamba.txt")
const direcCochabamba = readFileSyncWithCheck(direcCochabambaPath)
const direcCatalogoPath = path.join(__dirname, "mensajes", "direcCatalogo.txt")
const direcCatalogo = readFileSyncWithCheck(direcCatalogoPath)
const direcLaPazPath = path.join(__dirname, "mensajes", "direcLaPaz.txt")
const direcLaPaz = readFileSyncWithCheck(direcLaPazPath)
const direcPotosiPath = path.join(__dirname, "mensajes", "direcPotosi.txt")
const direcPotosi = readFileSyncWithCheck(direcPotosiPath)
const direcSucrePath = path.join(__dirname, "mensajes", "direcSucre.txt")
const direcSucre = readFileSyncWithCheck(direcSucrePath)
const bienvenidainicialPath = path.join(__dirname, "mensajes", "bienvenidainicial.txt")
const bienvenidainicial = readFileSyncWithCheck(bienvenidainicialPath)


const flowSucre = addKeyword("¿Cual es la dirección de Sucre por favor?")
    .addAnswer(bienvenidainicial)
    .addAnswer(direcSucre, { delay: 2000 })
    .addAnswer("Te invito a ver nuestro catálogo de productos 😇 👉 https://wa.me/c/59175987720 👌", { delay: 800 }) // Luego enviar el mensaje completo
    .addAnswer("Si tienes alguna otra consulta 🤔, no dudes en escribirnos, _*Asesor de Ventas*_ te responderá cuanto antes. 😊", { delay: 700 })


const flowCochabamba = addKeyword("¿Cual es la dirección de Cochabamba por favor?")
    .addAnswer(bienvenidainicial)
    .addAnswer(direcCochabamba, { delay: 2000 })
    .addAnswer("Te invito a ver nuestro catálogo de productos 😇 👉 https://wa.me/c/59175987720 👌", { delay: 800 })
    .addAnswer("Si tienes alguna otra consulta 🤔, no dudes en escribirnos, _*Asesor de Ventas*_  te responderá cuanto antes. 😊", { delay: 700 })

const flowLaPaz = addKeyword("¿Cual es la dirección de La Paz por favor?")
    .addAnswer(bienvenidainicial)
    .addAnswer(direcLaPaz, { delay: 2000 })
    .addAnswer("Te invito a ver nuestro catálogo de productos 😇 👉 https://wa.me/c/59175987720 👌", { delay: 800 })
    .addAnswer("Si tienes alguna otra consulta 🤔, no dudes en escribirnos, _*Asesor de Ventas*_  te responderá cuanto antes. 😊", { delay: 700 })

    const flowPotosi = addKeyword(["¿Cual es la dirección de Potosi por favor?","¿Cual es la dirección de Potosí por favor?"])
    .addAnswer(bienvenidainicial)
    .addAnswer(direcPotosi, { delay: 2000,});

const flowCatalogo = addKeyword("Quiero ver el catálogo por favor")
    .addAnswer(bienvenidainicial)
    .addAnswer("Por supuesto, este es nuestro catálogo de productos 😇 👉 https://wa.me/c/59175987720 👌", { delay: 1500 })
    .addAnswer(direcCatalogo, { delay: 2000 })
    .addAnswer("Si tienes alguna otra consulta 🤔, no dudes en escribirnos, _*Asesor de Ventas*_  te responderá cuanto antes. 😊", { delay: 700 })

    
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowSucre, flowCochabamba, flowLaPaz, flowPotosi,flowCatalogo])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()