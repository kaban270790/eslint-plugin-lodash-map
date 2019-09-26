# Replacer lodash#map to native Array#map

Правило для `eslint` и `lodash` которое позовляет заменить использование метода `map` на использованние нативного `Array#map`.

Возможные замены на:
* `[1,2,3,4].map(callFunction)`
* `_.isArray(collection) ? collection.map((item) => item) : _.map(collection, (item) => item)` - применяется 
когда явно не получается определить тип первого аргумента
 
