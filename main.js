// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

class pAequor {
  //class from which to create pAequor instances
  #id;
  constructor(DNAbases) {
    this.#id = Math.floor(Math.random() * 1000) + Date.now();
    this._DNAbases = DNAbases;
  }

  get id() {
    //getter for #id
    return this.#id;
  }

  get DNAbases() {
    //getter for _DNAbases
    return this._DNAbases;
  }

  mutate() {
    //takes the instance's _DNAbases and changes one of its elements to a random, different nucleotide
    const nucleotideIndex = Math.floor(Math.random() * 15);
    const nucleotideOptions = "ATCG".replace(this._DNAbases[nucleotideIndex],''); //prettier-ignore
    this._DNAbases[nucleotideIndex] = nucleotideOptions[Math.floor(Math.random() * 3)]; //prettier-ignore
    return this._DNAbases;
  }

  compareDNA(comparedPAequor) {
    let commonNucleotides = 0;
    for (const index in this._DNAbases) {
      if (this._DNAbases[index] == comparedPAequor.DNAbases[index]) {
        commonNucleotides++;
      }
    }
    let percentageSimilar = (commonNucleotides / 15) * 100;
    return percentageSimilar;
  }

  willLikelySurvive() {
    //returns true when the percentage of C and G nucleotides > 60%
    let goodNucleotides = 0;
    for (const nucleotide of this._DNAbases) {
      if (nucleotide == "C" || nucleotide == "G") {
        goodNucleotides++;
      }
    }
    console.log(goodNucleotides);
    return goodNucleotides >= 9 ? true : false;
  }
}

const createPAequor = (populationSize) => {
  pAequorPopulation = [];

  do {
    const candidate = new pAequor(mockUpStrand());
    if (candidate.willLikelySurvive)
      pAequorPopulation.push(new pAequor(mockUpStrand()));
  } while (pAequorPopulation.length < populationSize);
  return pAequorPopulation;
};

const lab = createPAequor(500);

const findMostSimilar = (population) => {
  const mostSimilar = { specimens: [], similarity: 0 };

  population.forEach((specimen1, i) => {
    for (let j = i + 1; j < population.length; j++) {
      specimen2 = population[j];
      similarity = specimen1.compareDNA(specimen2);
      if (similarity > mostSimilar.similarity) {
        mostSimilar.specimens = [specimen1.id, specimen2.id];
        mostSimilar.similarity = similarity;
      } else if (similarity == mostSimilar.similarity) {
        mostSimilar.specimens.push(specimen1.id, specimen2.id);
      }
    }
  });

  let specimenList = "";
  numberOfSimilars = mostSimilar.specimens.length;
  for (i = 0; i < numberOfSimilars; i += 2) {
    specimenList +=
      mostSimilar.specimens[i] + " and " + mostSimilar.specimens[i + 1];
    if (numberOfSimilars > 2 && i != numberOfSimilars - 2) {
      specimenList += ", ";
    }
  }

  return `Specimens ${specimenList} are ${Math.round(
    mostSimilar.similarity
  )}% similar.`;
};

console.log(findMostSimilar(lab));
