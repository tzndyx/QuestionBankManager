/**
 * @author tongzn
 */

var Scope = function() {
    this.$$watchers = [];
};

Scope.prototype.$watch = function(watchExp, listener) {
    this.$$watchers.push({
        watchExp: watchExp,
        listener: listener || function() {}
    });
};

Scope.prototype.$digest = function() {
    var dirty;

    do {
        dirty = false;

        for (var i = 0; i &lt; this.$$watchers.length; i++) {
            var newValue = this.$$watchers[i].watchExp(),
                oldValue = this.$$watchers[i].last;

            if (oldValue !== newValue) {
                this.$$watchers[i].listener(newValue, oldValue);

                dirty = true;

                this.$$watchers[i].last = newValue;
            }
        }
    } while (dirty);
};