import { LocalStorage } from 'quasar'

const has = function(key) {
    return LocalStorage.has(key);
}

export default {
    set: function(key, value) {
        LocalStorage.set(key, value);
    },
    get: function(key) {
        return LocalStorage.getItem(key);
    },
    hasAndNotEmpty: function(key) {
        return has(key) && this.get(key) !== '';
    },
    getOrEmptyString: function(key) {
        return !has(key) ? '' : this.get(key);
    }
}