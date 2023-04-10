import { LocalStorage } from 'quasar'

export default {
    set: function(key, value) {
        LocalStorage.set(key, value);
    },
    get: function(key) {
        return LocalStorage.getItem(key);
    },
    has: function(key) {
        return LocalStorage.has(key);
    },
    hasAndNotEmpty: function(key) {
        return this.has(key) && this.get(key) !== '';
    },
    getOrEmptyString: function(key) {
        return !this.has(key) ? '' : this.get(key);
    }
}