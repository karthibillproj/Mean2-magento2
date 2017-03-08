(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'client', // 'dist',
    '@angular':                   'node_modules/@angular',
    'rxjs':                       'node_modules/rxjs',
    'moment':                     'node_modules/moment/moment.js',
    'ng2-bootstrap/ng2-bootstrap': 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
    'ng2-bs3-modal':              'node_modules/ng2-bs3-modal',
    '@angular/material':          'npm:@angular/material/bundles/material.umd.js',
    "ng2-dropdown":               "node_modules/ng2-dropdown",
     "lodash":                     'node_modules/lodash/lodash.js',
    'nouislider':                 'node_modules/nouislider',
    'ng2-nouislider':             'node_modules/ng2-nouislider',
    'angular2-cookie':             'node_modules/angular2-cookie',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'ng2-bootstrap':              { main: 'ng2-bootstrap.js', defaultExtension:'js'},
    'ng2-bs3-modal':              { defaultExtension: 'js' },
    'material':                   { defaultExtension: 'js' },
    "ng2-dropdown":               { "main": "index.js", "defaultExtension": "js" },
    "lodash":                      { defaultExtension: 'js' },
    "lodash":                     { defaultExtension: 'js' },
    'nouislider':                 { main: 'distribute/nouislider.js', defaultExtension: 'js' },
    'ng2-nouislider':             { main: 'src/nouislider.js', defaultExtension: 'js' },
    'angular2-cookie':             { main: 'core.js', defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);
  
})(this);