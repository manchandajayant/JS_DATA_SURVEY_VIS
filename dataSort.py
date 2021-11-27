import json
import sys

input_file = open('DATA/state_of_js_2016_2020.json')
data = json.load(input_file)

'''
************************************
**********Calculate by tools********
************************************
'''
arrOfAllTools = []


def sort_data(data):
    for i in data:
        if 'tools' in i:
            b = list(i['tools'].keys())
            arrOfKeys = b
            arrOfAllTools.append(i['tools'])


newObj = {}


def calculate_numbers(data):
    for x in data:
        for y, z in x.items():
            if y in newObj:
                newObj[y].append(z['experience'])
            else:
                newObj[y] = [z['experience']]


calculateFreq = {}


def calculate_values_for_each_tool(data):
    for x, y in data.items():
        for z in y:
            if x not in calculateFreq:
                calculateFreq[x] = {z: 1}
            else:
                if z not in calculateFreq[x]:
                    calculateFreq[x][z] = 1
                else:
                    calculateFreq[x][z] += 1


def sort_data_and_calculate_by_tool():
    sort_data(data)
    calculate_numbers(arrOfAllTools)
    calculate_values_for_each_tool(newObj)
    with open('server/SORTED_DATA/data_by_tools.json', 'w') as outfile:
        json.dump(calculateFreq, outfile)


'''
************************************
**********End***********************
************************************
'''

####################################################################################

'''
************************************
**********Calculate experience******
************************************
'''

expArr = []
def get_all_values_for_experience(data):
    for i in data:
        if 'years_of_experience' in i['user_info']:
            if i['user_info']['years_of_experience'] == 'range_less_than_1':
                s = i['user_info']['years_of_experience'].split('_')
                less_than_str = '> ' + str(s[3])
                expArr.append(less_than_str)
            elif i['user_info']['years_of_experience'] == 'range_more_than_20':
                s = i['user_info']['years_of_experience'].split('_')
                more_than_str = '< ' + str(s[3])
                expArr.append(more_than_str)
            else:
                s = i['user_info']['years_of_experience'].split('_')
                newStr = str(s[1]) + '-' + str(s[2])
                expArr.append(newStr)


# with open('server/SORTED_DATA/experience_range.json', 'w') as outfile:
#     json.dump(expArr, outfile)

'''
************************************
**********End Calculate experience******
************************************
'''

####################################################################################

'''
**************************************************
**********Calculate JS as main language data******
**************************************************
'''

largestNumber = 0
lowestNumber = 0
def calculate_highest_and_lowest_score_for_js_as_main_langauge(data):
    global largestNumber, lowestNumber
    for x in data:
        if 'opinions' in x:
            if 'would_like_js_to_be_main_lang' in x['opinions'] and x['opinions']['would_like_js_to_be_main_lang'] > largestNumber:
                largestNumber = x['opinions']['would_like_js_to_be_main_lang']
            if 'would_like_js_to_be_main_lang' in x['opinions'] and x['opinions']['would_like_js_to_be_main_lang'] < lowestNumber:
                lowestNumber = x['opinions']['would_like_js_to_be_main_lang']


scoreDict = [
   { "definitely no": 0},
   { "no, not really": 0},
   { "yeah, why not?": 0},
   { "definitely yes": 0}
]


def calculate_js_as_main_language_score(data, largestNumber, lowestNumber):
    global scoreDict
    for i in data:
        if 'opinions' in i:
            if 'would_like_js_to_be_main_lang' in i['opinions']:
                # full
                if i['opinions']['would_like_js_to_be_main_lang'] == largestNumber:
                    scoreDict[3]['definitely yes'] += 1
                # three fourth
                elif i['opinions']['would_like_js_to_be_main_lang'] == (largestNumber * (3 / 4)):
                    scoreDict[2]['yeah, why not?'] += 1
                # half
                elif i['opinions']['would_like_js_to_be_main_lang'] == (largestNumber / 2):
                    scoreDict[1]['no, not really'] += 1
                # one fourth
                elif i['opinions']['would_like_js_to_be_main_lang'] == (largestNumber / 4) or i['opinions']['would_like_js_to_be_main_lang'] == lowestNumber:
                    scoreDict[0]['definitely no'] += 1
                else:
                    "something not right in the logic"


'''
**************************************************
**********End Calculate JS as main language data**
**************************************************
'''
####################################################################################

'''
**************************************************
**********Calculate docs by year******
**************************************************
'''

arrOfYears = []
def get_all_years(data):
    global arrOfYears
    for x in data:
        if 'year' in x:
            if x['year'] not in arrOfYears:
                arrOfYears.append(x['year'])


allDocsByYear = {}
def get_docs_by_years(data,arrOfYears):
    global allDocsByYear
    for y in arrOfYears:
        for x in data:
            if 'year' in x: 
                if x['year'] == y:
                    if y in allDocsByYear:
                        allDocsByYear[y].append(x)
                    else:
                        allDocsByYear[y] = [x]


'''
**************************************************
**********End Calculate docs by year**************
**************************************************
'''
####################################################################################

if __name__ == "__main__":
    # get data for each tool
    sort_data_and_calculate_by_tool()
    with open('server/SORTED_DATA/data_by_tools.json', 'w') as outfile:
        json.dump(scoreDict, outfile)

    # experience of users 
    get_all_values_for_experience(data)
    with open('server/SORTED_DATA/experience_range.json', 'w') as outfile:
     	json.dump(scoreDict, outfile)

    # calculate language score or js as main language
    calculate_highest_and_lowest_score_for_js_as_main_langauge(data)
    calculate_js_as_main_language_score(data, largestNumber, lowestNumber)
    with open('server/SORTED_DATA/js_as_main_language.json', 'w') as outfile:
     	json.dump(scoreDict, outfile)

    # Get docs by year
    get_all_years(data)
    get_docs_by_years(data,arrOfYears)
    with open('server/SORTED_DATA/all_docs_by_year.json', 'w') as outfile:
     	json.dump(scoreDict, outfile)
