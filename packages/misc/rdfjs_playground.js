import graphy from "graphy";

const dataset = graphy.memory.dataset.fast();
const DataFactory = graphy.core.data.factory;
const createTurtleWriter = graphy.content.ttl.scribe;
const psychoGraph = DataFactory.namedNode("PsychoGraph");

// Entities
const hendrik = DataFactory.namedNode("psp:hendrik");
const omes = DataFactory.namedNode("psp:omes");
const person = DataFactory.namedNode("psp:person");

// Relationships
const KENNT = DataFactory.namedNode("psp:KENNT");
const IS_A = DataFactory.namedNode("psp:IS_A");

// turtle writer setup
const TurtleWriter = createTurtleWriter({
  data(quad) {
    console.log(String(quad));
  },
  finish() {
    console.log("done writing");
  },
});

dataset.addQuads([
  DataFactory.quad(hendrik, IS_A, person, psychoGraph),
  DataFactory.quad(omes, IS_A, person, psychoGraph),
  DataFactory.quad(omes, KENNT, hendrik, psychoGraph),
  DataFactory.quad(hendrik, KENNT, omes, psychoGraph),
  DataFactory.quad(hendrik, KENNT, hendrik),
  DataFactory.quad(omes, KENNT, omes),
]);

console.log([...dataset]);
[...dataset].forEach(quad => TurtleWriter.write(quad))

