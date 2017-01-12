import os


def convertNgLocale(fpath):
    with open(fpath) as f:
        data = f.read()
    data = data.replace(
        'angular.module("ngLocale", [], ["$provide", function($provide) {',
        'angular.module("ngLocale").config(["$localeDynamic", function($localeDynamic) {'
    )
    data = data.replace(
        '$provide.value("$locale", ',
        '$localeDynamic.registerLocale('
    )
    with open(fpath, 'w') as f:
        f.write(data)


for name in os.listdir('./'):
    p = os.path.join('./', name)
    if not os.path.isfile(p):
        continue
    ext = os.path.splitext(p)[-1]
    if ext.lower() == '.js' and name not in ['ngLocale.js']:
        convertNgLocale(p)
