//get file url
//convert file to json
//get sha256 hash of document
//append hash to each json object for each line
//convert back to csv


const crypto = require('crypto')

const fs = require('fs')

const hash = crypto.createHash

const csv = require('csvtojson')

const csvApp = csv()



function parser(csvFilePath) {csvApp.fromFile(csvFilePath)
    .then((jsonObj)=>{

        var hashValuesArray = []
        //generate CHIP-0007 compatible JSON
        
        
        
        for(var i = 1; i<jsonObj.length;i++){
            if(jsonObj[i]!== ""){
                let JsonFile =  JSON.stringify({
                    "format": "CHIP-0007",
                    "name": `${jsonObj[i].Filename}`,
                    "description": `${jsonObj[i].Description}`,
                    "minting_tool": "SuperMinter/2.5.2",
                    "sensitive_content": false,
                    "series_number":i,
                    "series_total": 420,
                    "attributes": [{
                    "Gender": `${jsonObj[i].Gender}`,
                    "Attributes-Hair": `${jsonObj[i]["Attributes- Hair"]}`
        }
        ]
                })
                console.log(JsonFile)



                var JsonString = JSON.stringify(JsonFile)
                var fileHash = hash('sha256').update(JsonString).digest('base64')
                jsonObj[i].sha256 = fileHash
                hashValuesArray[i] = fileHash

                }
            }
        

        console.log('rowJson file created')

        
        

        var JsonCSVObj = JSON.stringify(jsonObj)
        var hashValuesJson = JSON.stringify(hashValuesArray)

        fs.writeFile('csvwithhash1.output.csv',JsonCSVObj,(err)=>{
            if(err){
               return console.log(err)
            }
            console.log('made file csvwithhash.output.csv')
        })

        fs.writeFile('hashvalues1.csv',hashValuesJson,(err)=>{
            if(err){
                console.log(err)
            }
            console.log('made file hashvalues.csv')
})
    })}

module.exports = parser
