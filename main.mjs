import puppeteer from "puppeteer";
import readline from "readline-sync";
import { LocalStorage } from "node-localstorage";
import { timeout } from "puppeteer";

const localStorage = new LocalStorage('./scratch')

let user = []
async function reservar() {
    if (localStorage.getItem("matricula") != null & localStorage.getItem("senha") != null) {
        user[0] = readline.question('matricula: ')
        user[1] = readline.question('senha: ')
        localStorage.setItem("matricula", user[0]);
        localStorage.setItem("senha", user[1]);
        const browser = await puppeteer.launch({ headless: false }); //abre um navegador
        const page = await browser.newPage(); //abre uma pagina
        const url = `https://restaurante.casjp.ifpi.edu.br`;
        await page.goto(url) //acessa a url que foi declarada anteriormente
        console.log('funcionando1')

        await page.waitForSelector('#inputmatricula');
        console.log('funcionando2')
        await page.waitForSelector('#inputsenha');
        console.log('funcionando3')

        await page.type('#inputmatricula', localStorage.getItem("matricula")); //responde o input da matricula com a matricula informada pelo usuario
        await page.type('#inputsenha', localStorage.getItem("senha"));  //responde o input da senha com a senha informada pelo usuario

        await page.waitForSelector('.btn.btn-lg.btn-primary.btn-block'); //aguarda até que o botão de 'acessar esteja carregado para clicar'
        await page.click('.btn.btn-lg.btn-primary.btn-block'); //clica no botão de 'acessar'
        console.log('funcionando4');

        await page.waitForSelector('.btn.btn-success.btn-lg.btn-block.p-4');
        console.log('funcionando5')
        await page.click('.btn.btn-success.btn-lg.btn-block.p-4');
        console.log('funcionando6')

        console.log('aeee deu certo')
        setTimeout(() => { browser.close() }, 5000)

    }

    else {
        console.clear()
        const matricula = readline.question('Digite sua matricula por favor ');
        const senha = readline.question('digite sua senha por favor ');
        user[0] = matricula;
        user[1] = senha;
        console.log('Reservando...');
        console.log(user[0], user[1])

        const browser = await puppeteer.launch({ headless: false }); //abre um navegador 
        const page = await browser.newPage(); //abre uma pagina
        const url = `https://restaurante.casjp.ifpi.edu.br`;
        await page.goto(url) //acessa a url que foi declarada anteriormente 
        console.log('funcionando1')

        await page.waitForSelector('#inputmatricula');
        console.log('funcionando2')
        await page.waitForSelector('#inputsenha');
        console.log('funcionando3')

        await page.type('#inputmatricula', matricula); //responde o input da matricula com a matricula informada pelo usuario
        await page.type('#inputsenha', senha);  //responde o input da senha com a senha informada pelo usuario

        await page.waitForSelector('.btn.btn-lg.btn-primary.btn-block'); //aguarda até que o botão de 'acessar esteja carregado para clicar'
        await page.click('.btn.btn-lg.btn-primary.btn-block'); //clica no botão de 'acessar'
        console.log('funcionando4');

        await page.waitForSelector('.btn.btn-success.btn-lg.btn-block.p-4');
        console.log('funcionando5')
        await page.click('.btn.btn-success.btn-lg.btn-block.p-4');
        console.log('funcionando6')

        console.log('aeee deu certo')

        await browser.close();
    }
}


reservar()
console.log(localStorage.getItem("matricula"))

// 1 10 100 1000 10.000 100.000
//



