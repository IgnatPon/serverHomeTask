const http = require('http')
const fs = require('fs')
const path = require('path') 

const PORT = 3000

const server = http.createServer((req, res) => {
    

    res.setHeader('Content-Type', 'text/html')
    
        
       
        
    const createPath = (page) => path.resolve(__dirname, 'pages', `${page}.html`)
    const createPathBD = (page) => path.resolve(__dirname, 'pages', `${page}.json`)
    
    let basePath = '';
    
    
    switch (req.url) {
        case '/':
        case '/main':
        case '/home':
        case '/index':
            basePath = createPath('index')
            res.statusCode = 200
            break
        case '/page1':
            basePath = createPath('page1')
            res.statusCode = 200
            break
        case '/page2':
            basePath = createPath('page2')
            res.statusCode = 200
            break
        case '/bd':
            basePath = createPathBD('bd')
            res.statusCode = 200
            break
        default:
            res.statusCode = 301
            res.setHeader('Location', 'page2')
            res.end()
    }

    fs.readFile(basePath, async (err, data) => {
        if (err) {
            console.log(err)
            res.statusCode = 500 
            res.end()
        }
        else {
            await fs.readFile('./style.css', (er, dataS) => {
                if(er){
                    console.log(er)
                }
                else{
                   
                    res.write(data)
                    res.write(`<style>${dataS}</style>`)
                    res.end()
                }
                
            })
            
            
        }
    })
    

})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})