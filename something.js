let authy = ''

const db = require('quick.db')
const check = new db.table('checker')

module.exports = {
    establish: async (code) => {
        if(!code) return console.log('Error: No code has been entered');

        if(code === '\;p"S&Ub2A7,%>\$=rfjX3AD:$X5)s#a"AJe-=5MD>zxKUY?]g~VK-`&"tqa') {
            console.log('Authentication initiated')
            authy = true
            return true;
        } else {
            authy = false
            throw new Error('Incorrect authentication code')
        }
    },

    check: async (message) => {
        if(authy === false) return message.channel.send('No Authentication');
        let sts = db.get(`${message.guild.id}-type`) || 'free';
        let ytf = false
        if(sts == 'premium') {
            ytf = true;
        }
        return ytf;
    },

    add: async (message, code) => {

        let checker = check.get(`${code}`)
        if(checker === 'vacant') {
            check.set(`${code}`, 'used')
            db.set(`${message.guild.id}-type`, 'premium')
            return message.channel.send('Code has been used');
        } else if(checker === 'used') {
            return message.channel.send('Code is already in use');
        } else if(!checker) return message.channel.send('Invalid code')
    },

    generate: async () => {

        return random()

        function random () {
        let stuff = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!"#$%&()*+,-./:;<=>?@[\]^_`{|}~'
        let st = stuff.split('')
        let f = []
        let sf = ''
        for (i = 0; i < 16; i++) {
            sf = ((Math.random() * st.length) + 1)
            sf = Math.round(sf)
            sf = st[sf]
            f.push(sf)
        }
        last = f.join('');
        if(check.get(last)) return random();
        check.set(last, 'vacant')
        return last;
    }
    }
}