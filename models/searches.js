const fs = require('fs');
const axios = require('axios');

class Searches {

    history = [];
    dbPath = './db/database.json';
    
    constructor () {
        this.readDB();
    }

    get paramsMapBox () {
      return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather () {
        return {
              'units': 'metric',
              'lang': 'es',
          }
    }

    get historyCap (){ // Se utiliza para volver a poner las mayusculas en cada inicio de palabra
        return this.history.map(place => {

            let words = place.split(' ');
            words = words.map(w => w[0].toUpperCase() + w.substring(1));

            return words.join(' ');

        })

    }
   
    addHistory = (place = '') => {
        
        if(this.history.includes(place.toLocaleLowerCase())){
            return;
        }
        this.history = this.history.splice(0,5); // Limita la cantidad de elementos en el arreglo de historial

        this.history.unshift(place.toLocaleLowerCase());
        this.saveDB();
    }


    async searchCity (place = '') { // Busca una ciudad
        
        try{ // Se utiliza Try and Catch en caso de que falle la conexion
            
            const instance = axios.create({ // Se crea una instancia con los parametros como atributo
                baseURL: `https://api.mapbox.com/search/geocode/v6/forward?q=${place}`,
                timeout: 2000,
                params: this.paramsMapBox
            })

            const resp = await instance.get(); // Obtiene la conocexion
            const locations = resp.data.features.map(loc => ({ // Se usa map para elegir que parametros devolver 
                id: loc.id,
                name: loc.properties.full_address,
                lng: loc.properties.coordinates.longitude,
                lat: loc.properties.coordinates.latitude,
            }));
            
            return locations; // Devuelve un arreglo con todos los lugares que coincidan
        
        }
        catch (err){
            return [];
        }
    }

    async searchWeather (lat,lon) { // Busca una ciudad
        
        try{ // Se utiliza Try and Catch en caso de que falle la conexion
            
            const instance = axios.create({ // Se crea una instancia con los parametros como atributo
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}`,
                timeout: 2000,
                params: this.paramsOpenWeather
            })

            const resp = await instance.get(); // Obtiene la conocexion

            return { // Se devuelve un objeto con la siguiente informacion necesaria
                desc: resp.data.weather[0].description, 
                temp: resp.data.main.temp,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
            };
        
        }
        catch (err){
            return [];
        }
    }

    saveDB(){

        fs.writeFileSync(this.dbPath,JSON.stringify(this.history));

    }

    readDB(){

        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        
        const data = JSON.parse(info);

        this.history = data;
    }


}

module.exports = Searches;