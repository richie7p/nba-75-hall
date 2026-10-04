import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync } from "node:fs";
import { PLAYERS, getPlayer } from "../../src/data";
import { PHOTOS } from "../../src/data/photos";
import { PLAYER_SOURCES } from "../../src/data/provenance";
import { ERAS, POSITIONS, filterPlayers, groupedByEra, hallStats, neighborIds, normalizeFilters } from "../../src/lib/hall";
const all={q:"",era:"all",pos:"all"};
test("catalog has 76 unique stable IDs and complete paths",()=>{
 assert.equal(PLAYERS.length,76);assert.equal(new Set(PLAYERS.map(p=>p.id)).size,76);
 for(const p of PLAYERS){assert.equal(getPlayer(p.id),p);assert.ok(p.path.length);assert.ok(ERAS.includes(p.era));assert.ok(POSITIONS.includes(p.pos));}
});
test("search supports case-insensitive names, Chinese names, nicknames and historic teams",()=>{
 assert.ok(filterPlayers(PLAYERS,{...all,q:"  MICHAEL JORDAN  "}).some(p=>p.id==="michael-jordan"));
 assert.ok(filterPlayers(PLAYERS,{...all,q:"字母哥"}).some(p=>p.id==="giannis-antetokounmpo"));
 assert.ok(filterPlayers(PLAYERS,{...all,q:"密爾瓦基公鹿"}).some(p=>p.id==="giannis-antetokounmpo"));
});
test("combined era and position filters intersect without mutating catalog",()=>{
 const before=PLAYERS.map(p=>p.id);const result=filterPlayers(PLAYERS,{q:"",era:"modern",pos:"PG"});
 assert.ok(result.length);assert.ok(result.every(p=>p.era==="modern"&&p.pos==="PG"));assert.deepEqual(PLAYERS.map(p=>p.id),before);
});
test("invalid URL values normalize to usable all-filter state",()=>{
 assert.deepEqual(normalizeFilters({q:[],era:"invented",pos:"bad"}),all);
 assert.equal(normalizeFilters({q:"x".repeat(1000)}).q.length,200);
 assert.equal(filterPlayers(PLAYERS,{q:"",era:"bad",pos:"bad"}).length,76);
});
test("unknown query has an empty state and blank query resets",()=>{
 assert.equal(filterPlayers(PLAYERS,{...all,q:"no such athlete xyz"}).length,0);
 assert.equal(filterPlayers(PLAYERS,all).length,76);
});
test("groups form a lossless partition in configured chronological order",()=>{
 const groups=groupedByEra(PLAYERS);
 assert.deepEqual(groups.map(g=>g.era),ERAS);
 assert.equal(groups.flatMap(g=>g.players).length,76);
 assert.deepEqual(groupedByEra([]),[]);
});
test("navigation wraps at both ends and rejects unknown IDs",()=>{
 assert.equal(neighborIds(PLAYERS,PLAYERS[0]!.id).prev,PLAYERS.at(-1)!.id);
 assert.equal(neighborIds(PLAYERS,PLAYERS.at(-1)!.id).next,PLAYERS[0]!.id);
 assert.deepEqual(neighborIds([],"missing"),{prev:null,next:null});
 assert.equal(getPlayer("missing"),undefined);
});
test("aggregates count player awards, not unique franchise championships",()=>{
 const p=getPlayer("michael-jordan")!;
 assert.equal(hallStats([p,p]).rings,p.nba.championships.length*2);
 assert.deepEqual(hallStats([]),{count:0,rings:0,mvps:0,fmvps:0,hof:0});
});
test("every player with a 2026 claim has an explicitly scoped primary source",()=>{
 for(const p of PLAYERS.filter(p=>JSON.stringify(p).includes("2026"))){assert.ok(PLAYER_SOURCES[p.id]?.length,p.id);for(const s of PLAYER_SOURCES[p.id]!)assert.equal(new URL(s.url).hostname,"www.nba.com");}
});
test("unverified portraits are neither referenced nor shipped",()=>{
 assert.deepEqual(PHOTOS,{});
 for(const p of PLAYERS)assert.equal(existsSync(`public/portraits/${p.id}.jpg`),false);
});
test("confirmed transaction corrections do not retain stale clubs or undisclosed terms",()=>{
 assert.equal(getPlayer("kawhi-leonard")!.path.at(-1)!.team,"Toronto Raptors");
 assert.equal(getPlayer("giannis-antetokounmpo")!.trades[0]!.date,"2026-07-06");
 assert.ok(!JSON.stringify(getPlayer("lebron-james")).includes("790"));
});
