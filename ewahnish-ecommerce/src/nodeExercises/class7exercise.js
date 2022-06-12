import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let frase = "Frase inicial";

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on("error", error => console.log(`Server error ${error}`))

// Routes
app.get('/api/frase', (req, res) => {
    res.json({
        frase: frase
    })
})

app.get('/api/palabra/:pos', (req, res) => {
    let words = frase.split(" ");
    let pos = parseInt(req.params.pos);
    console.log(pos)
    if (!isNaN(pos)) {
        if ((words.length >= pos) && (pos <= words.length)) {
            res.json({
                "buscada": words[pos - 1]
            })
        } else {
            res.send({
                "error": "Parameter out of range",
            })
        }
    } else {
        res.send({
            "error": "Parameter is not a number",
        })
    }
})

app.post('/api/palabra', (req, res) => {
    let receive = req.body;
    let word = receive.palabra
    frase = frase + " " + word;
    res.json({
        "agregada": word,
        "frase": frase
    })
})

app.put('/api/palabra', (req, res) => {
    let receive = req.body;
    let word = receive.palabra;
    console.log(word)
    let replacement = receive.reemplazo;
    let words = frase.split(" ");
    const index = words.findIndex(element => element === word);
    console.log(index)
    let searchedWord = words[index]
    console.log(searchedWord)
    if (searchedWord != undefined) {
        words[index] = replacement;
        frase = "";
        for (let i = 0; i < words.length; i++) {
            if (i === 0) {
                frase = frase + words[i]
            } else {
                frase = frase + " " + words[i];
            }
        }
        console.log("Word ", searchedWord, " found and replaced");
        res.json({
            "actualizada": replacement,
            "anterior": searchedWord,
            "frase": frase
        })    
    } else {
        console.log("Word ", searchedWord, " not found");
    }

})