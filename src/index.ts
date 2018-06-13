import { App } from "./app";
import { select, range } from "d3";
import { DataBase } from "./db";
import { Table } from "@apache-arrow/es2015-esm";
import { bin } from "vega-statistics";

const b = bin({ maxbins: 25, extent: [-11, 100] });
console.log(b);
console.log(range(b.start, b.stop, b.step));

fetch(require("../data/flights-10k.arrow")).then(response => {
  response.arrayBuffer().then(buffer => {
    const table = Table.from(new Uint8Array(buffer));
    const data = {};
    for (const field of table.schema.fields) {
      data[field.name] = table
        .getColumn(field.name)!
        // .slice(0, 100)
        .toArray();
    }

    const VIEWS: View[] = [
      {
        bins: 25,
        dimension: "ARR_DELAY",
        name: "ARR_DELAY",
        domain: [-10, 100],
        title: "Arrival Delay",
        type: "1D"
      },
      {
        bins: 25,
        dimension: "DISTANCE",
        name: "DISTANCE",
        domain: [50, 2000],
        title: "Distance",
        type: "1D"
      },
      {
        bins: 25,
        dimension: "DEP_DELAY",
        name: "DEP_DELAY",
        domain: [-10, 100],
        title: "Departure Delay",
        type: "1D"
      },
      {
        bins: [25, 25],
        dimensions: ["DEP_DELAY", "ARR_DELAY"],
        name: "DEP_DELAY_ARR_DELAY",
        domains: [[-10, 100], [-10, 100]],
        title: "Delay Matrix",
        type: "2D"
      }
    ];

    const db = new DataBase(data, VIEWS);

    const el = select("#app");

    // add for now to clear the view
    (el.node() as any).innerHTML = "";

    new App(el, VIEWS, db);
  });
});

// const data = require("../data/flights-10k.json");

// data.AIR_TIME = new Int16Array(data.AIR_TIME);
// data.ARR_DELAY = new Int16Array(data.ARR_DELAY);
// data.DEP_DELAY = new Int16Array(data.DEP_DELAY);
// data.DISTANCE = new Int16Array(data.DISTANCE);
// data.ARRIVAL = data.ARRIVAL.map(d => new Date(d * 1000));
// data.DEPARTURE = data.DEPARTURE.map(d => new Date(d * 1000));
