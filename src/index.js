const request = require('request')
const fs = require('fs')
const path = require('path')
const takeLinks = require('./takeLinks')

const outDir = path.resolve(__dirname, '../out')
const processedFilePath = path.resolve(outDir, 'processed')

const linksStr = fs.readFileSync(path.resolve(__dirname, '../links'), 'utf-8')
const processedStr = fs.readFileSync(processedFilePath, 'utf-8')

const links = linksStr.split('\n').filter(x => x !== '')
const processed = processedStr.split('\n').filter(x => x !== '')
// console.log('links:', links)
console.log('processed:', processed)

const take = takeLinks(7)(processed)

const linksToDownload = take(links)
console.log('linksToDownload:', linksToDownload)

let count = processed.length + 1

linksToDownload.forEach(link => {
  console.log('requesting:', link)
  // TODO: pad count if < 10
  var countStr = count < 10 ? '0' + count : '' + count
  count++;
  const fileName = path.resolve(outDir, `${countStr}.webm`)
  const fileStream = fs.createWriteStream(fileName)
  request(link).pipe(fileStream)
  fileStream.on('finish', () => {
    console.log('about to append the link', link)
    fs.appendFileSync(processedFilePath, link + '\n', 'utf8')
  })
})
