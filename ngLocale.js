(function() {
  angular.module('ngLocale', []).service('$locale', function() {
    return this;
  }).provider('$localeDynamic', function() {
    var LOCALE_DATA, getDefaultLocale, initLocaleDynamicService, localeDynamic, setLocale;
    LOCALE_DATA = {};
    localeDynamic = null;
    getDefaultLocale = function() {
      var PLURAL_CATEGORY, getDecimals, getVF;
      PLURAL_CATEGORY = {
        ZERO: 'zero',
        ONE: 'one',
        TWO: 'two',
        FEW: 'few',
        MANY: 'many',
        OTHER: 'other'
      };
      getDecimals = function(n) {
        var i;
        n = n + '';
        i = n.indexOf('.');
        if (i === -1) {
          return 0;
        } else {
          return n.length - i - 1;
        }
      };
      getVF = function(n, opt_precision) {
        var base, f, v;
        v = opt_precision;
        if (void 0 === v) {
          v = Math.min(getDecimals(n), 3);
        }
        base = Math.pow(10, v);
        f = (n * base | 0) % base;
        return {
          v: v,
          f: f
        };
      };
      return {
        'DATETIME_FORMATS': {
          'AMPMS': ['AM', 'PM'],
          'DAY': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'ERANAMES': ['Before Christ', 'Anno Domini'],
          'ERAS': ['BC', 'AD'],
          'FIRSTDAYOFWEEK': 6,
          'MONTH': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          'SHORTDAY': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          'SHORTMONTH': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          'STANDALONEMONTH': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          'WEEKENDRANGE': [5, 6],
          'fullDate': 'EEEE, MMMM d, y',
          'longDate': 'MMMM d, y',
          'medium': 'MMM d, y h:mm:ss a',
          'mediumDate': 'MMM d, y',
          'mediumTime': 'h:mm:ss a',
          'short': 'M/d/yy h:mm a',
          'shortDate': 'M/d/yy',
          'shortTime': 'h:mm a'
        },
        'NUMBER_FORMATS': {
          'CURRENCY_SYM': '$',
          'DECIMAL_SEP': '.',
          'GROUP_SEP': ',',
          'PATTERNS': [
            {
              'gSize': 3,
              'lgSize': 3,
              'maxFrac': 3,
              'minFrac': 0,
              'minInt': 1,
              'negPre': '-',
              'negSuf': '',
              'posPre': '',
              'posSuf': ''
            }, {
              'gSize': 3,
              'lgSize': 3,
              'maxFrac': 2,
              'minFrac': 2,
              'minInt': 1,
              'negPre': '-¤',
              'negSuf': '',
              'posPre': '¤',
              'posSuf': ''
            }
          ]
        },
        'id': 'en',
        'localeID': 'en',
        'pluralCat': function(n, opt_precision) {
          var i, vf;
          i = n | 0;
          vf = getVF(n, opt_precision);
          if (i === 1 && vf.v === 0) {
            return PLURAL_CATEGORY.ONE;
          }
          return PLURAL_CATEGORY.OTHER;
        }
      };
    };
    setLocale = function($locale, locale) {
      var k, results, v;
      results = [];
      for (k in locale) {
        v = locale[k];
        results.push($locale[k] = v);
      }
      return results;
    };
    this.registerLocale = function(ngLocaleData) {
      if (ngLocaleData.id) {
        LOCALE_DATA[ngLocaleData.id] = ngLocaleData;
      }
    };
    initLocaleDynamicService = function($rootScope, $injector) {
      var $locale;
      if (!localeDynamic) {
        localeDynamic = {};
        $locale = $injector.get('$locale');
        setLocale($locale, getDefaultLocale());
        localeDynamic.setLocale = function(localeId) {
          $locale = $injector.get('$locale');
          if (localeId === 'cz') {
            localeId = 'cs';
          }
          if (LOCALE_DATA.hasOwnProperty(localeId)) {
            setLocale($locale, LOCALE_DATA[localeId]);
          } else {
            setLocale($locale, getDefaultLocale());
          }
        };
      }
      return localeDynamic;
    };
    this.$get = ['$rootScope', '$injector', initLocaleDynamicService];
    return this;
  });

}).call(this);
