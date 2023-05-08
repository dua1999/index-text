const fs = require('fs');
const { Readable } = require('stream');

const inputFilePath = 'input.txt';
const inputStream = fs.createReadStream(inputFilePath, 'utf8');

const splitWords = (data) => data.split(/[ \n]/);

const filterSymbols = (word) => word.replace(/,/g, '');

const indexText = (words) => {
  const wordCount = {};
  words.forEach((word) => {
    if (word in wordCount) {
      wordCount[word] += 1;
    } else {
      wordCount[word] = 1;
    }
  })

  const sortedWords = Object.keys(wordCount).sort();
  const resultVector = sortedWords.map((word) => wordCount[word]);

  return resultVector;
};

const outputFilePath = 'output.txt';
const outputStream = fs.createWriteStream(outputFilePath, 'utf8');

inputStream
  .on('data', (chunk) => {
    const words = splitWords(chunk);
    const filteredWords = words.map(filterSymbols);
    const resultVector = indexText(filteredWords);
    outputStream.write(JSON.stringify(resultVector));
  })
  .on('end', () => {
    outputStream.end();
    console.log('Text indexing completed! Check output.txt');
  });