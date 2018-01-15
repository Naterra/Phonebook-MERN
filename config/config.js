// keys.js - figure out what set of credentials to return
import  prod_conf from  './prod';
import  dev_conf  from  './dev';

let config;

if(process.env.NODE_ENV === 'production'){
    config =  prod_conf;

}else{
    config =  dev_conf;
}
 //console.log(config, 'config');

export default config;