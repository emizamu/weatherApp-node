const axios = require('axios');

class Searches {

    historial = [];
    
    constructor () {
    
    }

    get paramsMapBox () {

      return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }

    }
    
    
    async searchCity (place = '') { // Busca una ciudad
        if (!place) {
            throw new Error('Se debe indicar un lugar.');
        }

        try{ // Se utiliza Try and Catch en caso de que falle la conexion
            
            const instance = axios.create({ // Se crea una instancia con los parametros como atributo
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                timeout: 2000,
                params: this.paramsMapBox
            })

            const resp = await instance.get();
            console.log(resp.data);
            // const locations = resp.data.features.map(loc => ({
            //     name: loc.place_name,
            //     coordinates: loc.geometry.coordinates
            // }));
            // console.log(locations);
            return []; // Devuelve arreglo con todos los lugares que coincidan
        }
        catch (err){
            return [];
        }
    }


}

module.exports = Searches;