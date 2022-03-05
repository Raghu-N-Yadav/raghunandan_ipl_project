const fs =  require('fs');
function exportToJSON(fileName, path){
    fs.writeFileSync(path, JSON.stringify(fileName),'utf-8', (error) => {
        if(error){
            console.log(error);
        }
    })
}

module.exports = exportToJSON;