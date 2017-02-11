angular.module('ngLocale', [])


.service '$locale', ()->
    @



.provider '$localeDynamic', ()->
    LOCALE_DATA = {}
    localeDynamic = null

    getDefaultLocale = ()->
        PLURAL_CATEGORY = {
            ZERO: 'zero'
            ONE: 'one'
            TWO: 'two'
            FEW: 'few'
            MANY: 'many'
            OTHER: 'other'
        }

        getDecimals = (n) ->
          n = n + ''
          i = n.indexOf('.')
          if i == -1 then 0 else n.length - i - 1

        getVF = (n, opt_precision) ->
          v = opt_precision
          if undefined == v
            v = Math.min(getDecimals(n), 3)
          base = 10 ** v
          f = (n * base | 0) % base
          {
            v: v
            f: f
          }
        {
          'DATETIME_FORMATS':
            'AMPMS': [
              'AM'
              'PM'
            ]
            'DAY': [
              'Sunday'
              'Monday'
              'Tuesday'
              'Wednesday'
              'Thursday'
              'Friday'
              'Saturday'
            ]
            'ERANAMES': [
              'Before Christ'
              'Anno Domini'
            ]
            'ERAS': [
              'BC'
              'AD'
            ]
            'FIRSTDAYOFWEEK': 6
            'MONTH': [
              'January'
              'February'
              'March'
              'April'
              'May'
              'June'
              'July'
              'August'
              'September'
              'October'
              'November'
              'December'
            ]
            'SHORTDAY': [
              'Sun'
              'Mon'
              'Tue'
              'Wed'
              'Thu'
              'Fri'
              'Sat'
            ]
            'SHORTMONTH': [
              'Jan'
              'Feb'
              'Mar'
              'Apr'
              'May'
              'Jun'
              'Jul'
              'Aug'
              'Sep'
              'Oct'
              'Nov'
              'Dec'
            ]
            'STANDALONEMONTH': [
              'January'
              'February'
              'March'
              'April'
              'May'
              'June'
              'July'
              'August'
              'September'
              'October'
              'November'
              'December'
            ]
            'WEEKENDRANGE': [
              5
              6
            ]
            'fullDate': 'EEEE, MMMM d, y'
            'longDate': 'MMMM d, y'
            'medium': 'MMM d, y h:mm:ss a'
            'mediumDate': 'MMM d, y'
            'mediumTime': 'h:mm:ss a'
            'short': 'M/d/yy h:mm a'
            'shortDate': 'M/d/yy'
            'shortTime': 'h:mm a'
          'NUMBER_FORMATS':
            'CURRENCY_SYM': '$'
            'DECIMAL_SEP': '.'
            'GROUP_SEP': ','
            'PATTERNS': [
              {
                'gSize': 3
                'lgSize': 3
                'maxFrac': 3
                'minFrac': 0
                'minInt': 1
                'negPre': '-'
                'negSuf': ''
                'posPre': ''
                'posSuf': ''
              }
              {
                'gSize': 3
                'lgSize': 3
                'maxFrac': 2
                'minFrac': 2
                'minInt': 1
                'negPre': '-¤'
                'negSuf': ''
                'posPre': '¤'
                'posSuf': ''
              }
            ]
          'id': 'en'
          'localeID': 'en'
          'pluralCat': (n, opt_precision) ->
            i = n | 0
            vf = getVF(n, opt_precision)
            if i == 1 and vf.v == 0
              return PLURAL_CATEGORY.ONE
            PLURAL_CATEGORY.OTHER
        }


    setLocale = ($locale, locale)->
        for k,v of locale
            $locale[k] = v

    @registerLocale = (ngLocaleData)->
        if ngLocaleData.id
            LOCALE_DATA[ngLocaleData.id] = ngLocaleData
        return


    initLocaleDynamicService = ($rootScope, $injector)->
        if !localeDynamic
            localeDynamic = {}
            $locale = $injector.get('$locale')
            setLocale($locale, getDefaultLocale())

            localeDynamic.setLocale = (localeId)->
                $locale = $injector.get('$locale')
                if localeId == 'cz'
                    localeId = 'cs'
                if LOCALE_DATA.hasOwnProperty(localeId)
                    setLocale($locale, LOCALE_DATA[localeId])
                else
                    setLocale($locale, getDefaultLocale())
                return

            localeDynamic.getLocale = (localeId)->
                if localeId == 'cz'
                    localeId = 'cs'
                if LOCALE_DATA.hasOwnProperty(localeId)
                    return LOCALE_DATA[localeId]
                else
                    return getDefaultLocale()
        
        localeDynamic


    @$get = [
        '$rootScope',
        '$injector',
        initLocaleDynamicService
    ]

    @
