import axios from 'axios';

class sendMail {

    async sender(Header, Body){
        const { to, subject, from } = Header;

        try {
            
            const information = {};
            for(let i in Body){
                information[i] = Body[i];
            }

            await axios.post('https://apimailer.megaconecta.tec.br/', {
                header: {
                    to: to,
                    assunto: subject,
                    from: from
                }, information
            })

        } catch (error) {
            console.log(error);
        }
    }

}

export default new sendMail();