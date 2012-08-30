"use strict";

// Class to represent our magic square
var Square = function(opts) {
    this.width = opts.width || 10;
    this.height = opts.height || 10;
    this.stepRange = opts.range || 10;
    this.grid = opts.grid || false;

    // No grid, create one;
    if (!this.grid) {
        this.init();
    }
};

Square.prototype = function () {
    // Utility functions up here
    var randomInt = function randomInt(range) {
        return Math.floor(Math.random() * range);
    };

    var arrayDeepClone = function arrayDeepClone(array) {
        var arr = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] instanceof Array) {
                arr[i] = arrayDeepClone(array[i]);
            }
            else {
                arr[i] = array[i];
            }
        }
        return arr;
    };

    var adjustGrid = function adjustGrid(grid) {
        var i = 0, j = 0, swap_down = false;
        while (true) {

            if (i == grid.length - 1 && j == grid[0].length - 1) {
                break;
            }

            // i overflow, swap right
            if (i == grid.length - 1) {
                swap_down = false;
            }
            // j overflow, swap down
            else if (j == grid[0].length - 1) {
                swap_down = true;
            }
            // right is bigger, swap right
            else if (grid[i + 1][j] > grid[i][j + 1]) {
                swap_down = false;
            }
            // right is smaller, swap down
            else {
                swap_down = true;
            }

            if (!swap_down) {
                grid[i][j] = grid[i][j + 1];
                grid[i][j + 1] = Infinity;
                j++;
            }
            else {
                grid[i][j] = grid[i + 1][j];
                grid[i + 1][j] = Infinity;
                i++;
            }
        }
    };

    return {
        init: function() {
            var i, j, g, w, h, r, m, b;

            g = this.grid;
            w = this.width;
            h = this.height;
            r = this.stepRange;

            // Aliasing this out of lazyness :)
            m = Math.max;

            // Base number, represents "base" number we
            // generate new numbers from
            b = 0;

            // Build the square according to the "rules"
            for (i = 0; i < h; i++) {
                g[i] = [];
                for (j = 0; j < w; j++) {
                    if (i > 0)
                        b = m(g[i - 1][0], b);
                    if (j > 0)
                        b = m(g[i][j - 1], b);

                    g[i][j] = b + 1 + randomInt(r);
                }
            }
        },

        flatten: function() {
            var flat = [],
                i, j;

            for (i = 0; i < this.height; i++) {
                for (j = 0; j < this.width; j++) {
                    flat[i * this.height + j] = this.grid[i][j];
                }
            }

            return flat;
        },

        findNumber: function(target_number) {
            // Start at the top right
            var i = 0,
                j = this.width - 1,
                g = this.grid;


            var found = false, still_possible = true;

            while (!found && still_possible) {
                var current_num = g[i][j];
                if (target_number == current_num) {
                    found = true;
                }
                else if (target_number > current_num) {
                    i++;
                }
                else if (target_number < current_num) {
                    j--;
                }
                else if (i > this.height || j < this.width) {
                    still_possible = false;
                }
            }

            return found ? [i, j] : false;
        },

        findNthSmallest: function(n) {
            if (n > this.width * this.height) {
                return false
            }
            var g = arrayDeepClone(this.grid);
            while (n > 1) {
                g[0][0] = Infinity;
                adjustGrid(g);
                n--;
            }

            return g[0][0];
        }
    }
}();

module.exports = Square;
