Package.describe({
  summary: 'Re-usable charts for d3.js'
});

Package.on_use(function (api) {
  api.use('d3', 'client');
  api.add_files([
    'lib/nv.d3.min.js',
    'lib/nv.d3.css'
  ], 'client');
});
