# Visualisation of data from [state of js](https://2020.stateofjs.com/en-US/) survey

Clone the Repository 

```
git clone https://github.com/manchandajayant/JS_DATA_SURVEY_VIS.git

```

Unzip state_of_js_2016 in [DATA](https://github.com/manchandajayant/JS_DATA_SURVEY_VIS/tree/master/DATA)

Unzip SORTED_DATA in [server](https://github.com/manchandajayant/JS_DATA_SURVEY_VIS/tree/master/server)

Install node packages in server :
```
npm install or yarn install

```
To run the server :
```
npm run serve

```

Install node packages in Front_end:
```
npm install or yarn install

```

The data is available on these endpoints : 
- /dataByTools
- /jsmainlangauge
- /allDocsByYear
- /allDocsByYear/:id


Schema of the data :

```json
{
    "_id": {
      "$oid": "5deecf461314d0e2cabf636a"
    },
    "survey": "state_of_js",
    "year": 2016,
    "browser_type": "touch",
    "user_agent": "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36",
    "platform": "mobile",
    "createdAt": "2017-08-09T03:40:42Z",
    "updatedAt": "2017-08-09T03:46:49Z",
    "tools": {
      "vanillajs": {
        "experience": "would_use"
      },
      "es6": {
        "experience": "would_use"
      },
      "coffeescript": {
        "experience": "not_interested"
      },
      "typescript": {
        "experience": "would_use"
      },
      "elm": {
        "experience": "not_interested"
      },
      "clojurescript": {
        "experience": "not_interested"
      },
      "nofrontendframework": {
        "experience": "would_use"
      },
      "react": {
        "experience": "would_use"
      },
      "angular": {
        "experience": "would_use"
      },
      "ember": {
        "experience": "not_interested"
      },
      "vuejs": {
        "experience": "interested"
      },
      "backbone": {
        "experience": "not_interested"
      },
      "redux": {
        "experience": "not_interested"
      },
      "mobx": {
        "experience": "not_interested"
      },
      "relay": {
        "experience": "not_interested"
      },
      "rest": {
        "experience": "would_use"
      },
      "firebase": {
        "experience": "would_not_use"
      },
      "graphql": {
        "experience": "would_not_use"
      },
      "apollo": {
        "experience": "would_not_use"
      },
      "falcor": {
        "experience": "never_heard"
      },
      "horizon": {
        "experience": "never_heard"
      },
      "meteor": {
        "experience": "interested"
      },
      "feathers": {
        "experience": "never_heard"
      },
      "donejs": {
        "experience": "never_heard"
      },
      "mern": {
        "experience": "never_heard"
      },
      "mean": {
        "experience": "would_use"
      },
      "mocha": {
        "experience": "interested"
      },
      "jasmine": {
        "experience": "interested"
      },
      "enzyme": {
        "experience": "never_heard"
      },
      "jest": {
        "experience": "interested"
      },
      "cucumberjs": {
        "experience": "never_heard"
      },
      "ava": {
        "experience": "never_heard"
      },
      "plaincss": {
        "experience": "would_use"
      },
      "sass": {
        "experience": "would_use"
      },
      "less": {
        "experience": "would_use"
      },
      "cssmodules": {
        "experience": "interested"
      },
      "aphrodite": {
        "experience": "never_heard"
      },
      "webpack": {
        "experience": "interested"
      },
      "grunt": {
        "experience": "would_use"
      },
      "gulp": {
        "experience": "would_use"
      },
      "browserify": {
        "experience": "interested"
      },
      "bower": {
        "experience": "interested"
      },
      "nativeapps": {
        "experience": "not_interested"
      },
      "reactnative": {
        "experience": "would_use"
      },
      "cordova": {
        "experience": "would_use"
      },
      "phonegap": {
        "experience": "not_interested"
      },
      "nativescript": {
        "experience": "interested"
      }
    },
    "sections_other_tools": {
      "front_end_frameworks": [
        "aurelia"
      ]
    },
    "opinions": {
      "js_moving_in_right_direction": 4,
      "building_js_apps_overly_complex": 4,
      "js_over_used_online": 2,
      "enjoy_building_js_apps": 3,
      "would_like_js_to_be_main_lang": 1,
      "js_ecosystem_changing_to_fast": 4,
      "survey_too_long": 4
    },
    "user_info": {
      "browser_type": "touch",
      "user_agent": "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36",
      "platform": "mobile",
      "years_of_experience": "range_10_20",
      "company_size": "range_100_1000",
      "yearly_salary": "range_50_100"
    },
    "happiness": {
      "javascript_flavors": 2,
      "front_end_frameworks": 2,
      "state_management": 2,
      "data_layer": 2,
      "backend_frameworks": 3,
      "testing": 1,
      "css": 3,
      "build_tools": 1,
      "mobile_desktop": 2
    },
    "tools_others": {}
  }

```


