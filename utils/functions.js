module.exports = {
    chunk: (array, chunk) => {

        let chunks = []
        let i = 0
        let n = array.length
      
        while (i < n) chunks.push(array.slice(i, i += chunk))
        return chunks
    }
}