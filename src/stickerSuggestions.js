/**
 * Menghitung jarak Levenshtein antara dua string
 * @param {String} string1
 * @param {String} string2 
 * @returns {Integer} Jarak Levenshtein
 */
function levenshteinDist(string1, string2) {
  let m = string1.length;
  let n = string2.length;

  const distance = Array(n + 1)
    .fill(null)
    .map(() => Array(m + 1).fill(null));

  for (let i = 0; i <= m; i++) {
    distance[0][i] = i;
  }

  for (let j = 0; j <= n; j++) {
    distance[j][0] = j;
  }

  var subsCost;
  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (string2.charAt(j - 1) === string1.charAt(i - 1)) {
        subsCost = 0;
      } else {
        subsCost = 1;
      }

      distance[j][i] = Math.min(
        distance[j][i - 1] + 1, // deletion
        distance[j - 1][i] + 1, // insertion
        distance[j - 1][i - 1] + subsCost // substitution
      );
    }
  }

  return distance[n][m];
}

/**
 * Mencari tingkat kesamaan antara label dan teks
 * @param {String} label Label stiker 
 * @param {String} text  Teks yang ditulis pengguna
 * @returns {Integer} Tingkat kesamaan dalam range 0-100
 */
function similarityTest(label, text) {
  let dist = levenshteinDist(label, text);
  if (label.length > text.length) {
    return ((label.length - dist) / label.length) * 100;
  } else {
    return ((text.length - dist) / text.length) * 100;
  }
}

/**
 * Mencari stiker yang paling cocok dengan teks yang ditulis pengguna
 * @param {String} text Mencari stiker yang cocok dengan teks yang ditulis pengguna
 * @param {String} stickersGallery Daftar stiker yang ada
 * @returns {Array} Daftar stiker yang cocok dengan teks yang ditulis pengguna
 */
function findStickers(text, stickersGallery) {
  let result = [];
  let minSimilarity = 50;

  if (text !== "") {
    for (let sticker of stickersGallery) {
      let tags = sticker.tags.split(", ");

      for (let tag of tags) {
        let similarity = similarityTest(tag, text);
        if (similarity >= minSimilarity) {
          result.push(sticker);
          break;
        }
      }
    }
  }

  return result;
}

export default findStickers;