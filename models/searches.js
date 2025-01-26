const axios = require('axios');

class Searches {

    historial = [];
    
    constructor () {}

    get paramsMapBox () {
      return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    
    
    async searchCity (place = '') { // Busca una ciudad
        
        try{ // Se utiliza Try and Catch en caso de que falle la conexion
            
            const instance = axios.create({ // Se crea una instancia con los parametros como atributo
                baseURL: `https://api.mapbox.com/search/geocode/v6/forward?q=${place}`,
                timeout: 2000,
                params: this.paramsMapBox
            })

            const resp = await instance.get();
            const locations = resp.data.features.map(loc => ({ // Se usa map para devolver algunos parametros solamente 
                id: loc.id,
                name: loc.properties.full_address,
                lng: loc.properties.coordinates.longitude,
                lat: loc.properties.coordinates.latitude,
            }));
            
            return locations; // Devuelve arreglo con todos los lugares que coincidan
        
        }
        catch (err){
            return [];
        }
    }


}

module.exports = Searches;