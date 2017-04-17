const takeLinks = n => processed => (links = []) => {
  const result = []
  for (let i = 0; i < links.length; i++) {
    let link = links[i]
    if (!processed.includes(link)) result.push(link)
    if (result.length === n) break
  }
  return result
}

module.exports = takeLinks
