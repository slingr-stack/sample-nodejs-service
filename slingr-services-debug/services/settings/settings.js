const httpModule = require('../httpModule/httpModule');
const {setPropertyOnSettings} = require('../configuration/configuration');


const checkProxyStatus = async () => {
    try {
        let res = await httpModule.get('/svcs/configuration');
        let data = res.data;
        return data.proxy
    } catch (err) {

        console.log("err is:",err);
        console.log('----------ENV VARS ----------------');
        console.log(JSON.stringify(...process.env));
        console.log('------------------------------');
    }
}

const refreshCache = async () => {
        try {
            await httpModule.put('/svcs/management/clearCache');
        } catch (err) {

            console.log("err is:",err);
        }
}

module.exports = {
    checkProxyStatus,
    refreshCache 
}