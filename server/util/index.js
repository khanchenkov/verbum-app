const pg = require("../database/database");

/**
 * @param origin {any}
 * @param map {Map<any, any>}
 * @param idName {string}
 * @return {any}
 */
const merge = (origin, map, idName = "id") => {
    const id = origin[idName], pending = id && map.get(id);
    if (pending)
        origin = {...origin, ...pending};
    return origin;
};

/**
 * @param map {Map<string, any>}
 * @param table {string}
 * @param idName {string}
 * @return {Promise}
 */
const updateDb = (map, table, idName = "id") => {
    return pg.transaction(trx=>{
        const q = [];
        map.forEach((value, id)=>q.push(pg(table).where(idName, id).update(value).transacting(trx)));
        Promise.all(q)
            .then(trx.commit)
            .then(() => map.clear())
            .catch(trx.rollback);
    });
};

/**
 * @param map {Map<string, any>}
 * @param table {string}
 * @param interval {number}
 * @return {NodeJS.Timer}
 */
const updateDbInterval = (map, table, interval) => {
    return setInterval(()=>updateDb(map, table), interval);
}

module.exports = { merge, updateDb, updateDbInterval };