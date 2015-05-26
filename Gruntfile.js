'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Config
    var config = {
        styles  : './web-server/public/styles/',
        scripts : './web-server/public/scripts/',
        public  : './web-server/public/'
    }

    // Grunt config
    grunt.initConfig({
        shell: {
            watchWeb: {
                command: 'nodemon web-server/web-server.js'
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: config.styles,
                    src: ['main.scss'],
                    dest: config.styles,
                    ext: '.css'
                }]
            }
        },

        watch: {
            sass: {
                files: [config.styles +'*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            },
        },

        concurrent: {
            watch: {
                tasks: ['shell:watchWeb', 'watch:sass'],
                options: {
                    logConcurrentOutput : true
                }
            }
        },


        concat: {
            options: {
                separator: '/*swag*/',
            },

            dist: {
                src: [config.scripts +'/**/*.js'],
                dest: config.scripts +'built.js',
            },
        },


        // Add all bower_components to our index.html file
        bowerInstall: {
            target: {
                src: [
                    config.public + 'index.html', 
                ]
            }
        }
    });

    // Compile all SASS, start watching for sass changes and for changes in the express app
    grunt.registerTask('start-web', ['bowerInstall', 'sass', 'concat', 'concurrent:watch']);

    grunt.registerTask('serve', [
        'start-web'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);
};
